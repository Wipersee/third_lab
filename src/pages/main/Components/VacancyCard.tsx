import React from "react";
import { VacanycInterface } from "./../../../tools/interfaces";
import { Link } from "react-router-dom";
import { EyeOutlined, UserOutlined } from "@ant-design/icons";
export const VacancyCard: React.FC<VacanycInterface> = ({
  id,
  title,
  recruiter__username,
  views,
  salary,
  publish_date,
}) => {
  return (
    <Link to={`/detailed/${id}`} className="vacancy_card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p className="vacancy_card_title">{title}</p>
        <p className="vacancy_card_publish_date">{publish_date}</p>
      </div>
      <p className="vacancy_card_reqruiter">
        <UserOutlined /> &nbsp;{recruiter__username}
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p className="vacancy_card_views">
          <EyeOutlined />
          &nbsp; Views: <b>{views}</b>
        </p>
        <p className="vacancy_card_salary">{salary} $</p>
      </div>
    </Link>
  );
};
