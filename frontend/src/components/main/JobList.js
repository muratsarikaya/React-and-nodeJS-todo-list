import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {Table, Tag, Space, Tooltip, Modal, Input} from 'antd';
import Title from "../common/Title";
import Button from "../form/Button";
import {GrEdit} from "react-icons/gr";
import JobSearch from "./JobSearch";
import RemoveMessage from "../common/messages/RemoveMessage";
import {useTask} from "../../contextApi/TaskContext";
import EditMessage from "../common/messages/EditMessage";
import Highlighter from 'react-highlight-words';
import TaskTable from "./TaskTable";

const {confirm} = Modal;


const JobList = (props) => {
    const {tasks, dataOptions, getTaskList} = useTask();
    const [priorityStatus, setPriorityStatus] = useState();
    const [searchTextState, setSearchTextState] = useState('');

    const getMyData = () => {
        const datas = tasks.map((item, index) => ({
            key: item._id,
            name: item.job_name,
            priority: [item.job_priority],
            action: item
        }))
        return datas
    }


    const [loading, setLoading] = useState(true);
    const [taskDatas, setTaskDatas] = useState();

    const handleFilter = key => {
        console.log("key",parseInt(key))
        const selected = parseInt(key);
        if (parseInt(selected) === 0) {
            setTaskDatas(getMyData())
        } else {
            const statusMap = {
                0: 0,
                1: 1,
                2: 2,
                3: 3
            };

            const selectedStatus = statusMap[priorityStatus];
            const filteredEvents = getMyData().filter(
                ({name, priority}) => priority[0] === selectedStatus
            );
            setTaskDatas(filteredEvents)
        }


    };
    const handleSearch = searchText => {
        const text = searchText;
        if (text.length > 0) {
            const filteredEvents = getMyData().filter((item) => {
                if(priorityStatus == 0){
                    return item.name.toLowerCase().includes(searchTextState)
                }
                else{
                    return item.name.toLowerCase().includes(searchTextState) && item.priority[0] == priorityStatus
                }

            });
            //const filteredEvents = getMyData().some(task => task.name.toLowerCase() === text)
            setTaskDatas(filteredEvents);
        } else {
            setTaskDatas(getMyData());
        }

    };
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <div>{text}</div>,
        },
        {
            title: 'Priority',
            key: 'priority',
            dataIndex: 'priority',
            width: '20%',
            render: priority => (
                <>
                    {
                        priority.map((tag, index) => {

                            let color;
                            if (tag === 1) {
                                color = '#e83d6d';
                            } else if (tag === 2) {
                                color = '#f1a825';
                            } else {
                                color = '#2477e0';
                            }
                            return (
                                <Button width="85px" color={color} key={index} style={{width: "85px"}}>
                                    {
                                        dataOptions.map((item) => {
                                            if (item.key === tag) {
                                                return item.value
                                            }
                                        })
                                    }
                                </Button>
                            );
                        })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            width: '10%',
            render: (text, record) => (
                <div style={{display: "flex", justifyContent: "end"}}>
                    <Space size="middle">
                        <EditMessage itemId={text}/>
                        <RemoveMessage itemId={text} refreshData={setTaskDatas}/>
                    </Space></div>
            ),
        },
    ];


    useEffect(() => {
        console.log('JobList Mount edildi')
        setLoading(false)
        setTaskDatas(getMyData())
    }, [tasks])

    useEffect(() => {
        console.log('joblist state çalıştı ')
        if(priorityStatus !== 0){
            handleFilter(priorityStatus)
        }
        if(searchTextState.length > 0){
            handleSearch(searchTextState)
        }
    },[priorityStatus, searchTextState])
    return (
        <div>
            <Title>Job List</Title>
            <JobSearch
                searchState={searchTextState}
                priorityState={priorityStatus}
                searchText={setSearchTextState}
                priority={setPriorityStatus}
                handleFilter={handleFilter}
                handleSearch={handleSearch}
            />
            <TaskTable loading={loading} pagination={false} columns={columns} dataSource={taskDatas}/>
        </div>
    );
};

JobList.propTypes = {};
JobList.defaultProps = {};

export default JobList;
