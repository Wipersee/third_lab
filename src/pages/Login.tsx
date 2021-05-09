import React, { useState } from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Row, Col, message } from "antd";
import { useHistory, Link } from "react-router-dom";
import { axiosInstance } from "./../tools/axiosInstance";
import { useDispatch } from "react-redux";
interface LoginParams {
  username: string;
  password: string;
}

export const Login: React.FC = () => {
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  let history = useHistory();
  const onFinish = (e: LoginParams) => {
    axiosInstance
      .post("/api/v1/dj-rest-auth/login/", {
        username: e.username,
        password: e.password,
      })
      .then(
        (data) => {
          dispatch({ type: "SET_LOGIN", payload: true });
          localStorage.setItem("token", data.data.key);
          axiosInstance
            .get(`/accounts/me/`)
            .then((response) =>
              dispatch({ type: "SET_USER", payload: response.data })
            );

          history.push("/");
        },
        (error) => {
          setError(true);
          setTimeout(() => setError(false), 2000);
          console.log(error);
        }
      );
  };
  const onFinishFailed = (e: any) => {
    setError(true);
  };
  const ShowError = () => {
    message.error("Error, check password or username");
    return <></>;
  };
  return (
    <>
      {error ? <ShowError /> : <></>}
      <Row align={"middle"} justify={"center"} style={{ height: "100vh" }}>
        <Col span={8}>
          <h1>Core IT</h1>
          <Form
            layout={"vertical"}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Link to="/register">Register</Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};
