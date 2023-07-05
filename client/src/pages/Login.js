import React, { useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";

import { Row, Col, Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch } from 'react-redux';
import { userLogin } from "../redux/actions/userActions";

function Login() {
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    dispatch(userLogin(e))
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <DefaultLayout>
      <div>
        <div className="login">
          <Row gutter={16} className="d-flex align-items-center">
            <Col lg={16} style={{ position: "relative" }}>
              <img
                src="https://wallpaperaccess.com/full/1433024.jpg"
                alt="loading"
                className="reg-img"
              ></img>
            </Col>
            <Col lg={8} className="text-left">
              <Form
                onFinish={handleSubmit}
                className="login-form"
                layout="vertical"
              >
                <h2 className="abc"> LOGIN FORM </h2>
                <hr />
                <Form.Item
                  name="username"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input prefix={<UserOutlined />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Password"
                  />
                </Form.Item>
                <Form.Item>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                  <a href="/forgot-password">Forgot password</a>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Log in
                  </Button>
                  <label>Or</label> <a href="/register">register now!</a>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Login;
