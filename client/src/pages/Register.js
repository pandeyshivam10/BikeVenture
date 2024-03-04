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
      <div className="login">
        <Form
          form={form} // Pass the form instance to the Form component
          onFinish={handleSubmit}
          className="login-form"
          layout="vertical"
        >
          <h2 className="abc"> SignUp</h2>
          <hr />

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
              { type: "email", message: "Please enter a valid email address" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
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
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
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
              className="login-form-button"
              style={{ background: "black" }}
            >
              Register
            </Button>
            <label>Or</label>{" "}
            <a style={{ color: "yellow" }} href="/login">
              Login now!
            </a>
          </Form.Item>
        </Form>
      </div>
    </DefaultLayout>
  );
}

export default Register;
