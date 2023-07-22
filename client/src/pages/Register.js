import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { Row, Col, Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { userRegister } from "../redux/actions/userActions";
import { useDispatch } from "react-redux";

function Register() {
  const dispatch = useDispatch();

  // Use the Ant Design useForm hook to get access to the form instance
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
              form={form} // Pass the form instance to the Form component
              onFinish={handleSubmit}
              className="login-form"
              layout="vertical"
            >
              <h2 className="abc"> REGISTER FORM </h2>
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
                  className="login-form-button"
                >
                  Register
                </Button>
                <label>Or</label> <a href="/login">Login now!</a>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </DefaultLayout>
  );
}

export default Register;
