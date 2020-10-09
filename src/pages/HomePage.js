import React, { useState }  from 'react';
import 'antd/dist/antd.css';
import { Layout,  Avatar, Rate, Row, Col, Input, Tabs, List, Space, Descriptions, Modal, InputNumber, Button} from 'antd';
import { UserOutlined,  CoffeeOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';

const {  Content, Footer} = Layout;

const { Search } = Input;

const { TabPane } = Tabs;


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

function HomePage() {  

  let [count, setCount] = useState(0);
  
  function decrease(){
    count = count -1;
    if(count<0){
      count=0;
    }
    setCount(count);
  };

  function increase(){
    setCount(count + 1);
  };

 
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
        <Search placeholder="input search text"  onSearch={value => console.log(value)} enterButton />       
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <Tabs defaultActiveKey="1" centered>
                <TabPane tab={<span>
                                <CoffeeOutlined />
                                Drinks
                              </span>} key="1">
                              
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
                                        extra={<img
                                            width={100}
                                            alt="logo"
                                            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                        />}>
                                      
                                        <List.Item.Meta
                                        title={<a onClick={info}>{item.title}</a>}
                                        description={item.price}
                                        />
                                      <Button type="primary" shape="circle" icon={<MinusOutlined />} onClick={decrease }/>
                                      <InputNumber min={0} max={100} value={count}   />
                                      <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={increase}/>
                                      <br/><br/>
                                      <Button type ="primary" onClick={decrease } span={12} offset={6}>Add To Cart</Button>
                                      
                                    </List.Item>
                                    )}
                                />
                              </TabPane>
                <TabPane tab={<span>
                                <CoffeeOutlined />
                                Eats
                              </span>} key="2"></TabPane>
                              <TabPane tab={<span>
                                <CoffeeOutlined />
                                Snacks
                              </span>} key="3"></TabPane>
                              <TabPane tab={<span>
                                <CoffeeOutlined />
                              </span>} key="4"></TabPane>
            </Tabs>
        </Content>
      </Layout>
    </Content>
    <Footer style={{ textAlign: 'center' }}>nFactorial 2020</Footer>
  </Layout>
  );
}
export default HomePage;