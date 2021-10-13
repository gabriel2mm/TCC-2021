package br.com.ocrfieldservice.enums;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum StatusType {
	
	@JsonProperty("ABERTO")
	ABERTO("ABERTO", "Aberto"),
	
	@JsonProperty("FECHADO")
	FECHADO("FECHADO", "Fechado"),
	
	@JsonProperty("RESOLVIDO")
	RESOLVIDO("RESOLVIDO", "Resolvido"),
	
	@JsonProperty("REABERTO")
	REABERTO("REABERTO", "Reaberto"),
	
	@JsonProperty("INICIADO")
	INICIADO("INICIADO", "Iniciado"),
	
	@JsonProperty("PENDENTE")
	PENDENTE("PENDENTE", "Pendente");
        
    private final String value;
    private final String label;

}
