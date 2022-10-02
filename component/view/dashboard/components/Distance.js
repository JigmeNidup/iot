import { Statistic, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useDashboardDataStore } from "../../../../context/dashboardStore";

export default function DistanceComp() {
  const { client } = useDashboardDataStore();
  const [DataTemp, setDataTemp] = useState(0);
  const [DataHumi, setDataHumi] = useState(0);

  useEffect(() => {
    if (client) {
      client.on("connect", () => {
        // client.subscribe(Dist_topic);
      });
      client.on("message", (topic, message) => {
        if (topic === "iothometempmqtt") {
          setDataTemp(Number(message.toString()));
        }
        if (topic === "iothomehumimqtt") {
          setDataHumi(Number(message.toString()));
        }
      });
    }
  }, [client]);
  return (
    <Tabs defaultActiveKey="1">
      <Tabs.TabPane tab="Temp" key="1">
        <Statistic title="Temperature" value={DataTemp} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Humi" key="2">
        <Statistic title="Humidity" value={DataHumi} />
      </Tabs.TabPane>
    </Tabs>
  );
}
