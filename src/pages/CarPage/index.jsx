import { List } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const url = `https://vehicle-maintenance-costs-app.onrender.com/api/cars`;

function CarPage() {
  const [initLoading, setInitLoading] = useState(true);
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setList(res);
      });
  }, []);

  return (
    <div>
      <h2>Cars</h2>
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item) => (
          <List.Item
            actions={[
              <a key="list-loadmore-more">
                <Link to={`/cars/${item.id}`}>more</Link>
              </a>,
            ]}
          >
            <List.Item.Meta
              title={item.make}
              description={item.model + item.year}
            />
          </List.Item>
        )}
      />
    </div>
  );
}

export default CarPage;
