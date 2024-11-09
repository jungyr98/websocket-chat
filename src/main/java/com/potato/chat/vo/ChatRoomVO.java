package com.potato.chat.vo;

import java.util.HashSet;
import java.util.Set;

import org.springframework.web.socket.WebSocketSession;

import com.potato.chat.service.ChatService;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Schema(description = "채팅방 VO")
public class ChatRoomVO {
	
	@Schema(description = "채팅방 아이디")
	private String roomId;
	
	@Schema(description = "채팅방 이름")
	private String roomName;
	
	@Schema(description = "현재 연결된 세션 그룹")
	private Set<WebSocketSession> sessions = new HashSet<>();
	
	@Builder
	public ChatRoomVO(String roomId, String roomName) {
		this.roomId = roomId;
		this.roomName = roomName;
	}
	
	/**
	 * 메세지 핸들러
	 * @param session
	 * @param chatMessageVO
	 * @param chatService
	 */
	public void handleActions(WebSocketSession session, ChatMessageVO chatMessageVO, ChatService chatService) {
		// messageType -> ENTER(입장)일 경우 분기 처리
		if(chatMessageVO.getMessageType().equals(ChatMessageVO.MessageType.ENTER)) {
			sessions.add(session);
			chatMessageVO.setMessage(chatMessageVO.getSenderId() + "님이 입장했습니동.");
		}
		sendMessage(chatMessageVO, chatService);
	}
	
	/**
	 * 해당 채팅방 세션 목록에게 메세지 전송
	 * @param <T>
	 * @param message
	 * @param chatService
	 */
	public <T> void sendMessage(T message, ChatService chatService) {
		sessions.parallelStream().forEach(session -> chatService.sendMessage(session, message));
	}

}
