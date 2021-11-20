package br.com.ocrfieldservice.core.enumerators;

public enum ComplementStatus {
	
	CLIENTE("Cliente"),
	ADMIN("Admin");
	
	private final String text;
	
	ComplementStatus(String text){
		this.text = text;
	}
	
	@Override
    public String toString() {
        return text;
    }
}
