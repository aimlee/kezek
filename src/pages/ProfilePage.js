import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Input, Tabs,  Typography, Button} from 'antd';

const {  Header, Content, Footer} = Layout;

const { TabPane } = Tabs;



const { Title } = Typography;


  

function ProfilePage() {  
  return (
    <Layout>
    <Content style={{ padding: '0 50px' }}>    
      <Layout className="site-layout-background" style={{ padding: '24px 0' }}>      
        <br />
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          <Title>My Profile</Title>
          <Title level={4}>Jack Jones</Title> 
          <div>My Name: </div>
          <div>Phone Number: </div>
          <div>Email: </div> 
        <Button type="primary" shape="round" size={'large'}>
          Delete ALL
        </Button> 
        </Content>
      </Layout>
    </Content>
    <Footer style={{ textAlign: 'center' }}>nFactorial 2020</Footer>
  </Layout>
  );
}
export default ProfilePage;