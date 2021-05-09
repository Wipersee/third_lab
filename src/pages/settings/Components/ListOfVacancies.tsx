import { useState, useEffect } from "react";
import { axiosInstance } from "./../../../tools/axiosInstance";
import { List, Button, message } from "antd";
import { VacanycInterface } from "./../../../tools/interfaces";
import { Link } from "react-router-dom";

export const ListOfVacancies = () => {
  const [vacancies, setVacancies] = useState<VacanycInterface[] | undefined>(
    undefined
  );
  useEffect(() => {
    axiosInstance
      .get(`/vacancies/list_of_definite_vacancies/`)
      .then((response) => setVacancies(response.data));
  }, []);
  const delete_vacancy = (id: number) => {
    axiosInstance.delete(`/vacancies/crud_vacancy/${id}/`).then((response) => {
      if (response.data.status === "ok") {
        message.success("Removed");
        setVacancies(vacancies?.filter((obj) => obj.id !== id));
      } else {
        message.error("Error");
      }
    });
  };
  return (
    <List
      bordered
      dataSource={vacancies}
      renderItem={(item) => (
        <List.Item
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Link to={`change/${item.id}`}>{item.title}</Link>
          <Button
            type="primary"
            danger
            onClick={() => {
              delete_vacancy(item.id);
            }}
          >
            Delete
          </Button>
        </List.Item>
      )}
    />
  );
};
