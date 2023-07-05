import { React, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { Row, Col, Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { userRegister } from "../redux/actions/userActions";
import { useDispatch } from "react-redux";

function Register() {
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    dispatch(userRegister(e));
    console.log(e);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
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
                ]}
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
