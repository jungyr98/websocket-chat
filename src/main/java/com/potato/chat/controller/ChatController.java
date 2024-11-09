package com.potato.chat.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.potato.chat.service.ChatService;
import com.potato.chat.vo.ChatRoomVO;
import com.potato.chat.vo.ChatUserVO;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@Tag(name = "웹소켓 채팅방 API", description = "컨트롤러에 대한 설명입니다.")
@RequestMapping("/chat")
public class ChatController {
	
	private final ChatService chatService;
	
	@Operation(summary = "채팅방 생성하기", description = "웹소켓 클라이언트에게 받은 채팅방 이름 값으로 채팅방 객체 생성")
	@Parameter(name = "roomName", description = "생성할 채팅방 이름")
	@PostMapping("/api/v1/create-room")
	public ChatRoomVO createRoom(@RequestParam(value="roomName") String roomName) {
		return chatService.createRoom(roomName);
	}
		
	@Operation(summary = "유저 생성하기", description = "웹소켓 최초 접속 시 세션과 전달 받은 유저 아이디 값으로 유저 객체 생성")
	@PostMapping("/api/v1/create-user")
	public ChatUserVO createUser(@RequestBody ChatUserVO chatUserVO) {
		return chatService.createUser(chatUserVO);
	}
	
	@Operation(summary = "모든 채팅방 조회하기", description = "서버에 생성된 모든 채팅방 정보 조회")
	@GetMapping("/api/v1/select-all-room")
	public ResponseEntity<List<ChatRoomVO>> findAllRoom() {

		return ResponseEntity.ok().body(chatService.findAllRoom());
	}

}
