package com.potato.chat.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.potato.chat.vo.ChatRoomVO;
import com.potato.chat.vo.ChatUserVO;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChatServiceImpl implements ChatService {
	
	private final ObjectMapper objectMapper;
	private Map<String, ChatRoomVO> chatRooms; // 서버에 생성된 모든 채팅방 정보 MAP
	private Map<WebSocketSession, ChatUserVO> chatUsers; // 서버에 생성된 모든 유저 정보 MAP
	
	@PostConstruct
	private void init() {
		chatRooms = new LinkedHashMap<>();
	}
	
	/**
	 * 모든 채팅방 조회
	 */
	@Override
	public List<ChatRoomVO> findAllRoom() {
		return new ArrayList<>(chatRooms.values());
	}
	
	/**
	 * 방 번호로 채팅방 조회
	 */
	@Override
	public ChatRoomVO findRoomById(String roomId) {
		return chatRooms.get(roomId);
	}
	
	/**
	 * 채팅방 생성
	 */
	@Override
	public ChatRoomVO createRoom(String roomName) {
		String randomId = UUID.randomUUID().toString();
		ChatRoomVO chatRoomVO = ChatRoomVO.builder()
				.roomId(randomId)
				.roomName(roomName)
				.build();
		
		// 모든 채팅방 정보 MAP에 해당 객체 추가 [key: UUID, value: VO]
		chatRooms.put(randomId, chatRoomVO);
		
		return chatRoomVO;
	}
	
	/**
	 * 유저 생성
	 */
	public ChatUserVO createUser(ChatUserVO newUserVO) {
		ChatUserVO chatUserVO = ChatUserVO.builder()
				.session(newUserVO.getSession())
				.userId(newUserVO.getUserId())
				.build();
		
		// 모든 채팅방 유저 정보 MAP에 해당 객체 추가 [key: Session, value: VO]
		chatUsers.put(chatUserVO.getSession(), chatUserVO);
		
		return chatUserVO;
	}
	
	/**
	 * 메세지 전송 함수
	 */
	@Override
	public <T> void sendMessage(WebSocketSession session, T message) {
		try {
			session.sendMessage(new TextMessage(objectMapper.writeValueAsString(message)));
		} catch (IOException e) {
			log.error(e.getMessage(), e);
		}
	}

}
