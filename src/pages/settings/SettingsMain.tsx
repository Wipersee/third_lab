import { Row, Col, Button, Tabs } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./../../reducers/index";
import { useHistory } from "react-router-dom";
import { CreateVacancy } from "./Components/CreateVacancy";
import { ListOfVacancies } from "./Components/ListOfVacancies";
import { ProfileSettings } from "./Components/ProfileSettings";
import { ListOfResponds } from "./Components/ListOfResponds";
import { axiosInstance } from "./../../tools/axiosInstance";
import { UpdateSkills } from "./Components/UpdateSkills";
const { TabPane } = Tabs;

export const SettingsMain = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { is_recruiter } = useSelector((state: RootState) => state.userReducer);
  const handleLogout = () => {
    axiosInstance.post("/api/v1/dj-rest-auth/logout/");
    localStorage.removeItem("token");
    dispatch({ type: "SET_LOGIN", payload: false });
    history.push("/login");
  };
  return (
    <Row justify={"center"} align={"middle"} style={{ marginTop: "2rem" }}>
      <Col span={15}>
        <Tabs defaultActiveKey="1" tabPosition={"left"}>
          <TabPane key={1} tab={`Profile`}>
            <ProfileSettings />
          </TabPane>
          <TabPane key={6} tab={"Update skills"}>
            <UpdateSkills />
          </TabPane>
          {is_recruiter ? (
            <>
              <TabPane key={2} tab={"Create vacancy"}>
                <CreateVacancy />
              </TabPane>
              <TabPane key={4} tab={"List of vacancies"}>
                <ListOfVacancies />
              </TabPane>
              <TabPane key={5} tab={"List of responds"}>
                <ListOfResponds />
              </TabPane>
            </>
          ) : (
            <></>
          )}
          <TabPane key={3} tab={"Log out"}>
            <Button onClick={handleLogout}> Logout</Button>
          </TabPane>
        </Tabs>
      </Col>
    </Row>
  );
};
