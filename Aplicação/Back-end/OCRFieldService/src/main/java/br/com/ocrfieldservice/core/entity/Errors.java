package br.com.ocrfieldservice.core.entity;

import java.util.Collection;

public class Errors {
	
	private int statusCode;
	private Collection<String> errors;
	
	public Errors() {
		
	}
	
	public Errors(final Collection<String> errors) {
		this.errors = errors;
	}
	
	public Errors(final int statusCode) {
		this.statusCode = statusCode;
	}
	
	public Errors(final Collection<String> errors , final int statusCode) {
		this.errors = errors;
		this.statusCode = statusCode;
	}

	public Collection<String> getErrors() {
		return errors;
	}

	public void setErrors(Collection<String> errors) {
		this.errors = errors;
	}

	public int getStatusCode() {
		return statusCode;
	}

	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}
}
