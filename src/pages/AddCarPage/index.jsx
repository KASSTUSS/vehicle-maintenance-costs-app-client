import React, { useState } from "react";
import { Button, Flex, Form, Input, InputNumber, message } from "antd";

const url = `https://vehicle-maintenance-costs-app.onrender.com/api/cars`;

function AddCarPage() {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (values) => {
    setLoading(true);
    fetch("https://vehicle-maintenance-costs-app.onrender.com/api/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: null, ...values.car }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        messageApi.success("Car added success");
      })
      .catch((error) => {
        setLoading(false);
        messageApi.error("Car added error");
      });
  };

  return (
    <>
      {contextHolder}
      <Flex justify="center" gap={"large"}>
        <div style={{}}>
          <Form
            onFinish={onFinish}
            layout={{
              labelCol: { span: 8 },
              wrapperCol: { span: 16 },
            }}
            initialValues={{
              size: "large",
            }}
            size={"large"}
            style={{
              maxWidth: 600,
              marginTop: 100,
            }}
          >
            <Form.Item label="Make car" name={["car", "make"]}>
              <Input />
            </Form.Item>
            <Form.Item label="Model car" name={["car", "model"]}>
              <Input />
            </Form.Item>
            <Form.Item label="Year" name={["car", "year"]}>
              <InputNumber max={2024} min={1950} />
            </Form.Item>
            <Form.Item wrapperCol={{ ...{ span: 16 }, offset: 8 }}>
              <Button htmlType="submit" type="primary" loading={loading}>
                Click me!
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Flex>
    </>
  );
}

export default AddCarPage;
