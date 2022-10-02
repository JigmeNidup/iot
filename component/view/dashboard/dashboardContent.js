import { Card, Col, Row } from "antd";
import React from "react";
import { useDashboardDataStore } from "../../../context/dashboardStore";
import DistanceComp from "./components/Distance";
import Light from "./components/Light";
// import TempComp from "./components/Temp";

export default function DashboardContent() {
  let { Data, clientConnected, updateState } = useDashboardDataStore();
  return clientConnected && updateState ? (
    <Row gutter={[8, 8]} justify="start">
      <Col span={18}>
        <Card>
          <Row gutter={[8, 8]}>
            {Data.map((val, i) => {
              return (
                <Col span={6} key={i}>
                  <Light config={val} />
                </Col>
              );
            })}
          </Row>
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <DistanceComp />
        </Card>
      </Col>
      <Col span={18}>
        <Card>{/* <TempComp /> */}</Card>
      </Col>
    </Row>
  ) : (
    <div />
  );
}
