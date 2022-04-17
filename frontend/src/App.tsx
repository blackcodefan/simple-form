import React, { FC, useState } from 'react';
import { Alert, Button, Form, Input } from 'antd';
import './App.scss';
import { Container, H1 } from "./components";
import {response} from "express";

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
                            setMessage({ type: 'success', content: 'Form has been submitted successfully.' });
                        }else {
                            setMessage({ type: 'error', content: jsonRes.email[0]})
                        }
                    });

            })
            .catch(error => {
                setMessage({ type: 'error', content: error.message });
            })
            .finally(() => {
                setLoading(false);
            })
    };

    return (
        <Container>
            <H1>Simple Form</H1>
            {
                message && <Alert type={message.type} message={message.content} />
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
                        { required: true, message: 'URL is required' },
                        { type: 'url', message: 'Invalid url' }
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
                        { required: true, message: 'Email is required' },
                        { type: 'email', message: 'Invalid email address' }
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
                        { required: true, message: 'Ip address is required' },
                        { pattern: regex, message: 'Invalid ip address' }
                    ]}
                >
                    <Input
                        placeholder="Enter the ip address"
                    />
                </Form.Item>
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        { type: 'string', message: 'Invalid name' },
                        { min: 3, message: 'Minimum 3 characters' }
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
        </Container>
    );
};

export default App;