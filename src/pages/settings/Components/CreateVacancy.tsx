import { useState, useEffect } from "react";
import { Form, Input, Button, InputNumber, Select, message } from "antd";
import { axiosInstance } from "./../../../tools/axiosInstance";
import { useHistory } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const { Option } = Select;

export const CreateVacancy = () => {
  let history = useHistory();
  const [value, setValue] = useState<string>("");
  const [skills, setSkills] = useState([{ name: "" }]);
  const [loading, setLoading] = useState(0);
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
  useEffect(() => {
    axiosInstance
      .get(`/info/skills_list/`)
      .then((response) => setSkills(response.data));
  }, []);
  const onFinish = (e: any) => {
    setLoading(1);
    axiosInstance
      .post(`/vacancies/crud_vacancy/`, {
        title: e.title,
        text: value,
        salary: e.salary,
        skills: e.skills,
      })
      .then((response) => {
        if (response.data.status === "ok") {
          message.success("Your vacancy is published");
          history.push("/");
        } else {
          message.error("Smth wrong happend, maybe this title is in use");
        }
      });
    setLoading(0);
  };
  return (
    <>
      <h1>Create new vacancy</h1>
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
          rules={[{ required: true, message: "Please, enter salary in USD" }]}
        >
          <InputNumber
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
          />
        </Form.Item>

        <Form.Item label="Needed skills" name="skills">
          <Select
            mode="tags"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select"
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
  );
};
