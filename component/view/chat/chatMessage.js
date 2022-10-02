import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { useChatContext } from "../../../context/chatContext";
import { useDashboardDataStore } from "../../../context/dashboardStore";

export default function ChatMessage() {
  const { user, room, state } = useChatContext();
  let [Message, setMessage] = useState([]);
  const { client } = useDashboardDataStore();
  useEffect(() => {
    if (client) {
      client.on("connect", () => {
        // client.subscribe(room);
      });
      client.on("message", (topic, message) => {
        if (topic == room) {
          let temp = Message;
          temp.push(message.toString());
          setMessage(temp);
          console.log(topic, message.toString());
        }
      });
    }
  }, [client]);
  return (
    <Card
      style={{
        overflowY: "auto",
        height: "75vh",
        backgroundColor: "lightgray",
      }}
    >
      {state ? (
        <div>
          {Message.map((val, i) => {
            let A = val.split("#");
            if (A[0] == user) {
              return (
                <p key={i} style={{ float: "right", clear: "both" }}>
                  {A[1]}
                </p>
              );
            } else {
              return (
                <p key={i} style={{ float: "left", clear: "both" }}>
                  {A[1]}
                </p>
              );
            }
          })}
        </div>
      ) : null}
    </Card>
  );
}
