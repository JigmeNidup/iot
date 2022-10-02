import { Col, Row } from "antd";
import React from "react";
import DashboardContent from "../../component/view/dashboard/dashboardContent";
import DashboardPanel from "../../component/view/dashboard/dashboardPanel";
import DashboardStoreProvider from "../../context/dashboardStore";

export default function Dashboard() {
  return (
    <DashboardStoreProvider>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <DashboardPanel />
        </Col>
        <Col style={{ marginTop: 15 }}>
          <DashboardContent />
        </Col>
      </Row>
    </DashboardStoreProvider>
  );
}
