package com.potato.chat.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "채팅 메세지 VO")
public class ChatMessageVO {
	
	@Schema(description = "메세지 타입 - ENTER : 최초 입장, TALK : 메세지 전송, OUT : 퇴장")
	private MessageType messageType;
	
	@Schema(description = "채팅방 아이디")
	private String roomId;
	
	@Schema(description = "전송자 아이디")
	private String senderId;
	
	@Schema(description = "메세지 내용")
	private String message;
	
	// 메세지 타입 : 입장, 채팅
	public enum MessageType {
		ENTER, TALK, OUT
	}	

}
