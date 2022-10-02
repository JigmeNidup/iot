import { message } from "antd";
import mqtt from "mqtt";
import React, { createContext, useContext, useEffect, useState } from "react";

const DashboardData = createContext();

export function useDashboardDataStore() {
  return useContext(DashboardData);
}

export default function DashboardStoreProvider({ children }) {
  const [Data, setData] = useState([
    {
      title: "Room 1",
      topic: "iothomeroomlight1",
      type: "light",
      state: false,
    },
    {
      title: "Room 2",
      topic: "iothomeroomlight2",
      type: "light",
      state: false,
    },
    {
      title: "Room 3",
      topic: "iothomeroomlight3",
      type: "light",
      state: false,
    },
    {
      title: "Room 4",
      topic: "iothomeroomlight4",
      type: "light",
      state: false,
    },
    {
      title: "Room 5",
      topic: "iothomeroomlight5",
      type: "light",
      state: false,
    },
    {
      title: "Room 6",
      topic: "iothomeroomlight6",
      type: "light",
      state: false,
    },
    {
      title: "Room 7",
      topic: "iothomeroomlight7",
      type: "light",
      state: false,
    },
    {
      title: "Room 8",
      topic: "iothomeroomlight8",
      type: "light",
      state: false,
    },
  ]);

  const [client, setClient] = useState();

  const [clientConnected, setClientConnected] = useState(false);
  const [updateState, setUpdateState] = useState(Math.random());

  const mqttConnect = ({ HOST, PORT }) => {
    const host = `wss://${HOST}:${PORT}/mqtt`;
    const clientId = "IoTHomeClient-" + Math.random().toString(16);
    setClient(
      mqtt.connect(host, {
        clientId,
        username: "client1",
        password: "client1pass",
      })
    );
  };

  const mqttDisconnect = () => {
    if (client) {
      client.end();
      setClient(null);
      message.info("Mqtt Disconnected");
      setClientConnected(false);
    }
  };

  const mqttPublish = ({ topic, payload }) => {
    if (client) {
      client.publish(topic, String(payload));
    }
  };

  const mqttSubscribe = ({ topic }) => {
    if (client) {
      client.subscribe(topic);
    }
  };

  useEffect(() => {
    if (client) {
      client.on("connect", () => {
        // message.success("mqtt connected");
        client.subscribe("iothometempmqtt");
        client.subscribe("iothomehumimqtt");
        client.subscribe("newiothomeroom");
        setClientConnected(true);
      });
      client.on("error", (error) => {
        console.error(error);
        client.end();
      });
      client.on("reconnect", () => {
        console.log("reconnecting....");
      });
      client.on("message", (topic, message) => {
        // console.log(topic, message.toString());
      });
    }
  }, [client]);

  return (
    <DashboardData.Provider
      value={{
        Data,
        setData,
        client,
        clientConnected,
        updateState,
        setUpdateState,
        mqttConnect,
        mqttDisconnect,
        mqttPublish,
        mqttSubscribe,
      }}
    >
      {children}
    </DashboardData.Provider>
  );
}
