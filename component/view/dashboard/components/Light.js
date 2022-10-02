import { Card } from "antd";
import React, { useState } from "react";
import { useDashboardDataStore } from "../../../../context/dashboardStore";
export default function Light({ config }) {
  const { topic, title } = config;
  const [state, setState] = useState(config.state);
  const { mqttPublish } = useDashboardDataStore();

  const handleClick = () => {
    setState(!state);
    mqttPublish({ topic, payload: !state ? "ON" : "OFF" });
  };

  return (
    <Card
      hoverable
      style={{
        backgroundColor: state ? "green" : "red",
        width: 180,
        height: 100,
        textAlign: "center",
      }}
      onClick={handleClick}
    >
      {title}
    </Card>
  );
}
