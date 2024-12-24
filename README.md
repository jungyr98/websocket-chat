
# Potato Chat Frontend 💬

<!-- 프로젝트 결과물 GIF -->
<img src="https://github.com/user-attachments/assets/c8a90d7d-b3a8-490a-a36b-896beae63595" width="265" />
<img src="https://github.com/user-attachments/assets/e153a610-0cbe-4aa8-8170-f7917b376cbe" width="265" />
<img src="https://github.com/user-attachments/assets/35cccecf-9da0-47f8-853c-2ccd14c0143c" width="265" />

## :grey_question: 소개
- 웹소켓 통신을 구현하기 위해 만든 채팅 프로젝트.
- 최초 화면에서 유저명 생성 후 진입 시 해당 이름이 Local Storage 에 저장 됨
- 채팅방 생성 시 Map 에 저장되며, 다른 유저가 생성하더라도 목록 새로고침 버튼을 통해 조회할 수 있음
- 채팅방 입장 시 session 이 부여되면서 소켓 연결 되고, 클라이언트끼리 채팅방 내에서 메시지를 주고 받으며 소켓 통신 가능
- 퇴장 시 session 그룹에서 삭제 되고, 남은 클라이언트에게 해당 유저의 퇴장 메시지 발송

## :bookmark_tabs: Spec

### Language
<img src="https://img.shields.io/badge/Java-407291?style=flat-square&logo=java&logoColor=white"/> <img src="https://img.shields.io/badge/Node.js-5FA04E?style=flat-square&logo=Node.js&logoColor=white"/>   
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=white"/> <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white"/> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white"/> <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white"/>

### Build Tool
<img src="https://img.shields.io/badge/Gradle-02303A?style=flat-square&logo=gradle&logoColor=white"/> <img src="https://img.shields.io/badge/Create React App-09D3AC?style=flat-square&logo=createreactapp&logoColor=white"/>

### Skill
<img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=flat-square&logo=springboot&logoColor=white"/> <img src="https://img.shields.io/badge/Lombok-a14933?style=flat-square&logo=lombok&logoColor=white"/> <img src="https://img.shields.io/badge/WebSocket-C93CD7?style=flat-square&logo=websocket&logoColor=white"/> <img src="https://img.shields.io/badge/Swagger-85EA2D?style=flat-square&logo=swagger&logoColor=white"/>   
<img src="https://img.shields.io/badge/.ENV-ECD53F?style=flat-square&logo=dotenv&logoColor=white"/> <img src="https://img.shields.io/badge/Ant Design-0170FE?style=flat-square&logo=antdesign&logoColor=white"/>

### Version Controll System
<img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white"/>

### IDE
<img src="https://img.shields.io/badge/Eclipse IDE-2C2255?style=flat-square&logo=eclipseide&logoColor=white"/> <img src="https://img.shields.io/badge/VSCode-22a6f2?style=flat-square&logo=visualstudiocode&logoColor=white"/>

### :pushpin: 사용법
#### Frontend
- .env 생성 후 해당 정보 기입
```
REACT_APP_SERVER_URL=http://아이피:포트
REACT_APP_WS_SERVER=아이피:포트
```
