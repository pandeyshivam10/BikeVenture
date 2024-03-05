import React, { useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { userLogin } from "../redux/actions/userActions";

function Login() {
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(userLogin(values));
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <DefaultLayout>
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-md">
          <Form
            onFinish={handleSubmit}
            layout="vertical"
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 transition-transform hover:scale-105"
          >
            <h3 className="text-3xl mb-4">Sign In</h3>
            <hr className="mb-6" />
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
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-800 transition-colors duration-300"
              >
                Log in
              </Button>
              <p className="text-center mt-2">
                Or{" "}
                <a href="/register" className="text-yellow-500 hover:underline">
                  register now!
                </a>
              </p>
            </Form.Item>
            <div className="test text-center">
              <h5>Test Username: user1234</h5>
              <h5>Test Password: 12345678</h5>
            </div>
          </Form>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Login;
