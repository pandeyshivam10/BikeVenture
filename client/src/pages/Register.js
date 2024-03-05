import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { Form, Input, Button } from "antd";
import {
  UserOutlined,
  UserAddOutlined,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { userRegister } from "../redux/actions/userActions";
import { useDispatch } from "react-redux";

function Register() {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    dispatch(userRegister(values));
    console.log(values);
  };

  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const passwordMinLength = 8;

  const validateConfirmPassword = (_, value) => {
    if (value && value !== form.getFieldValue("password")) {
      setPasswordMatch(false);
      return Promise.reject("Passwords do not match.");
    }
    setPasswordMatch(true);
    return Promise.resolve();
  };

  const validatePassword = (_, value) => {
    if (value && value.length < passwordMinLength) {
      return Promise.reject(
        `Password must be at least ${passwordMinLength} characters long.`
      );
    }

    return Promise.resolve();
  };

  return (
    <DefaultLayout>
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-md">
          <Form
            form={form} // Pass the form instance to the Form component
            onFinish={handleSubmit}
            layout="vertical"
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 transition-transform hover:scale-105"
          >
            <h2 className="text-3xl mb-4">SignUp</h2>
            <hr className="mb-6" />

            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Name" />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please Provide your email" },
                {
                  type: "email",
                  message: "Please enter a valid email address",
                },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input prefix={<UserAddOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
                { validator: validatePassword },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              name="cpassword"
              rules={[
                { required: true, message: "Please input your password!" },
                { validator: validateConfirmPassword },
              ]}
              validateStatus={passwordMatch ? "success" : "error"}
              help={!passwordMatch && "Passwords do not match."}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Confirm Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-800 transition-colors duration-300"
              >
                Register
              </Button>
              <p className="text-center mt-2">
                Or{" "}
                <a href="/login" className="text-yellow-500 hover:underline">
                  Login now!
                </a>
              </p>
            </Form.Item>
          </Form>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Register;
