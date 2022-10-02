import React, { useState, useEffect } from "react";
import { Area } from "@ant-design/plots";
import { useDashboardDataStore } from "../../../../context/dashboardStore";

export default function TempComp() {
  let [data, setData] = useState([]);
  const { client } = useDashboardDataStore();
  let counter = 0;
  let temp_topic = "";
  let humi_topic = "iothomehumimqtt";
  useEffect(() => {
    if (client) {
      client.on("connect", () => {
        client.subscribe("iothomehumimqtt");
      });
      client.on("message", (topic, message) => {
        if (topic == humi_topic) {
          let temp = data;
          counter += 1;
          temp.push({ counter, value: Number(message.toString()) });
          setData(temp);
        }
      });
    }
  }, [client]);

  const config = {
    data,
    xField: "counter",
    yField: "value",
    xAxis: {
      range: [0, 1],
      tickCount: 5,
    },
    areaStyle: () => {
      return {
        fill: "l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff",
      };
    },
  };

  return (
    <>
      <Area {...config} />
    </>
  );
}
