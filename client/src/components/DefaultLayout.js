import React from "react";
import { Button, Dropdown, Row, Space, Col } from "antd";
import { Link } from "react-router-dom";

import { message } from "antd";

function DefaultLayout(props) {
  const logout = () => {
    localStorage.removeItem("user");
    message.success("Logged Out Succesfull");
  };

  const user = JSON.parse(localStorage.getItem("user"));
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
        <Link to="/profile" key="profile">
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
      <div className="header bs1">
        <Row gutter={16} justify="center">
          <Col lg={20} sm={24} xs={24}>
            <div className="d-flex justify-content-between">
              <a href="/" style={{ textDecoration: "none" }}>
                <h1 className="heading"><span className="span">Bike</span><span style={{color:"white"}}>Venture</span></h1>
              </a>

              {user ? (
                <Space direction="vertical">
                  <Space wrap>
                    <Dropdown menu={{ items }} placement="bottomRight">
                      <Button className="loginbtn">{user.username}</Button>
                    </Dropdown>
                  </Space>
                </Space>
              ) : <p></p>
                // <Space wrap>
                //   <Button className="loginbtn">
                //     <Link to="/login">Log In</Link>
                //   </Button>
                // </Space>
              }
            </div>
          </Col>
        </Row>
      </div>
      <div className="content">{props.children}</div>
    </div>
  );
}

export default DefaultLayout;
