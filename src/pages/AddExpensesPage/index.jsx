import React, { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
  InputNumber,
  Select,
  message,
} from "antd";

function AddExpensesPage() {
  const [loading, setLoading] = useState(false);
  const [cars, setCars] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    fetch("https://vehicle-maintenance-costs-app.onrender.com/api/cars")
      .then((res) => res.json())
      .then((res) => {
        setCars(
          res.map((car) => ({
            value: car.id,
            label: `${car.make} ${car.model} ${car.year}`,
          }))
        );
      })
      .catch((err) => {
        setCars([]);
      });
  }, []);

  const onFinish = (values) => {
    setLoading(true);

    fetch("https://vehicle-maintenance-costs-app.onrender.com/api/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: null,
        carId: values.expenses.carId,
        category: values.expenses.category,
        description: values.expenses.description,
        date: new Date(values.expenses.date).toISOString().substring(0, 10),
        amount: values.expenses.amount,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        messageApi.success("Expenses added success");
      })
      .catch((error) => {
        setLoading(false);
        messageApi.error("Expenses added error");
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
            <Form.Item label="Car" name={["expenses", "carId"]}>
              <Select status="error" options={cars} />
            </Form.Item>
            <Form.Item label="Category" name={["expenses", "category"]}>
              <Select
                defaultValue="Fuel"
                options={[
                  { value: "Fuel", label: "Fuel" },
                  { value: "Maintenance", label: "Maintenance" },
                  { value: "Insurance", label: "Insurance" },
                  { value: "Registration", label: "Registration" },
                  { value: "Repairs", label: "Repairs" },
                ]}
              />
            </Form.Item>
            <Form.Item label="Description" name={["expenses", "description"]}>
              <Input />
            </Form.Item>
            <Form.Item label="Date" name={["expenses", "date"]}>
              <DatePicker />
            </Form.Item>
            <Form.Item label="Amount" name={["expenses", "amount"]}>
              <InputNumber max={999999} min={0} step="0.01" />
            </Form.Item>
            <Form.Item wrapperCol={{ ...{ span: 16 }, offset: 8 }}>
              <Button htmlType="submit" type="primary" loading={loading}>
                Add expense
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Flex>
    </>
  );
}

export default AddExpensesPage;
