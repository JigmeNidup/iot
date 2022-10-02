import { Button, Card, Col, Input, Row } from "antd";
import React, { useState } from "react";
import { useChatContext } from "../../../context/chatContext";
import { useDashboardDataStore } from "../../../context/dashboardStore";

export default function ChatSend() {
  const { user, room, setUpdate } = useChatContext();
  const { mqttPublish } = useDashboardDataStore();
  let [text, setText] = useState("");

  const handleSend = () => {
    try {
      mqttPublish({
        topic: room,
        payload: user + "#" + text,
      });
      // setUpdate(Math.random());
    } catch (error) {}
  };
  return (
    <Card>
      <Row justify="center" gutter={[16, 16]}>
        <Col>
          <Input
            onChange={(e) => {
              setText(e.target.value);
            }}
            style={{ minWidth: 450 }}
          />
        </Col>
        <Col>
          <Button onClick={handleSend} type="primary">
            Send
          </Button>
        </Col>
      </Row>
    </Card>
  );
}
