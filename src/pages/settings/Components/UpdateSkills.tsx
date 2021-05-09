import { useState, useEffect } from "react";
import { Form, Select, message, Button, Row, Col } from "antd";
import { useSelector } from "react-redux";
import { axiosInstance } from "./../../../tools/axiosInstance";
import { RootState } from "./../../../reducers/index";
const { Option } = Select;

export const UpdateSkills: React.FC = () => {
  const [skills_list, setSkillsList] = useState([{ name: "" }]);
  const { id, skills } = useSelector((state: RootState) => state.userReducer);
  const [loading, setLoading] = useState(0);
  useEffect(() => {
    axiosInstance
      .get(`/info/skills_list/`)
      .then((response) => setSkillsList(response.data));
  }, []);
  const onFinish = (e: any) => {
    setLoading(1);
    axiosInstance
      .put(`/accounts/edit_user_skills/${id}/`, {
        skills: e.skills,
      })
      .then((response) => {
        if (response.data === "ok") {
          message.success(
            "Your skills is updated, now all reqruiters will see it"
          );
        } else {
          message.error("Smth wrong happend");
        }
      });
    setLoading(0);
  };
  return (
    <Row>
      <Col span={24}>
        <h1>Update list of your skills</h1>
        <Form
          layout={"vertical"}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          //   onFinishFailed={onFinishFailed}
        >
          <Form.Item label="Your Skills" name="skills">
            <Select
              mode="tags"
              allowClear
              style={{ width: "100%" }}
              placeholder="Please select"
              // onChange={handleChange}
              defaultValue={skills.map((item: any) => item.name)}
            >
              {skills_list.map((item, index) => (
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
      </Col>
    </Row>
  );
};
