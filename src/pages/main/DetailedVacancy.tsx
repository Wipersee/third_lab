import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RouteParams } from "./../../tools/interfaces";

import { DetailedVacancyView } from "./Components/DetailedVacancyView";
import { axiosInstance } from "./../../tools/axiosInstance";

export const DetailedVacancy: React.FC = () => {
  const { id } = useParams<RouteParams>();
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
      .get(`/vacancies/crud_vacancy/${id}/`)
      .then((response) => setVacancy(response.data));
  }, []);
  return <DetailedVacancyView vacancy={vacancy} id={id} />;
};
