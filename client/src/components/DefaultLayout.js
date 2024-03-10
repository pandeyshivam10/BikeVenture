import React from "react";
import { Button, Dropdown, Row, Space, Col } from "antd";
import { Link } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import { message } from "antd";

function DefaultLayout(props) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const logout = () => {
    localStorage.removeItem("user");
    message.success("Logged Out Succesfull");
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const id = user ? user.data.user._id : null;

  const items = [
    {
      key: "1",
      label: (
        <Link to="/" key="home">
          Home
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link to="/bookings" key="bookings">
          My Bookings
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <Link to={`/profile/${id}`} key="profile">
          Update Profile
        </Link>
      ),
    },
    {
      key: "4",
      label: (
        <a onClick={logout} href="/" key="logout">
          Log Out
        </a>
      ),
    },
  ];

  return (
    <div>
      <div
        className="header bs1"
        style={{ position: "sticky", top: 0, zIndex: 1000 }}
      >
        <Row gutter={16} justify="center" className="pl-5">
          <Col lg={20} sm={24} xs={24}>
            <div className="d-flex  justify-content-between">
              <a
                href="/"
                className="flex items-center justify-center text-center h-12 w-12 rounded-full bg-blue-500 text-white font-bold text-xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
                style={{ textDecoration: "none" }} // inline style to remove underline
              >
                <h1 className=" text-3xl font-bold text-gray-800 leading-none">
                  <span className="text-blue-500">Bike</span>
                  <span className="text-white">Venture</span>
                </h1>
              </a>

              {user ? (
                <Space direction="vertical">
                  <Space wrap>
                    <Dropdown menu={{ items }} placement="bottomRight">
                      <Button className="loginbtn pl-2">
                        <span className="username">
                          {user.data.user.username}
                        </span>
                        {<MenuOutlined />}
                      </Button>
                    </Dropdown>
                  </Space>
                </Space>
              ) : (
                <p></p>
              )}
            </div>
          </Col>
        </Row>
      </div>
      <div className="content">{props.children}</div>

      <Footer key={location.pathname} />
    </div>
  );
}

export default DefaultLayout;
