import { useState } from "react";
import { Row, Col, Divider, Tag, Button, message } from "antd";
import { TeamOutlined, EyeOutlined, CalendarOutlined } from "@ant-design/icons";
import { axiosInstance } from "./../../../tools/axiosInstance";

export const DetailedVacancyView = (props: any) => {
  const vacancy = props.vacancy;

  const [loading, setLoading] = useState<number>(0);
  const [putStatus, setPutStatus] = useState<number | undefined>(undefined);
  const handleResponse = () => {
    setLoading(1);
    axiosInstance.put(`/vacancies/subscribe_vacancy/${props.id}/`).then(
      (response: any) => {
        if (response.status === 200) {
          setPutStatus(1);
          message.success("Success");
        } else {
          setPutStatus(0);
          message.error("Error occured, try again later");
        }
        setLoading(0);
      },
      (error) => {
        console.log(error);
        setPutStatus(0);
        message.error("Error occured, try again later");
      }
    );
  };
  return (
    <Row justify={"center"}>
      <Col span={12}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <h1>{vacancy.main.title}</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              flexDirection: "column",
            }}
          >
            <p className="vacancy_card_publish_date">
              {vacancy.main.publish_date}&nbsp;&nbsp;
              <CalendarOutlined />
            </p>
            <p className="vacancy_card_salary">{vacancy.main.salary} $</p>
          </div>
        </div>
        <Divider />
        <div dangerouslySetInnerHTML={{ __html: vacancy.main.text}}></div>
        <Divider />
        <p>Needed skills:</p>
        {vacancy.skills.map((item: string, index: number) => (
          <Tag key={index} color="geekblue">
            {item}
          </Tag>
        ))}
        <Divider />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <p className="vacancy_card_views">
              <EyeOutlined /> &nbsp;Views: <b>{vacancy.main.views}</b>
            </p>
            <p className="vacancy_card_views">
              <TeamOutlined />
              &nbsp; Responds : <b>{vacancy.responds.length}</b>
            </p>
          </div>
          <Button
            className="send_request_button"
            loading={loading > 0}
            onClick={handleResponse}
          >
            Send request
          </Button>
        </div>
      </Col>
    </Row>
  );
};
