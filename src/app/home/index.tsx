import { useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Typography, Button, Input, Space, Form } from "antd";
import { useForm } from "antd/es/form/Form";
import { useRef, useState } from "react";
import useStore from "../../stores/users";
import "./index.css";

type FieldType = {
  userId?: string;
};

const Home = () => {
  const { Title } = Typography;

  const ws = useRef<WebSocket | null>(null);
  const setUser = useStore((state: any) => state.setUser);
  const removeUser = useStore((state: any) => state.removeUser);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [form] = useForm();

  // 채팅방 유저 생성 [웹소켓 연결 및 로컬 스토리지 저장]
  const fn_createUser = async (values: FieldType) => {
    alert("환영합니다 [" + values.userId + "]님!");
    // 로컬 스토리지 저장
    setUser(values.userId);
    // 채팅방 목록으로 이동
    navigate("/ws/chat");
    // Loading False.
    setIsLoading(false);
  };

  return (
    <div className="chat-home-browser-box">
      <div className="chat-home-main-box">
        <div className="chat-home-create-box">
          <Title level={1}>POTATO Chat</Title>
          <Form
            form={form}
            onFinish={fn_createUser}
            className="chat-home-form-box"
          >
            <Title level={4}>유저 생성하기</Title>
            <Space.Compact style={{ width: "90%" }}>
              <Form.Item<FieldType>
                name={"userId"}
                rules={[{ required: true, message: "필수항목입니다." }]}
              >
                <Input
                  prefix={<UserOutlined />}
                  size="large"
                  maxLength={8}
                  placeholder="8자 이하 유저명 입력"
                />
              </Form.Item>
              <Button size="large" type="primary" htmlType="submit">
                생성
              </Button>
            </Space.Compact>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Home;
