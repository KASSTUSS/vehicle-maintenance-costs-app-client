import { Flex, List } from "antd";
import Title from "antd/es/skeleton/Title";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const url = `https://vehicle-maintenance-costs-app.onrender.com/api/cars/`;

function CarPageOne() {
  const [initLoading, setInitLoading] = useState(true);
  const [data, setData] = useState(null);
  let { id } = useParams();

  useEffect(() => {
    fetch(`${url}${id}`)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setData(res);
        console.log(res);
      });
  }, []);

  return (
    <div>
      <h1>{data && `${data.carDTO.make} ${data.carDTO.model}`}</h1>
      <h2>{data && `${data.carDTO.year}`}</h2>

      <h3>Expenses</h3>
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        dataSource={data?.expenseDTOs}
        renderItem={(item) => (
          <List.Item
            actions={[
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
  );
}

export default CarPageOne;
