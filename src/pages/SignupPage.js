import React, { Component } from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  InputNumber,
  Layout,
  Button,
  AutoComplete,
} from 'antd';
const {  Header, Content, Footer} = Layout;



class signup extends Component {
	constructor(props) {
		super(props);

		this.state = {
			firstName: '',
			lastName: '',
			phoneNumber: '',
			country: '',
			username: '',
			email: '',
			password: '',
			confirmPassword: '',
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
		this.setState({ loading: true });
		const newUserData = {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			phoneNumber: this.state.phoneNumber,
			country: this.state.country,
			username: this.state.username,
			email: this.state.email,
			password: this.state.password,
			confirmPassword: this.state.confirmPassword
		};
		axios
			.post('/signup', newUserData)
			.then((response) => {
				localStorage.setItem('AuthToken', `${response.data.token}`);
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
		const { classes } = this.props;
        const { errors, loading } = this.state;
        const layout = {
            labelCol: {
              span: 8,
            },
            wrapperCol: {
              span: 16,
            },
          };
          const validateMessages = {
            required: '${label} is required!',
            types: {
              email: '${label} is not validate email!',
              number: '${label} is not a validate number!',
            },
            number: {
              range: '${label} must be between ${min} and ${max}',
            },
          };
		return (
            <Layout>
    <Content style={{ padding: '0 50px' }}>    
      <Layout className="site-layout-background" style={{ padding: '24px 0' }}>      
        <br />
        <Content style={{ padding: '0 24px', minHeight: 280 }}>

        <Form {...layout} name="nest-messages"  validateMessages={validateMessages}>
      <Form.Item
        name={['user', 'name']}
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
        onChange={this.handleChange}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['user', 'email']}
        label="Email"
        rules={[
          {
            type: 'email',
          },
        ]}
        onChange={this.handleChange}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['user', 'age']}
        label="Age"
        rules={[
          {
            type: 'number',
            min: 0,
            max: 99,
          },
        ]}
        onChange={this.handleChange}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item name={['user', 'website']} label="Website"onChange={this.handleChange}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'introduction']} label="Introduction"onChange={this.handleChange}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit" 
							onClick={this.handleSubmit}>
          Submit
        </Button>
      </Form.Item>
    </Form>
        </Content>
      </Layout>
    </Content>
    <Footer style={{ textAlign: 'center' }}>nFactorial 2020</Footer>
  </Layout>
		);
	}
}
export default signup;