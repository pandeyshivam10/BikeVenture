// Edit.js
import React from "react";
import { Form, Input, Button } from "antd";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch } from "react-redux";
import { editUser } from "../redux/actions/editAction";

function Edit() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user")).data.user;

  const onFinish = (values) => {
    const { name, email, username } = values;
    const reqObj = { name, email, username };

    dispatch(editUser(user._id, reqObj));
  };

  return (
    <DefaultLayout>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white p-12 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
          <Form
            name="editForm"
            initialValues={{
              name: user.name,
              email: user.email,
              username: user.username,
            }}
            onFinish={onFinish}
          >
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>

            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>

            <Form.Item label="Username" name="username">
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Edit;
