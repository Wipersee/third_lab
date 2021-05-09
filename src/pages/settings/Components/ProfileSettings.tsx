import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./../../../reducers/index";
import {
  Form,
  Input,
  Button,
  InputNumber,
  Slider,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { axiosInstance } from "./../../../tools/axiosInstance";
import {url} from './../../../tools/params'
const props = {
  name: "file",
  action: `${url}accounts/upload_avatar/`,
  headers: {
    authorization: "Token " + localStorage.getItem("token"),
  },
  onChange(info: any) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

export const ProfileSettings = () => {
  const [loading, setLoading] = useState(0);
  const {
    id,
    email,
    username,
    avatar,
    telephone,
    github,
    salary_expectation,
    work_experience_range,
    work_experience_text,
    work_expectation,
    resume,
  } = useSelector((state: RootState) => state.userReducer);
  const onFinish = (e: any) => {
    axiosInstance
      .put(`accounts/edit_user/${id}/`, {
        email: e.email,
        telephone: e.telephone,
        github: e.github,
        salary_expectation: e.excpectations,
        work_experience_range: e.work_experience_range,
        work_experience_text: e.work_experience_text,
        work_expectation: e.work_expectation,
      })
      .then((response) => {
        if (response.status === 200) {
          message.success("Your data are updated");
        } else {
          message.error("Error occured");
        }
      });
  };
  return (
    <>
      <h1>Profile of {username}</h1>
      <Form
        layout={"vertical"}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        //   onFinishFailed={onFinishFailed}
      >
        <Form.Item label="Email" name="email" initialValue={email}>
          <Input maxLength={45} />
        </Form.Item>
        <Form.Item label="Telephone" name="telephone" initialValue={telephone}>
          <Input maxLength={17} />
        </Form.Item>

        <Form.Item label="Github" name="github" initialValue={github}>
          <Input maxLength={256} />
        </Form.Item>

        <Form.Item
          label="Salary excpectations"
          name="excpectations"
          initialValue={salary_expectation}
        >
          <InputNumber
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
          />
        </Form.Item>

        <Form.Item
          label="Work experience"
          name="experience"
          initialValue={work_experience_range}
        >
          <Slider max={40} min={0} />
        </Form.Item>

        <Form.Item
          label="Work experience"
          name="work_experience_text"
          initialValue={work_experience_text}
        >
          <Input.TextArea
            maxLength={2000}
            showCount
            style={{ height: "10rem" }}
          />
        </Form.Item>

        <Form.Item
          label="Work expectation"
          name="work_expectation"
          initialValue={work_expectation}
        >
          <Input.TextArea
            maxLength={2000}
            showCount
            style={{ height: "10rem" }}
          />
        </Form.Item>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "baseline",
          }}
        >
          <p>Upload avatar: &nbsp;</p>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </div>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading > 0}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
