import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { userLogin } from "../redux/actions/userActions";
import { GoogleOutlined } from "@ant-design/icons";
import { googleLogin } from "../redux/actions/userActions";

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
              <p className="text-right mt-2 flex-row-reverse space-x-20 ">
                <a href="/register" className="text-yellow-500 hover:underline">
                 Register Now !
                </a>
                {/* <a
                  href="/forget-password"
                  className="text-red-500 hover:underline"
                >
                  Forget Password ?
                </a> */}
              </p>
            </Form.Item>

            <Button
              onClick={handleSignIn}
              icon={<GoogleOutlined style={{ fontSize: "24px" }} />}
            >
              Sign in with Google
            </Button>
          </Form>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Login;
