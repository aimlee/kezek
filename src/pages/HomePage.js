import React, {useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import {Layout, Avatar, Rate, Row, Col, Input, Tabs, List, Space, Descriptions, Modal, InputNumber, Button} from 'antd';
import {UserOutlined, CoffeeOutlined, PlusOutlined, MinusOutlined} from '@ant-design/icons';
import {getProducts} from "../services/db";
import {useLocalStorage} from "@greysonevins/use-local-storage";

const {Content, Footer} = Layout;

const {Search} = Input;

const {TabPane} = Tabs;


function info() {
    Modal.info({
        title: 'Abzal is Bok',
        content: (
            <div>
                <p>Abzal Bok</p>
            </div>
        ),
        onOk() {
        },
    });
}

function HomePage() {
    const [order, setOrder] = useLocalStorage('order', {});
    const [count, setCount] = useState({});
    const [loading, setLoading] = useState(true);
    const [listData, setListData] = useState({});

    const categories = ['drink', 'snack', 'topping'];

    useEffect(() => {
        getProducts().then(snapshot => {
            const tmpListData = categories.map(category => {
                return [category, snapshot.val().filter(item => item.category === category)];
            });
            setListData(tmpListData.reduce((previousValue, currentValue) => {
                previousValue[currentValue[0]] = currentValue[1];
                return previousValue;
            }, {}));
            setCount(tmpListData.map(value => value[1]).flatMap(value => value)
                .reduce((previousValue, currentValue) => {
                    const cnt = Object.entries(order).filter(value => value[0] === currentValue['id'])[0];
                    previousValue[currentValue['id']] = cnt ? cnt[1] : 0;
                    return previousValue;
                }, {}));
        }).catch(reason => console.error(reason))
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const effectCount = (productId, val) => {
        return Object.entries(count)
            .map(item => {
                if (item[0] === productId)
                    return [item[0], Math.max(0, item[1] + val)];
                return item;
            })
            .reduce((previousValue, currentValue) => {
                previousValue[currentValue[0]] = currentValue[1];
                return previousValue;
            }, {});
    };

    const effectOrder = (productId, val) => {
        const entries = (defaultEntries) => {
            if (!(productId in order)) {
                return [...defaultEntries, [productId, 0]];
            }
            return defaultEntries;
        };
        // console.log(entries(Object.entries(order)));
        return entries(Object.entries(order))
            .map(item => {
                if (item[0] === productId)
                    return [item[0], Math.max(0, val)];
                return item;
            })
            .reduce((previousValue, currentValue) => {
                previousValue[currentValue[0]] = currentValue[1];
                return previousValue;
            }, {});
    };

    const increase = (productId) => () => {
        setCount(effectCount(productId, 1));
    };

    const decrease = (productId) => () => {
        setCount(effectCount(productId, -1));
    };

    const addToCart = (productId) => () => {
        setOrder(effectOrder(productId, count[productId]));
    };

    return (
        <Layout>
            <Content style={{padding: '0 50px'}}>
                <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                    <div className="restaurant-name-logo">
                        <Row gutter={16}>
                            <Col className="gutter-row" span={6}>
                                <Avatar size='large' icon={<UserOutlined/>}/>
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <Descriptions title="RestaurantA" style={{width: 200}}>
                                    <Descriptions.Item>Table 15</Descriptions.Item>
                                    <Descriptions.Item>Almaty, Nurlytau</Descriptions.Item>
                                    <Descriptions.Item>
                                        <Rate allowHalf defaultValue={2.5}/>
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
                    <br/>
                    <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton/>
                    <Content style={{padding: '0 24px', minHeight: 280}}>
                        <Tabs defaultActiveKey="0" centered>
                            {
                                categories.map((category, i) => {
                                    return (<TabPane tab={<span><CoffeeOutlined/>{category}</span>} key={i}>
                                        <List
                                            itemLayout="vertical"
                                            size="large"
                                            pagination={{
                                                onChange: page => {
                                                    console.log(page);
                                                },
                                                pageSize: 3,
                                            }}
                                            dataSource={listData[category]}
                                            loading={loading}

                                            renderItem={item => (
                                                <List.Item
                                                    key={item.title}
                                                    extra={<img
                                                        width={100}
                                                        alt="logo"
                                                        src={item.picture ? item.picture : `https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png`}
                                                    />}>

                                                    <List.Item.Meta
                                                        title={<a onClick={info}>{item.title}</a>}
                                                        description={`${item.price} KZT`}
                                                    />
                                                    <Button type="primary" shape="circle" icon={<MinusOutlined/>}
                                                            onClick={decrease(item.id)}/>
                                                    <InputNumber min={0} max={100} value={count[item.id]}/>
                                                    <Button type="primary" shape="circle" icon={<PlusOutlined/>}
                                                            onClick={increase(item.id)}/>
                                                    <br/><br/>
                                                    <Button type="primary" onClick={addToCart(item.id)} span={12}
                                                            offset={6}>Add To Cart</Button>

                                                </List.Item>
                                            )}
                                        />
                                    </TabPane>);
                                })
                            }
                        </Tabs>
                    </Content>
                </Layout>
            </Content>
            <Footer style={{textAlign: 'center'}}>nFactorial 2020</Footer>
        </Layout>
    );
}

export default HomePage;