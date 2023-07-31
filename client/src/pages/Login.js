import React, { useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";

import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { userLogin } from "../redux/actions/userActions";

function Login() {
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    dispatch(userLogin(e));
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
          <Form
            onFinish={handleSubmit}
            className="login-form"
            layout="vertical"
          >
            <h3 className="abc">Sign In</h3>
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
            {/* <Form.Item>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                  <a href="/forgot-password">Forgot password</a>
                </Form.Item> */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ background: "black" }}
              >
                Log in
              </Button>
              <label>Or</label>{" "}
              <a style={{ color: "yellow" }} href="/register">
                register now!
              </a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Login;
