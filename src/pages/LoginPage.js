import React, {Component} from 'react';

import axios from 'axios';
import 'antd/dist/antd.css';
import {Layout, Avatar, Tabs, Typography, Button, Form, Checkbox, Input} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {me, signInWithGoogle} from "../services/auth";
import {withRouter} from "react-router-dom";

const {Header, Content, Footer} = Layout;

const {TabPane} = Tabs;

const {Title} = Typography;

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            errors: [],
            loading: false
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        axios
            .post('/login', userData)
            .then((response) => {
                localStorage.setItem('AuthToken', `Bearer ${response.data.token}`);
                this.setState({
                    loading: false,
                });
                this.props.history.push('/');
            })
            .catch((error) => {
                this.setState({
                    errors: error.response.data,
                    loading: false
                });
            });
    };

    render() {
        const {classes} = this.props;
        const {errors, loading} = this.state;

        if (me()) {
            this.props.history.push('/profile');
        }

        return (
            <Layout>
                <Content style={{padding: '0 50px'}}>
                    <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                        <br/>
                        <Content style={{padding: '0 24px', minHeight: 280}}>

                            <Avatar
                                size={80}
                                src="https://www.linkpicture.com/q/111_11.png"
                            />
                            <Typography>
                                Login
                            </Typography>
                            <Form
                                name="normal_login"
                                className="login-form"
                                initialValues={{
                                    remember: true,
                                }}
                            >
                                <Form.Item
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Username!',
                                        },
                                    ]}
                                    onChange={this.handleChange}
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon"/>}
                                           placeholder="Username"/>
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Password!',
                                        },
                                    ]}
                                >
                                    <Input
                                        prefix={<LockOutlined className="site-form-item-icon"/>}
                                        type="password"
                                        placeholder="Password"
                                        onChange={this.handleChange}
                                    />
                                </Form.Item>


                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="login-form-button"
                                            onClick={this.handleSubmit}>
                                        Log in
                                    </Button>
                                    Or <a href="signup">register now!</a>
                                </Form.Item>
                            </Form>
                            <button className="btn btn-danger mr-2" type="button" onClick={this.googleSignIn}>
                                Sign in with Google
                            </button>

                        </Content>
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center'}}>nFactorial 2020</Footer>
            </Layout>
        );
    }

    googleSignIn = async () => {
        try {
            await signInWithGoogle();

            const { history } = this.props;
            history.push('/profile');
        } catch (e) {
            console.error(e);
        }
    }
}

export default withRouter(LoginPage);