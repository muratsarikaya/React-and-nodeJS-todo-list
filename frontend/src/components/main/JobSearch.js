import React from 'react';
import PropTypes from 'prop-types';
import {Form, Input, Button, Checkbox, Row, Col, Select} from 'antd';
import {VscAdd} from "react-icons/vsc";


const {Option} = Select;

const JobSearch = (props) => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const changePriority = (e) => {
        console.log(e)
        props.priority(e)
    }

    const changeSearchText = (e) => {
        props.searchText(e.target.value)
    }
    return (
        <div className="searchListWrapper">
            <Form
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
                            <Form.Item style={{display: "block", margin: "0"}}
                                       name="Job Name"
                                       rules={[
                                           {
                                               message: 'Please input your username!',
                                           },
                                           {
                                               pattern: new RegExp("^[a-zA-Z0-9]*$"),
                                               message: "Must contain only alphanumeric characters !"
                                           }
                                       ]}
                            >
                                <Input placeholder="Job Name" value={props.value} onChange={e => changeSearchText(e)}/>
                            </Form.Item>
                        </div>
                    </Col>
                    <Col span={10} style={{display: 'flex'}}>
                        <Form.Item style={{display: 'block', width: "100%", padding: "0 15px", margin: "0"}}
                                   name="Job Priority"
                                   rules={[
                                       {
                                           message: 'Please input your username!',
                                       },
                                   ]}
                        >
                            <Select
                                placeholder="Choose"
                                onChange={e => changePriority(e)}
                            >
                                <Option value="0">Priority(All)</Option>
                                <Option value="1">Urgent</Option>
                                <Option value="2">Regular</Option>
                                <Option value="3">Trivial</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

JobSearch.propTypes = {};
JobSearch.defaultProps = {};

export default JobSearch;
