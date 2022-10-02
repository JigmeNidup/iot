import { PlusOutlined, SettingOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Tooltip,
} from "antd";
import React, { useState } from "react";
import { useChatContext } from "../../../context/chatContext";
import { useDashboardDataStore } from "../../../context/dashboardStore";

export default function ChatPanel() {
  const { clientConnected, mqttConnect, mqttDisconnect, mqttSubscribe } =
    useDashboardDataStore();

  const { setUser } = useChatContext();

  const handleConnect = (props) => {
    const { host, port, name } = props;
    setUser(name);
    mqttConnect({ HOST: host, PORT: port });
  };

  return (
    <Row justify="center" gutter={[8, 8]}>
      <Col>
        <Form
          onFinish={handleConnect}
          layout="inline"
          validateMessages={{ required: "'${label} is Required'" }}
        >
          <Form.Item name="host" label="Host" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="port" label="Port" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="name" label="User Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          {/* <Form.Item name="room" label="Room Id" rules={[{ required: true }]}>
            <Input />
          </Form.Item> */}

          <Form.Item>
            {!clientConnected ? (
              <Button htmlType="submit">Connect</Button>
            ) : (
              <Button
                danger
                onClick={() => {
                  mqttDisconnect();
                }}
              >
                Disconnect
              </Button>
            )}
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
