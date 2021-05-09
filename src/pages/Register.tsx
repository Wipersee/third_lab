import { useHistory } from "react-router-dom";
import { axiosInstance } from "./../tools/axiosInstance";
import { Form, Input, Button, Row, Col, Upload, message } from "antd";
import { useDispatch } from "react-redux";

export const Register = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const onFinish = (e: any) => {
    axiosInstance
      .post("/api/v1/dj-rest-auth/registration/", {
        username: e.username,
        password1: e.password,
        password2: e.reapeat_password,
      })
      .then((response: any) => {
        if (response.status === 201) {
          history.push("/");
          axiosInstance
            .get(`/accounts/me/`)
            .then((response) =>
              dispatch({ type: "SET_USER", payload: response.data })
            );
          dispatch({ type: "SET_LOGIN", payload: true });
          localStorage.setItem("token", response.data.key);
        }
      });
  };
  return (
    <Row align={"middle"} justify={"center"} style={{ height: "100vh" }}>
      <Col span={8}>
        <h1>Core IT register</h1>
        <Form
          layout={"vertical"}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          //   onFinishFailed={onFinishFailed}
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

          <Form.Item
            label="Repeat password"
            name="reapeat_password"
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
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};
