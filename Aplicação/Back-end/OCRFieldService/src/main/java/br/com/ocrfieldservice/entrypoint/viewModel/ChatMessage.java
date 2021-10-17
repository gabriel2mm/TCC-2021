package br.com.ocrfieldservice.entrypoint.viewModel;

import br.com.ocrfieldservice.core.entity.User;

public class ChatMessage {
	private Long chatRoom;
    private MessageType type;
    private String content;
    private User from;
    private User to;

    public enum MessageType {
        CHAT,
        JOIN,
        LEAVE
    }

    public MessageType getType() {
        return type;
    }

    public void setType(MessageType type) {
        this.type = type;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

	public User getFrom() {
		return from;
	}

	public void setFrom(User from) {
		this.from = from;
	}

	public User getTo() {
		return to;
	}

	public void setTo(User to) {
		this.to = to;
	}

	public Long getChatRoom() {
		return chatRoom;
	}

	public void setChatRoom(Long chatRoom) {
		this.chatRoom = chatRoom;
	}
}
