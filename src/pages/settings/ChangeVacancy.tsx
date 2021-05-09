import { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  InputNumber,
  Select,
  message,
  Row,
  Col,
} from "antd";
import { axiosInstance } from "./../../tools/axiosInstance";
import { useParams } from "react-router-dom";
import { RouteParams } from "./../../tools/interfaces";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const { Option } = Select;

export const ChangeVacancy = () => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["clean"],
    ],
  };
  const { id } = useParams<RouteParams>();
  const [skills, setSkills] = useState([{ name: "" }]);
  const [loading, setLoading] = useState(0);
  const [render, setRender] = useState(true);
  const [value, setValue] = useState("");
  const [vacancy, setVacancy] = useState({
    main: {
      title: "",
      text: "",
      views: 0,
      publish_date: "",
      recruiter_id: "",
      salary: 0,
    },
    responds: [],
    skills: [],
  });
  useEffect(() => {
    axiosInstance
      .get(`/info/skills_list/`)
      .then((response) => setSkills(response.data));
    axiosInstance.get(`/vacancies/crud_vacancy/${id}/`).then((response) => {
      setVacancy(response.data);
      setValue(response.data.main.text);
      setRender(false);
    });
  }, []);
  const onFinish = (e: any) => {
    setLoading(1);
    axiosInstance
      .put(`/vacancies/crud_vacancy/${id}/`, {
        title: e.title,
        text: value,
        salary: e.salary,
        skills: e.skills,
      })
      .then((response) => {
        if (response.data.status === "ok") {
          message.success("Your vacancy is changed");
        } else {
          message.error("Smth wrong happend, maybe this title is in use");
        }
      });
    setLoading(0);
  };
  return (
    <Row justify={"center"}>
      <Col span={8}>
        {render ? (
          <></>
        ) : (
          <>
            <h1>Change vacancy</h1>
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
                label="Title"
                name="title"
                initialValue={vacancy.main.title}
                rules={[
                  {
                    required: true,
                    message: "Please input your title!",
                  },
                ]}
              >
                <Input maxLength={126} />
              </Form.Item>

              <ReactQuill
                modules={modules}
                theme="snow"
                value={value}
                onChange={setValue}
              />

              <Form.Item
                label="Salary"
                name="salary"
                initialValue={vacancy.main.salary}
                rules={[
                  { required: true, message: "Please, enter salary in USD" },
                ]}
              >
                <InputNumber
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                />
              </Form.Item>

              <Form.Item label="Needed skills" name="skills">
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Please select"
                  defaultValue={vacancy.skills}
                  // onChange={handleChange}
                >
                  {skills.map((item, index) => (
                    <Option key={index} value={item.name}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading > 0}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Col>
    </Row>
  );
};
