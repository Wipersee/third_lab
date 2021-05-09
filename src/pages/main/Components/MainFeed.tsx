import React, { useEffect, useState } from "react";
import { axiosInstance } from "./../../../tools/axiosInstance";
import { Row, Col } from "antd";
import { VacanycInterface } from "./../../../tools/interfaces";
import { VacancyCard } from "./VacancyCard";

export const MainFeed: React.FC = () => {
  const [data, setData] = useState<VacanycInterface[] | undefined>(undefined);
  useEffect(() => {
    axiosInstance
      .get("/vacancies/list_of_all_vacancies/")
      .then((response) => setData(response.data));
  }, []);
  return (
    <Row justify={"center"}>
      <Col span={12}>
        {data &&
          data.map((item) => (
            <VacancyCard
              key={item.id}
              id={item.id}
              title={item.title}
              recruiter__username={item.recruiter__username}
              views={item.views}
              publish_date={item.publish_date}
              salary={item.salary}
            ></VacancyCard>
          ))}
      </Col>
    </Row>
  );
};
