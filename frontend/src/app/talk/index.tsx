import {
  Typography,
  Button,
  Input,
  Space,
  Avatar,
  List,
  Form,
  Table,
} from "antd";
import { useState, useEffect, useRef } from "react";
import "./index.css";
import { useForm } from "antd/es/form/Form";
import {
  UserOutlined,
  ArrowLeftOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import useStore from "../../stores/users";
import { useLocation, useNavigate } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
import React from "react";
import uuid from "react-uuid";
import { WS_SERVER } from "../../utils/global";

type FieldType = {
  messageType?: string;
  roomId?: string;
  senderId?: string;
  message?: string;
};

const Talk = () => {
  const ws = useRef<WebSocket | null>(null);
  const [messageType, setMessageType] = useState("ENTER");
  const user = useStore((state: any) => state.user);
  const location = useLocation();
  const roomId = location?.state?.roomId;
  const [form] = useForm();
  const [dataSource, setDataSource] = useState<FieldType[]>([]);
  const tblRef: Parameters<typeof Table>[0]["ref"] = useRef(null);
  const navigate = useNavigate();

  // 웹소켓 연결 확인
  const fn_connectWebSocket = () => {
    var socketConn = new WebSocket(`ws://${WS_SERVER}/ws/chat`);
    ws.current = socketConn;

    // ON OPEN
    socketConn.onopen = () =>
      socketConn.send(
        JSON.stringify({
          messageType: messageType,
          roomId: roomId,
          senderId: user,
        })
      );

    // ON MESSAGE
    socketConn.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log(data);
      setDataSource((prevItems) => [...prevItems, data]);
    };

    // ON ERROR
    socketConn.onerror = (error) => {
      console.log(error);
    };

    // ON CLOSE [1000 : 정상 종료 / 그 외 : 비정상 종료]
    socketConn.onclose = (event) => {
      if (event?.wasClean && event?.code === 1000) {
        console.log(
          "[Clean Closed] WebSocket Connection Closed CODE: " + event?.code
        );
      } else {
        console.log(
          "[Not Clean Closed] WebSocket Connection Closed. CODE: " + event?.code
        );
      }
    };
  };

  // 메세지 전송
  const fn_sendMessage = (values: FieldType) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(
        JSON.stringify({
          messageType: "TALK",
          roomId: roomId,
          senderId: user,
          message: values.message,
        })
      );
    }
    form.setFieldValue("message", "");
  };

  // 채팅방 퇴장하기
  const fn_outChatRoom = () => {
    if (!window.confirm("퇴장하시겠습니까?")) return false;

    navigate("/ws/chat");
  };

  // <Table> 관련 설정
  const columns: ColumnsType<FieldType> = [
    {
      dataIndex: "message",
      render: (_, record) => {
        return record?.messageType !== "TALK" ? (
          <div key={uuid()} style={{ textAlign: "center" }}>
            {record?.message}
          </div>
        ) : record?.senderId !== user ? (
          <div className="message-div message-div-left" key={uuid()}>
            <div>{record?.senderId}</div>
            <div className="message-box message-box-left">
              {record?.message}
            </div>
          </div>
        ) : (
          <div className="message-div message-div-right" key={uuid()}>
            <div>{record?.senderId}</div>
            <div className="message-box message-box-right">
              {record?.message}
            </div>
          </div>
        );
      },
    },
  ];

  // useEffect
  useEffect(() => {
    // 웹소켓 연결 확인
    fn_connectWebSocket();

    return () => {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.close();
      }
    };
  }, []);

  useEffect(() => {
    tblRef.current?.scrollTo({ index: 0, top: 450 });
  }, [dataSource]);

  return (
    <div className="chat-talk-browser-box">
      <div className="chat-talk-main-box">
        <Button
          onClick={fn_outChatRoom}
          icon={
            <>
              <ArrowLeftOutlined style={{ marginRight: "5px" }} />{" "}
              <UnorderedListOutlined />
            </>
          }
          size="large"
          type="text"
        />
        <div className="chat-talk-exchange-box">
          <div
            className="talk-box"
            style={{
              width: "100%",
              height: "500px",
            }}
          >
            <Table
              dataSource={dataSource}
              columns={columns}
              scroll={{ y: 450 }}
              ref={tblRef}
              pagination={false}
              size="large"
              showHeader={false}
              style={{ minHeight: "450px", height: "450px" }}
            ></Table>
          </div>
          <div>
            <Form
              form={form}
              onFinish={fn_sendMessage}
              style={{ width: "100%" }}
            >
              <Space.Compact style={{ width: "400px" }}>
                <Form.Item<FieldType>
                  name={"message"}
                  rules={[{ required: true, message: "필수항목입니다." }]}
                  style={{ width: "100%" }}
                >
                  <Input size="large" placeholder="메시지 입력" />
                </Form.Item>
                <Button size="large" type="primary" htmlType="submit">
                  전송
                </Button>
              </Space.Compact>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Talk;
