import { Flex, List } from "antd";
import { useEffect, useState } from "react";
import { Typography, message } from "antd";

const { Title } = Typography;

const url = `https://vehicle-maintenance-costs-app.onrender.com/api/expenses`;

function ExpensesPage() {
  const [initLoading, setInitLoading] = useState(true);
  const [list, setList] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setList(res);
      });
  }, []);

  return (
    <>
      {contextHolder}

      <div>
        <h2>Expenses</h2>
        <List
          className="demo-loadmore-list"
          loading={initLoading}
          itemLayout="horizontal"
          dataSource={list}
          renderItem={(item) => (
            <List.Item
              actions={[
                <a
                  onClick={async () => {
                    message.loading('Deleting...', 0.5);
                    fetch(
                      `https://vehicle-maintenance-costs-app.onrender.com/api/expenses/${item.id}`,
                      {
                        method: "DELETE",
                        headers: {
                          "Content-Type": "application/json",
                        },
                      }
                    )
                      .then((data) => {
                        message.success("Expense deleted successfully");
                      })
                      .catch((error) => {
                        message.error("Error deleting expense");
                      });
                  }}
                  key="list-loadmore-delete"
                >
                  delete
                </a>,
              ]}
            >
              <List.Item.Meta title={item.category} description={item.date} />
              <Flex
                style={{ width: "30%" }}
                align="center"
                justify="space-around"
              >
                <Title level={4}>{item.description}</Title>
                <Title level={3}>{item.amount}</Title>
              </Flex>
            </List.Item>
          )}
        />
      </div>
    </>
  );
}

export default ExpensesPage;
