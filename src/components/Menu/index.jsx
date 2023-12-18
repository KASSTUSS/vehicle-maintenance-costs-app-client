import { Link, Outlet } from "react-router-dom";
import { Menu, Layout } from "antd";
import { useState } from "react";

const { Sider, Content } = Layout;

const items = [
  {
    label: "Car",
    key: "grp",
    children: [
      {
        key: "1",
        label: <Link to="/cars">Cars</Link>,
      },
      {
        key: "2",
        label: <Link to="/addCar">Add Car</Link>,
      },
    ],
  },
  {
    label: "Expense",
    key: "grp2",
    children: [
      {
        key: "3",
        label: <Link to="/expenses">Expenses</Link>,
      },
      {
        key: "4",
        label: <Link to="/addExpenses">Add expenses</Link>,
      },
    ],
  },
];

function MenuApp() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={"1"}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: "0 16px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default MenuApp;
