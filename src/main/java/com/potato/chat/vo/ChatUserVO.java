package com.potato.chat.vo;

import org.springframework.web.socket.WebSocketSession;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Schema(description="채팅 시스템 유저 VO")
public class ChatUserVO {
	
	@Schema(description="유저 세션")
	private WebSocketSession session;
	
	@Schema(description="유저 아이디")
	private String userId;

}
