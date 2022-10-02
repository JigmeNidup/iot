import Image from "next/image";
import Link from "next/link";
import { Button, Col, Layout, Menu, Row } from "antd";
import {
  DashboardOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { useDataStore } from "../../context/dataStore";
import logo from "../../public/iothinc_logo.png";

const { Sider, Content } = Layout;
export default function Header({ children }) {
  const { collapsed, setCollapsed } = useDataStore();

  const menuItems = [
    { key: "1", label: <Link href="/">Home</Link>, icon: <HomeOutlined /> },
    {
      key: "2",
      label: <Link href="/dashboard">Dashboard</Link>,
      icon: <DashboardOutlined />,
    },
    {
      key: "3",
      label: <Link href="/chat">Chat</Link>,
      icon: <MessageOutlined />,
    },
  ];

  const TriggerButton = () => {
    return collapsed ? (
      <Button
        icon={<MenuFoldOutlined />}
        onClick={() => {
          setCollapsed(false);
        }}
      />
    ) : (
      <Button
        icon={<MenuUnfoldOutlined />}
        onClick={() => {
          setCollapsed(true);
        }}
      />
    );
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        {!collapsed ? (
          <div style={{ height: 50, padding: 15, marginBottom: 25 }}>
            <center>
              <Image src={logo} height={64} width={180} alt="IothinC logo" />
            </center>
          </div>
        ) : (
          <div style={{ height: 50 }} />
        )}
        <Menu theme="dark" mode="inline" items={menuItems} />
      </Sider>
      <Layout style={{ backgroundColor: "white" }}>
        <Content style={{ padding: 15 }}>
          <div style={{ float: "left" }}>
            <TriggerButton />
          </div>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
