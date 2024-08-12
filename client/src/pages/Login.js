import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { userLogin } from "../redux/actions/userActions";
import { GoogleOutlined } from "@ant-design/icons";
import { googleLogin } from "../redux/actions/userActions";
import LoginPhoto from "../images/loginphoto.jpg";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function Login() {
  const dispatch = useDispatch();
  const handleSignIn = () => {
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

  const handleSubmit = (values) => {
    dispatch(userLogin(values));
  };

  return (
    <DefaultLayout>
      <div className="flex flex-col md:flex-row h-screen">
        {/* Photo Section */}
        <div className="md:w-1/2 w-full relative">
          <img
            src={LoginPhoto}
            alt="Login"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="md:w-1/2 w-full flex justify-center items-center p-4">
          <div className="w-full max-w-md">
            <Form
              onFinish={handleSubmit}
              layout="vertical"
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 transition-transform hover:scale-105"
            >
              <div className=" mb-3">
                {/* Welcome Back Message */}
                <h1 className="text-3xl mb-4 font-bold italic">
                  Welcome Back to
                </h1>

                {/* Logo Button */}
                <div className="flex items-center justify-center ">
                  <div className="flex items-center justify-center text-center h-12 w-12 rounded-full bg-blue-500 text-white font-bold text-xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
                    <h1 className="text-3xl font-bold text-gray-800 leading-none">
                      <span className="text-blue-500">Bike</span>
                      <span className="text-grey">Venture</span>
                    </h1>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleSignIn}
                icon={<GoogleOutlined style={{ fontSize: "24px" }} />}
                className="w-full mt-2 bg-white text-gray-800 border border-gray-300 shadow-sm hover:bg-gray-50 transition-colors duration-300"
              >
                Sign in with Google
              </Button>

              <div className="flex items-center justify-center my-4">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="mx-4 text-gray-500">
                  or login with your Username
                </span>
                <hr className="flex-grow border-t border-gray-300" />
              </div>

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
                <div className="flex justify-between mt-2">
                  <div className="ml-auto">
                    <a
                      href="/forget-password"
                      className="text-red-500 hover:underline"
                    >
                      Forget Password?
                    </a>
                  </div>
                </div>

                <div className="flex items-center justify-center my-4">
                  <span className="text-gray-500">Don’t have an account?</span>
                  <a
                    href="/register"
                    className="ml-2 text-blue-500 hover:underline"
                  >
                    Create account
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

export default Login;
