package br.com.ocrfieldservice.enums;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum ComplementType {
	
	@JsonProperty("CLIENTE")
	CLIENTE("CLIENTE", "Cliente"),
	
	@JsonProperty("ADMINISTRADOR")
	ADMINISTRADOR("ADMINISTRADOR", "Administrador"),
	
	@JsonProperty("TECNICO")
	TECNICO("TECNICO", "Técnico");
        
    private final String value;
    private final String label;

}
