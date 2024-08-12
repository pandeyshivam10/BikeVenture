import React, { useState } from "react";
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
import { GoogleOutlined } from "@ant-design/icons";
import loginphoto from "../images/loginphoto.jpg";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { googleLogin } from "../redux/actions/userActions";

function Register() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [passwordMatch, setPasswordMatch] = useState(true);
  const passwordMinLength = 8;

  const handleSubmit = (values) => {
    dispatch(userRegister(values));
    console.log(values);
  };

  const handleGoogleSignIn = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // console.log(token);
        const user = result.user;
        const reqObj = {
          name: user.displayName,
          password: user.uid,
          email: user.email,
        };

        dispatch(googleLogin(reqObj));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
      });
  };

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
      <div className="flex flex-col md:flex-row h-screen">
        {/* Photo Section */}
        <div className="md:w-1/2 w-full relative">
          <img
            src={loginphoto}
            alt="Register"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="md:w-1/2 w-full flex justify-center items-center p-4">
          <div className="w-full max-w-md">
            <Form
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 transition-transform hover:scale-105"
            >
              <div className="mb-3">
                {/* Welcome Message */}
                <h1 className="text-2xl mb-4 font-bold italic">
                  Ready to Begin Your Journey with
                </h1>

                {/* Logo Button */}
                <div className="flex items-center justify-center mb-3">
                  <div className="flex items-center justify-center text-center h-12 w-12 rounded-full bg-blue-500 text-white font-bold text-xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
                    <h1 className="text-3xl font-bold text-gray-800 leading-none">
                      <span className="text-blue-500">Bike</span>
                      <span className="text-grey">Venture</span>
                    </h1>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleGoogleSignIn}
                icon={<GoogleOutlined style={{ fontSize: "24px" }} />}
                className="w-full mb-4 bg-white text-gray-800 border border-gray-300 shadow-sm hover:bg-gray-50 transition-colors duration-300"
              >
                Sign in with Google
              </Button>

              <div className="flex items-center justify-center my-2">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="mx-4 text-gray-500">
                  or register with your details
                </span>
                <hr className="flex-grow border-t border-gray-300" />
              </div>

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
                  { required: true, message: "Please provide your email" },
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
                  { required: true, message: "Please confirm your password!" },
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
                <div className="flex items-center justify-center my-4">
                  <span className="text-gray-500">
                    Already have an account?
                  </span>
                  <a
                    href="/login"
                    className="ml-2 text-blue-500 hover:underline"
                  >
                    Log in
                  </a>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Register;
