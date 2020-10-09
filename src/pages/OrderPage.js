import React from 'react';
import 'antd/dist/antd.css';
import { Layout,  Avatar, Rate, Row, Col, Input, Tabs, List, Space, Typography, Descriptions, Modal, InputNumber, Button} from 'antd';
import { UserOutlined,   PlusOutlined, MinusOutlined } from '@ant-design/icons';

const {   Content, Footer} = Layout;


const { Title } = Typography;


function info() {
  Modal.info({
    title: 'Abzal is Bok',
    content: (
      <div>
        <p>Abzal Bok</p>
      </div>
    ),
    onOk() {},
  });
}



  const listData = [];
  for (let i = 0; i < 23; i++) {
    listData.push({
      href:info,
      title: `Food ${i}`,
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      price:
        `₸ ${i}`,
      amount:0,
    });
        
  }

 function increase(value) {
    return value++;
  };

 function decline(value){
   return value--;
   
  };




function OrderPage() {
  
  
  return (


    <Layout>
    

    <Content style={{ padding: '0 50px' }}>
     
      <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
        <div className="restaurant-name-logo">
            <Row gutter={16}>
            <Col className="gutter-row" span={6}>
                <Avatar size='large' icon={<UserOutlined />} /> 
            </Col>
            <Col className="gutter-row" span={6}>
                <Descriptions title="RestaurantA" style={{ width: 200 }}>
                    <Descriptions.Item>Table 15</Descriptions.Item>
                    <Descriptions.Item>Almaty, Nurlytau</Descriptions.Item>
                    <Descriptions.Item >
                        <Rate allowHalf defaultValue={2.5} />
                    </Descriptions.Item>
                </Descriptions>
                {/* <Card icon={<UserOutlined />} title="RestaurantA" bordered={false} style={{ width: 200 }}>
                    <p>Address</p>
                    <p>Table number</p>
                    <Rate allowHalf defaultValue={2.5} />
                </Card> */}
            </Col>
            </Row>
        </div>

        <br />
        <Content style={{ padding: '0 24px', minHeight: 280 }}>

          <Title>Table number 2</Title>
            <List
                                    itemLayout="vertical"
                                    size="large"
                                    pagination={{
                                    onChange: page => {
                                        console.log(page);
                                    },
                                    pageSize: 3,
                                    }}
                                    dataSource={listData}
                                    
                                    renderItem={item => (
                                    <List.Item
                                        key={item.title}
                                        extra={
                                        <img
                                            width={100}
                                            alt="logo"
                                            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"/>
                                        }
                                    >
                                      
                                        <List.Item.Meta
                                        title={<a onClick={info}>{item.title}</a>}
                                        description={item.price}
                                        />
                                      <Button type="primary" shape="circle" icon={<MinusOutlined />} onClick={decline}/>
                                      <InputNumber min={0} max={100} defaultValue={0} onChange={decline} onChange={increase} />
                                      <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={increase}/>
                                    </List.Item>
                                    )}
                                />
        <Button type="primary" shape="round" style={{ textAlign: 'center' }} size={'large'}>
          Confirm & Send
        </Button>
        <br/>
        <br/>
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
export default OrderPage;