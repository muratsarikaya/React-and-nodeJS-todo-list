import React from 'react';
import PropTypes from 'prop-types';
import Title from "../common/Title";
import {Row, Col, Input, Form, Select, message} from 'antd';
import Button from "../form/Button";
import {VscAdd} from "react-icons/vsc";
import {useTask} from "../../contextApi/TaskContext";
import uniqid from 'uniqid';


const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
const {Option} = Select;


const NewJob = (props) => {
    const {saveTask, dataOptions} = useTask();
    const [form] = Form.useForm();

    const onFinish = (values) => {
        saveTask(
            {"_id":uniqid(),"job_name": values.job_name, "job_priority":values.job_priority}
        )

        message.success({
            content: 'successful',
            className: 'custom-class',
            style: {
                marginTop: "5vh"
            },
        });
        form.resetFields();
    };
    return (
        <div>
            <Title>Create New Job</Title>
            <Form
                form={form}
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 24,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Row>
                    <Col span={14}>

                        <div>
                            <Form.Item style={{display: "block"}}
                                       label="Job Name"
                                       name="job_name"
                                       rules={[
                                           {
                                               required: true,
                                               message: 'Please input your Job Name!',
                                           },
                                           {
                                               pattern: new RegExp("[a-zA-Z][a-zA-Z ]+[a-zA-Z]$"),
                                               message:"Must contain only alphanumeric characters !"
                                           }
                                       ]}

                            >
                                <Input/>
                            </Form.Item>
                        </div>


                    </Col>
                    <Col span={10} style={{display: 'flex'}}>
                        <Form.Item style={{display: 'block', width: "100%", padding: "0 15px"}}
                                   label="Job Priority"
                                   name="job_priority"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Please input your Job Priority!',
                                       },
                                   ]}
                        >
                            <Select
                                showSearch
                                placeholder="Choose"
                                optionFilterProp="children"

                            >
                                {
                                    dataOptions.map((item,index)=>(
                                        <Option key={index} value={item.key}>{item.value}</Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                        <Button position="center" color="#2277e0" htmlType="submit" classProp="7px">
                            <VscAdd/><span>Create</span>
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

NewJob.propTypes = {};
NewJob.defaultProps = {};

export default NewJob;
