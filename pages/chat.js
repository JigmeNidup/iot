import { Col, Row } from "antd";
import React from "react";
import DashboardStoreProvider from "../context/dashboardStore";
import ChatMessage from "../component/view/chat/chatMessage";
import ChatPannel from "../component/view/chat/chatPannel";
import ChatContextProvider from "../context/chatContext";
import ChatSend from "../component/view/chat/chatSend";

export default function Chat() {
  return (
    <DashboardStoreProvider>
      <ChatContextProvider>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <ChatPannel />
          </Col>
          <Col span={24} style={{ marginTop: 15 }}>
            <ChatMessage />
          </Col>
          <Col span={24} style={{ marginTop: 15 }}>
            <ChatSend />
          </Col>
        </Row>
      </ChatContextProvider>
    </DashboardStoreProvider>
  );
}
