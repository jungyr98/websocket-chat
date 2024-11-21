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
import { UserOutlined, RedoOutlined } from "@ant-design/icons";
import useStore from "../../stores/users";
import { render } from "@testing-library/react";
import { ColumnType } from "antd/es/list";
import type { TableProps } from "antd";
import { useNavigate } from "react-router-dom";
import React from "react";
import { SERVER_URL } from "../../utils/global";

type FieldType = {
  roomId?: string;
  roomName?: string;
};

type ColumnsType<T extends object> = TableProps<T>["columns"];

/*
 * [채팅방 목록 화면]
 * [채팅방 생성 / 채팅방 목록 조회 / 채팅방 입장]
 */
const Chat = () => {
  const { Title, Text } = Typography;
  const user = useStore((state: any) => state.user);
  const [list, setList] = useState<Array<any>>([]);
  const [form] = useForm();
  const navigate = useNavigate();
  const ws = useRef<WebSocket | null>(null);

  // 모든 채팅방 목록 조회하기
  const fn_selectRoomList = async () => {
    await fetch(`${SERVER_URL}/chat/api/v1/select-all-room`)
      .then((res) => res.json())
      .then((res) => {
        setList(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // 채팅방 생성하기
  const fn_createRoom = async (values: FieldType) => {
    if (!window.confirm("새로운 방을 생성하시겠습니까?")) {
      return false;
    }

    try {
      await fetch(`${SERVER_URL}/chat/api/v1/create-room`, {
        method: "POST",
        body: values?.roomName,
      })
        .then((res) => res.json())
        .then((res) => {
          alert("생성되었습니다.");
          form.setFieldValue("roomName", "");
          fn_selectRoomList();
        })
        .catch((e) => {
          alert(e);
        });
    } catch (error) {}
  };

  const fn_inRoom = (roomId: string) => {
    if (!window.confirm("입장하시겠습니까?")) {
      return false;
    }
    // 채팅방 입장
    navigate("/ws/talk", {
      state: {
        roomId: roomId,
      },
    });
  };

  // <Table> 태그 관련 데이터 렌더링 설정
  const columns: ColumnsType<FieldType> = [
    {
      title: "방 이름",
      dataIndex: "roomName",
      render: (_, record, idx) => {
        return (
          <>
            <Avatar
              src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${idx}`}
            />
            <Text strong style={{ marginLeft: "5px" }}>
              {record?.roomName}
            </Text>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    fn_selectRoomList();
  }, []);

  return (
    <div className="chat-list-browser-box">
      <div className="chat-list-main-box">
        <div className="chat-list-create-box">
          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            <UserOutlined style={{ marginRight: "5px" }} />
            {user}
          </div>
          <Title level={4}>방 생성하기</Title>
          <Form
            form={form}
            onFinish={fn_createRoom}
            className="chat-list-form-box"
          >
            <Space.Compact style={{ width: "100%" }}>
              <Form.Item<FieldType>
                name={"roomName"}
                rules={[{ required: true, message: "필수항목입니다." }]}
              >
                <Input
                  size="large"
                  maxLength={13}
                  placeholder="방 이름을 입력하세요."
                />
              </Form.Item>
              <Button size="large" type="primary" htmlType="submit">
                생성
              </Button>
            </Space.Compact>
          </Form>
          <div className="chat-list-data-box">
            <Title level={5}>
              방 목록
              <Button
                icon={<RedoOutlined />}
                onClick={fn_selectRoomList}
                shape="circle"
                style={{ marginLeft: "5px" }}
              ></Button>
            </Title>
            <Table
              dataSource={list}
              columns={columns}
              showHeader={false}
              rowKey={(record) => record?.roomId}
              onRow={(record, rowIndex) => {
                return {
                  onClick: () => fn_inRoom(record?.roomId),
                };
              }}
              pagination={{ position: ["bottomCenter"], pageSize: 6 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
