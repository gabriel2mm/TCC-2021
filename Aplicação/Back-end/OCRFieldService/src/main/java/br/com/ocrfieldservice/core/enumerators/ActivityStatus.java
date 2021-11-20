package br.com.ocrfieldservice.core.enumerators;

public enum ActivityStatus {
	
	ABERTO("Aberto"),
	FECHADO("Fechado"),
	CONCLUIDO("Concluído"),
	EM_ANDAMENTO("Em andamento");
	
	 private final String text;

    /**
     * @param text
     */
	ActivityStatus(final String text) {
        this.text = text;
    }

    /* (non-Javadoc)
     * @see java.lang.Enum#toString()
     */
    @Override
    public String toString() {
        return text;
    }
}
