import React from "react";
import { Button, Dropdown, Space } from "antd";
import { Link } from "react-router-dom";

import { message } from "antd";

function DefaultLayout(props) {

  
  const logout = () => {
    localStorage.removeItem("user");
    message.success("Logged Out Succesfull");
  };

  const user = JSON.parse(localStorage.getItem("user"));

  console.log(user);
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
        <div className="d-flex justify-content-between">
          <h1 className="heading">BikeVenture</h1>
          {user ? (
            <Space direction="vertical">
              <Space wrap>
                <Dropdown menu={{ items }} placement="bottomRight">
                  <Button className="loginbtn">{user._id}</Button>
                </Dropdown>
              </Space>
            </Space>
          ) : (
            <Space wrap>
              <Button className="loginbtn">
                <Link to="/login">Log In</Link>
              </Button>
            </Space>
          )}
        </div>
      </div>
      <div className="content">{props.children}</div>
    </div>
  );
}

export default DefaultLayout;
