import React, {useEffect, useState} from "react";
import {Col, Form, Input, Modal, Row, Select, Space, Tooltip, message} from "antd";
import Button from "../../form/Button";
import {GrEdit} from "react-icons/gr";
import {useTask} from "../../../contextApi/TaskContext";
import {VscAdd} from "react-icons/vsc";
import uniqid from "uniqid";


const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const EditMessage = (props) => {
    const {Option} = Select;

    const [form] = Form.useForm();

    const [visible, setVisible] = useState(false);

    const {updateTask, dataOptions} = useTask();

    const setForm = (props) => {
        //debugger;
        form.setFieldsValue({
            job_name: props.itemId.name,
            job_priority: dataOptions.filter((item) => {
                if( item.key === props.itemId.priority[0]){
                    return props.itemId.priority[0]
                }
            }),
        })
        ;

    }
    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        form.submit();
        setVisible(false)
    };

    const handleCancel = () => {
        setVisible(false);
    };
    const onFinish = (values) => {
        values.key = props.itemId.key
        updateTask(values)
        message.success({
            content: 'successful',
            className: 'custom-class',
            style: {
                marginTop: "5vh"
            },
        });
    };
    useEffect(() => {
        setForm(props)
    }, [])
    return (
        <>
            <Space>
                <Tooltip placement="topLeft" title="Prompt Text">
                    <Button className="ant-btn ant-btn-default" htmlType="button" propFunc={showModal} color="#e8e8e8"
                            width="45px"><GrEdit
                        style={{color: "#757575"}}/></Button>
                </Tooltip>
            </Space>

            <Modal
                visible={visible}
                title="Job Edit"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <div key="1" style={{display: "flex", justifyContent: "center"}}>
                        <div key="1" style={{marginRight: "30px"}}>
                            <Button className="" htmlType="button" propFunc={handleCancel}
                                    width="75px">Cancel</Button>
                        </div>
                        <div key="2">
                            <Button className="ant-btn ant-btn-default" propFunc={handleOk} htmlType="button"
                                    color="#e83d6d"
                                    width="75px">Save</Button>
                        </div>

                    </div>
                ]}
            >
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
                        <Col key={1} span={24}>

                            <div>
                                <Form.Item style={{display: "block"}}
                                           label="Job Name"
                                           name="job_name"
                                           rules={[
                                               {
                                                   required: true,
                                                   message: 'Please input your Job Name!',
                                               },
                                           ]}
                                >
                                    <Input disabled/>
                                </Form.Item>
                            </div>
                        </Col>
                        <Col key={2} span={24} style={{display: 'flex'}}>
                            <Form.Item style={{display: 'block', width: "100%"}}
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
                                    placeholder="Choose"
                                    optionFilterProp="children"
                                >
                                    <Option key="1" value="1">Urgent</Option>
                                    <Option key="2" value="2">Regular</Option>
                                    <Option key="3" value="3">Trivial</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};

export default EditMessage;
