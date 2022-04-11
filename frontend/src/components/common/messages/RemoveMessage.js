import React from "react";
import {message, Modal, Space, Tooltip} from "antd";
import Button from "../../form/Button";
import Button2 from '../../form/Button2'
import {GrTrash} from "react-icons/gr";
import {DeleteOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import {useTask} from "../../../contextApi/TaskContext";


const RemoveMessage = (props) => {
    const {removeTask} = useTask();

    const showDeleteConfirm = () => {

        Modal.confirm({
            title: "Are you sure you want to delete it?",
            icon: <ExclamationCircleOutlined style={{display:"block", width: "100%",
                float: "none",
                textAlign: "center", fontSize: "42px", color: "#e83d6d", marginBottom:"10px"}}/>,
            content: "",
            okText: "Approve",
            okType: "primary",
            cancelText: "Cancel",
            okButtonProps:{className:"ant-btn-dangerous"},

            onOk() {
               removeTask(props.itemId.key)
                props.refreshData();
                message.success({
                    content: 'successful',
                    className: 'custom-class',
                    style: {
                        marginTop: "5vh"
                    },
                });
            },
            onCancel() {

            },
        });
    };
    return (
        <Space>
            <Tooltip placement="topLeft" title="Prompt Text">
                <Button className="ant-btn ant-btn-default" htmlType="button" propFunc={showDeleteConfirm} color="#e8e8e8" width="45px"><GrTrash
                    style={{color: "#757575"}}/></Button>
            </Tooltip>
        </Space>
    );
};

export default RemoveMessage;
