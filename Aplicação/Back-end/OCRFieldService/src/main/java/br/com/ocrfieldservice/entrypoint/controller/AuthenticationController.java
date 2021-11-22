package br.com.ocrfieldservice.entrypoint.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import br.com.ocrfieldservice.contracts.PasswordResetService;
import br.com.ocrfieldservice.contracts.SendEmailService;
import br.com.ocrfieldservice.contracts.SignInService;
import br.com.ocrfieldservice.core.entity.Organization;
import br.com.ocrfieldservice.core.entity.PasswordReset;
import br.com.ocrfieldservice.core.entity.Permission;
import br.com.ocrfieldservice.core.entity.Profile;
import br.com.ocrfieldservice.core.entity.User;
import br.com.ocrfieldservice.core.repository.OrganizationRepository;
import br.com.ocrfieldservice.core.repository.PermissionRepository;
import br.com.ocrfieldservice.core.repository.ProfileRepository;
import br.com.ocrfieldservice.core.repository.UserRepository;
import br.com.ocrfieldservice.entrypoint.viewModel.ForgotInput;
import br.com.ocrfieldservice.entrypoint.viewModel.PasswordResetInput;
import br.com.ocrfieldservice.entrypoint.viewModel.SignRequest;
import br.com.ocrfieldservice.entrypoint.viewModel.TokenResponse;

@RestController
@RequestMapping(value = "/api/auth")
public class AuthenticationController {

	@Autowired
	private SignInService signIn;

	@Autowired
	private UserRepository repository;

	@Autowired
	private SendEmailService sendMailService;

	@Autowired
	private PasswordResetService passwordResetService;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private PermissionRepository permissionRepository;

	@Autowired
	private ProfileRepository profileRepository;

	@Autowired
	private OrganizationRepository organizationRepository;

	@Value("${jwt.secret}")
	private String secret;

	@Value("${jwt.token-expired}")
	private long expiration;

	@GetMapping
	private @ResponseBody ResponseEntity<String> createUserTeste() {


		Organization org = new Organization();
		org.setName("ADMINS");


		Permission p = new Permission();
		p.setPermission("Admin");

		permissionRepository.save(p);

		Profile profile = new Profile();
		profile.setName("ADMINS");
		profile.setDescription("Perfil de administradores do sistema");
		profile.setActive(true);

		List<Permission> permissions = new ArrayList<>();
		permissions.add(p);

		profile.setPermissions(permissions.stream().collect(Collectors.toSet()));

		profileRepository.save(profile);


		User user = new User();
		user.setActive(true);
		user.setPassword(passwordEncoder.encode("teste"));
		user.setEmail("teste@teste.com");
		user.setFirstName("teste");
		user.setLastName("teste");
		user.setCPF("123456789");
		user.setProfile(profile);
		user.setOrganization(org);

		repository.save(user);

		return new ResponseEntity<>("Criado com sucesso!", HttpStatus.OK);
	}
	
	@PostMapping
	private @ResponseBody ResponseEntity<TokenResponse> signIn(@RequestBody SignRequest signRequest) {

		User user = repository.findByEmail(signRequest.getEmail());
		if (user != null && user.isActive() &&  signIn.sigin(signRequest.getPassword(), user.getPassword())) {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signRequest.getEmail(),
					signRequest.getPassword(), user.getProfile() == null ? new ArrayList<>() : user.getProfile().getPermissions()));

			String token = JWT.create().withSubject(user.getUsername())
					.withExpiresAt(new Date(System.currentTimeMillis() + expiration))
					.sign(Algorithm.HMAC512(this.secret.getBytes()));

			return new ResponseEntity<>(new TokenResponse.Builder().token(token).type("Bearer").erros(new ArrayList<String>()).build(),
					HttpStatus.OK);
		}

		return new ResponseEntity<>(
				new TokenResponse.Builder().token("").type("").erros(new ArrayList<String>() {
					{
						add("Usuário e/ou senha inválidos");
					}
				}).build(), HttpStatus.FORBIDDEN);

	}

	@PostMapping(value = "/forgot")
	public @ResponseBody ResponseEntity<String> sendEmailReset(@RequestBody final ForgotInput email) {
		try {
			User user = repository.findByEmail(email.getEmail());
			if (user != null) {
				PasswordReset passwordReset = passwordResetService.createToken(user);
				String token = passwordReset.getToken();
				sendMailService.sendEmail("Esqueci minha senha", "Para trocar sua senha clique no link:  http://ocrfieldservice.com.br/reset-password?t=" + token, user.getEmail());
			}
			else
				return new ResponseEntity<>("Não foi possível realizar envio do email!", HttpStatus.BAD_REQUEST);

			return new ResponseEntity<>("E-mail enviado com sucesso!", HttpStatus.OK);

		} catch (Exception e) {
			return new ResponseEntity<>("Não foi possível realizar envio do email!", HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping(value = "/reset")
	public @ResponseBody ResponseEntity<String> sendEmailReset(
			@RequestBody final PasswordResetInput passwordResetInput) {

		try {
			passwordResetService.ResetPassword(passwordResetInput.getToken(), passwordResetInput.getNewPassword());
			return new ResponseEntity<>("Reset realizado com sucesso!", HttpStatus.OK);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>("Não foi possível realizar reset de password", HttpStatus.BAD_REQUEST);
		}
	}
}
