import React, {FC, useState} from 'react';
import {Alert, Button, Form, Input, Layout, PageHeader, Select} from 'antd';
import {Container, H1, Logo} from "./components";
import './App.scss';

const {Option} = Select;
const { Content, Header } = Layout;

interface Message {
    type: 'success' | 'info' | 'warning' | 'error',
    content: string
}

const regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

const App: FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<Message | null>(null);

    const onFinish = async (values: any) => {
        console.log(values);
        setLoading(true);
        setMessage(null);
        fetch('/api/form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(values)
        })
            .then(res => {

                return res.json()
                    .then(jsonRes => {
                        if (res.ok) {
                            setMessage({type: 'success', content: 'Form has been submitted successfully.'});
                        } else {
                            setMessage({type: 'error', content: jsonRes.email[0]})
                        }
                    });

            })
            .catch(error => {
                setMessage({type: 'error', content: error.message});
            })
            .finally(() => {
                setLoading(false);
            })
    };

    return (
        <>
            <Layout style={{background: 'transparent'}}>
                <Header style={{background: 'transparent', padding: 0}}>
                    <PageHeader
                        ghost
                        title={<Logo/> }
                        extra={[
                            <Button type="link" size="small" key="1">Account</Button>,
                            <Button type="link" size="small" key="2">Messages</Button>,
                            <Button type="link" size="small" key="3">Logout</Button>,
                        ]}
                    />
                </Header>
                <Content>
                  <Container>
                <H1>Secure Scan</H1>
                <div style={{backgroundColor: '#f1f1f1', padding: 20, borderRadius: 5}}>
                                    {
                    message && <Alert type={message.type} message={message.content}/>
                }

                <Form
                    layout="vertical"
                    form={form}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Website Url"
                        name="url"
                        rules={[
                            {required: true, message: 'URL is required'},
                            {type: 'url', message: 'Invalid url'}
                        ]}
                    >
                        <Input
                            placeholder="Enter the url"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {required: true, message: 'Email is required'},
                            {type: 'email', message: 'Invalid email address'}
                        ]}
                    >
                        <Input
                            placeholder="Enter the url"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Ip address"
                        name="ip"
                        rules={[
                            {required: true, message: 'Ip address is required'},
                            {pattern: regex, message: 'Invalid ip address'}
                        ]}
                    >
                        <Input
                            placeholder="Enter the ip address"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Period"
                        name="period"
                        rules={[
                            {required: true, message: 'Period is required'}
                        ]}
                    >
                        <Select
                            placeholder="Select a period"
                            allowClear
                        >
                            <Option value="now">Run now</Option>
                            <Option value="daily">Run Daily</Option>
                            <Option value="monthly">Run Monthly</Option>
                            <Option value="quarterly">Run Quarterly</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {type: 'string', message: 'Invalid name'},
                            {min: 3, message: 'Minimum 3 characters'}
                        ]}
                    >
                        <Input
                            placeholder="Enter the name"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>Submit</Button>
                    </Form.Item>
                </Form>
                </div>

            </Container>
                </Content>
            </Layout>
        </>
    );
};

export default App;