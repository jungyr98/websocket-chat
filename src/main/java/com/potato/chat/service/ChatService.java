package com.potato.chat.service;

import java.util.List;

import org.springframework.web.socket.WebSocketSession;

import com.potato.chat.vo.ChatRoomVO;

public interface ChatService {
	
	/**
	 * 모든 채팅방 조회
	 * @return
	 */
	public List<ChatRoomVO> findAllRoom();
	
	/**
	 * 방 번호로 채팅방 조회
	 * @param roomId
	 * @return
	 */
	public ChatRoomVO findRoomById(String roomId);
	
	/**
	 * 채팅방 생성
	 * @param roomName
	 * @return
	 */
	public ChatRoomVO createRoom(String roomName);
	
	/**
	 * 메세지 전송 함수
	 * @param <T>
	 * @param session
	 * @param message
	 */
	public <T> void sendMessage(WebSocketSession session, T message);
}
