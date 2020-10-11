import React, {useEffect} from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {Layout, Menu} from 'antd';
import {UserOutlined, HomeOutlined, ContainerOutlined, HistoryOutlined} from '@ant-design/icons';
import HomePage from "./pages/HomePage";
import OrderPage from "./pages/OrderPage";
import HistoryPage from "./pages/HistoryPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import signup from "./pages/SignupPage";


import "./App.css";
import ProfileWrapperPage from "./pages/ProfileWrapperPage";

const {Header} = Layout;

function App() {
    return (
        <Router>
            <div>
                <Layout>
                    <Header className="header">
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{textAlign: 'center'}}>
                            <Menu.Item key="1" icon={<HomeOutlined/>}>
                                <Link to="/"/>
                            </Menu.Item>
                            {/*<Menu.Item key="2" icon={<ContainerOutlined/>}>*/}
                            {/*    <Link to="/orderPage"/>*/}
                            {/*</Menu.Item>*/}
                            {/*<Menu.Item key="3" icon={<HistoryOutlined/>}>*/}
                            {/*    <Link to="/historyPage"/>*/}
                            {/*</Menu.Item>*/}
                            <Menu.Item key="4" icon={<UserOutlined/>}>
                                <Link to="/wprofile"/>
                            </Menu.Item>
                        </Menu>
                    </Header>
                </Layout>


                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route exact path="/orderPage">
                        <OrderPage/>
                    </Route>

                    <Route exact path="/login" component={LoginPage}/>
                    <Route exact path="/signup" component={signup}/>

                    <Route exact path="/">
                        <HomePage/>
                    </Route>

                    <Route exact path="/historyPage">
                        <HistoryPage/>
                    </Route>

                    <Route exact path="/profile">
                        <ProfilePage/>
                    </Route>

                    <Route exact path="/wprofile">
                        <ProfileWrapperPage/>
                    </Route>

                </Switch>
            </div>
        </Router>

    );
}

export default App;
