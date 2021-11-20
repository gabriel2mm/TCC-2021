package br.com.ocrfieldservice.entrypoint.viewModel;

import java.util.Collection;


public class TokenResponse {

	private String token;
	private String type;
	private Collection<String> errors;

	public static class Builder{
		private String token;
		private String type;
		private Collection<String> errors;

		public Builder token(final String token) {
			this.token = token;
			return this;
		}

		public Builder type(final String type) {
			this.type = type;
			return this;
		}

		public Builder erros(final Collection<String> errors) {
			this.errors = errors;
			return this;
		}

		public TokenResponse build() {
			return new TokenResponse(this);
		}
	}

	private TokenResponse(Builder builder) {
		token = builder.token;
		type = builder.type;
		errors = builder.errors;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Collection<String> getErrors() {
		return errors;
	}

	public void setErrors(Collection<String> errors) {
		this.errors = errors;
	}


}
