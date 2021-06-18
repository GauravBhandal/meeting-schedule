import React from "react";
import axios from "axios";
import { Form, Button, message, Input } from "antd";

const host = "http://localhost:5000/";

const CreateUser = (props) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    axios.post(`${host}participant/add`, values).then((res) => {
      if (res?.data) {
        props.history.push("/");
        message.success("User created successfully");
      }
    });
  };
  return (
    <div style={{ padding: 100 }}>
      <div
        style={{
          fontWeight: 600,
          fontSize: "1.25rem",
          lineHeight: "1.75rem",
          paddingBottom: "0.5rem",
        }}
      >
        Add new participant
      </div>
      <Form
        form={form}
        name="data"
        colon={false}
        layout="vertical"
        hideRequiredMark
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please enter name of participant",
            },
          ]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please enter valid email",
            },
          ]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form>
    </div>
  );
};
export default CreateUser;
