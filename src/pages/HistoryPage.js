import React from 'react';
import 'antd/dist/antd.css';
import { Layout,    List,  Typography,  Modal,  Button} from 'antd';

const { Content, Footer} = Layout;


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


function HistoryPage() {
  
  
  return (


    <Layout>   

    <Content style={{ padding: '0 50px' }}>
     
      <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
       
        <br />
        <Content style={{ padding: '0 24px', minHeight: 280 }}>

          <Title>Order History</Title>
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
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                 />
                }
                                    >


                                      
                                        <List.Item.Meta
                                        title={<a onClick={info}>{item.title}</a>}
                                        description={item.price}
                                        />
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
export default HistoryPage;