import { PlusOutlined, SettingOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Tooltip,
} from "antd";
import React, { useState } from "react";
import { useDashboardDataStore } from "../../../context/dashboardStore";

export default function DashboardPanel() {
  const {
    clientConnected,
    mqttConnect,
    mqttDisconnect,
    setData,
    Data,
    setUpdateState,
  } = useDashboardDataStore();
  const [AddModalVisible, setAddModalVisible] = useState(false);

  const handleConnect = (props) => {
    const { host, port } = props;
    mqttConnect({ HOST: host, PORT: port });
  };

  const handleAddComponent = (props) => {
    let tempData = Data;
    tempData.push(props);
    setData(tempData);
    setUpdateState(Math.random());
    message.success("Added");
  };

  const AddComponentForm = () => {
    const componentTypes = ["light"];

    return (
      <Form
        onFinish={handleAddComponent}
        layout="vertical"
        validateMessages={{ required: "'${label} is Required'" }}
      >
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="topic" label="Topic" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="type"
          label="Component Type"
          rules={[{ required: true }]}
        >
          <Select style={{ width: 150 }}>
            {componentTypes.map((val, i) => {
              return (
                <Select.Option key={i} value={val}>
                  {val}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    );
  };
  return (
    <Row justify="center" gutter={[8, 8]}>
      <Col>
        <Form
          onFinish={handleConnect}
          layout="inline"
          validateMessages={{ required: "'${label} is Required'" }}
        >
          <Form.Item name="host" label="Host" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="port" label="Port" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            {!clientConnected ? (
              <Button htmlType="submit">Connect</Button>
            ) : (
              <Button
                danger
                onClick={() => {
                  mqttDisconnect();
                }}
              >
                Disconnect
              </Button>
            )}
          </Form.Item>
        </Form>
      </Col>
      {/* <Col>
        <Tooltip title="Settings" placement="bottom">
          <Button icon={<SettingOutlined />} />
        </Tooltip>
      </Col> */}
      {clientConnected ? (
        <Col>
          <Tooltip title="Add Component" placement="rightBottom">
            <Button
              onClick={() => {
                setAddModalVisible(true);
              }}
              icon={<PlusOutlined />}
            />
          </Tooltip>
          <Modal
            centered
            visible={AddModalVisible}
            footer={null}
            title="Add Component"
            onCancel={() => {
              setAddModalVisible(false);
            }}
          >
            <AddComponentForm />
          </Modal>
        </Col>
      ) : null}
    </Row>
  );
}
