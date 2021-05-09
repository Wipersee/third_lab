import React from "react";
import { Layout } from "antd";
import { MainFeed } from "./Components/MainFeed";
import "./../../css/main.css";

const { Header, Footer, Sider, Content } = Layout;

export const JobFeed: React.FC = () => {
  return <MainFeed />;
};
