import React from "react";
import { Row, Col, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./../../../reducers/index";
import {url} from './../../../tools/params'

export const Header_: React.FC = () => {
  const { username, avatar } = useSelector(
    (state: RootState) => state.userReducer
  );
  return (
    <Row justify={"space-between"} align={"middle"}>
      <Col>
        <Link to="/">
          <h2>Core IT</h2>
        </Link>
      </Col>
      <Col>
        <Row justify={"space-between"} align={"middle"}>
          <Avatar size={40} icon={<UserOutlined />} src={`${url}${avatar}`} />
          <Link to="/settings">
            <p
              style={{
                color: "#152d32",
                fontSize: "1.2rem",
                margin: "0 0 0.5rem 1rem",
              }}
            >
              {username}
            </p>
          </Link>
        </Row>
      </Col>
    </Row>
  );
};
