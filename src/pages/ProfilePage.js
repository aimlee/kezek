import React, {useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import {Layout, Input, Tabs, Typography, Button, List, InputNumber, Modal} from 'antd';
import * as auth from "../services/auth";
import {useHistory} from 'react-router-dom';
import {CoffeeOutlined, MinusOutlined, PlusOutlined} from "@ant-design/icons";
import {useLocalStorage} from "@greysonevins/use-local-storage";
import {getProducts, placeOrder} from "../services/db";

const {Content, Footer} = Layout;
const {Title} = Typography;

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

function ProfilePage() {
    const history = useHistory();

    if (auth.me() === null) {
        history.push('/login');
    }

    const categories = ['drink', 'snack', 'topping'];
    const [listData, setListData] = useState({});
    const [order, setOrder] = useLocalStorage('order', {});
    const [count, setCount] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProducts().then(snapshot => {
            const tmpListData = categories.map(category => {
                return [category, snapshot.val().filter(item => item.category === category)];
            }).map(value => {
                return [value[0], value[1].filter(item => item.id in order)];
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

    const logOut = async () => {
        await auth.logout();
        history.push('/');
    };

    const onOrderClick = async () => {
        try {
            await placeOrder(order, auth.me().uid);
        } catch (e) {
            Modal.info({
                title: 'Error occured',
                content: (
                    <div>
                        <p>e</p>
                    </div>
                ),
                onOk() {
                },
            });
        }
    };

    return (
        <Layout>
            <Content style={{padding: '0 50px'}}>
                <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                    <br/>
                    <Content style={{padding: '0 24px', minHeight: 280}}>
                        <Title>My Profile</Title>
                        {auth.me().displayName && (<Title level={4}>{auth.me().displayName}</Title>)}
                        {auth.me().phoneNumber && (<div>Phone Number:{auth.me().phoneNumber}</div>)}
                        {auth.me().email && (<div>Email: {auth.me().email} </div>)}
                    </Content>
                    <Button type="danger" shape="round" size={'large'} onClick={logOut}>
                        Logout
                    </Button>

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
                        <Button type="danger" shape="round" size={'large'} onClick={onOrderClick}>
                            Order
                        </Button>
                    </Content>
                </Layout>
            </Content>
            <Footer style={{textAlign: 'center'}}>nFactorial 2020</Footer>
        </Layout>
    );
}

export default ProfilePage;