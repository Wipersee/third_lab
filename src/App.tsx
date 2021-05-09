import { useEffect } from "react";
import { Login } from "./pages/Login";
import { Switch, Route, useHistory } from "react-router-dom";
import { JobFeed } from "./pages/main/JobFeed";
import { DetailedVacancy } from "./pages/main/DetailedVacancy";
import { SettingsMain } from "./pages/settings/SettingsMain";
import { Layout } from "antd";
import { Header_ } from "./pages/main/Components/Header";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "./tools/axiosInstance";
import { ChangeVacancy } from "./pages/settings/ChangeVacancy";
import { Register } from "./pages/Register";
import { RootState } from "./reducers/index";
const { Header, Content } = Layout;

const App = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { login } = useSelector((state: RootState) => state.loginReducer);
  let history = useHistory();
  useEffect(() => {
    if (!token) {
      history.push("/login");
    } else {
      dispatch({ type: "SET_LOGIN", payload: true });
    }
    axiosInstance
      .get(`/accounts/me/`)
      .then((response) =>
        dispatch({ type: "SET_USER", payload: response.data })
      );
  }, []);

  return (
    <Layout>
      {login ? (
        <Header style={{ background: "#f8f8f8" }}>
          <Header_ />
        </Header>
      ) : (
        <></>
      )}
      <Content style={{ background: "white" }}>
        <Switch>
          <Route exact path={"/"}>
            <JobFeed />
          </Route>
          <Route exact path={"/login"}>
            <Login />
          </Route>
          <Route exact path={"/register"}>
            <Register />
          </Route>
          <Route exact path={"/settings"}>
            <SettingsMain />
          </Route>
          <Route exact path={"/change/:id"} children={<ChangeVacancy />} />
          <Route exact path={"/detailed/:id"} children={<DetailedVacancy />} />
        </Switch>
      </Content>
      {/* <Footer>Footer</Footer> */}
    </Layout>
  );
};

export default App;
