import React, {useContext, useState, useEffect} from "react";
import axios from "axios";

const TaskContext = React.createContext();

export const useTask = () => {
    return useContext(TaskContext);
};

export const TaskProvider = ({children}) => {
    const [tasks, setTask] = useState([]);

    const saveTask = (data) => {
        const getData = [...tasks, data]

        getData && getData.sort((a, b) => {
            const keyA = a.job_priority, keyB = b.job_priority;
            const keyAn = a.job_name, keyBn = b.job_name;
            if (keyA < keyB) return -1;
            else if (keyA > keyB) return 1;
            else if (keyAn < keyBn) return -1;
            else if (keyAn > keyBn) return 1;
            else return 0;
        })
        setTask(getData);

    }

    const removeTask = (data) => {
        const newData = tasks.filter(item => !data.includes(item._id));
        setTask(newData)
    }

    const updateTask = (data) => {
        console.log("update çalıştı")
        const newListData = tasks
        newListData.map(i => {
            if (i._id === data.key) {
                i.job_priority = parseInt(data.job_priority)
            }
        })
        setTask([''])
        getTasks(newListData);
        localStorage.setItem('data', JSON.stringify(newListData))
    }

    const getTasks = (getData) => {
        getData && getData.sort((a, b) => {
            const keyA = a.job_priority, keyB = b.job_priority;
            const keyAn = a.job_name, keyBn = b.job_name;
            if (keyA < keyB) return -1;
            else if (keyA > keyB) return 1;
            else if (keyAn < keyBn) return -1;
            else if (keyAn > keyBn) return 1;
            else return 0;

        })
        setTask(getData);
    }

    const getTaskList = () => {
        const getData = JSON.parse(localStorage.getItem('data'))
        console.log(getData)
        if (getData != null) {
            if (getData.length > 0) {
                getTasks(getData);
            }

        } else {
            axios.get('http://localhost:3001/api/task-list')
                .then((response) => {
                    getTasks(response.data);
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }


    const dataOptions = [
        {
        key: 1,
        value: "Urgent"
        },
        {
            key: 2,
            value: "Regular"
        },
        {
            key: 3,
            value: "Trivial"
        }]

    useEffect(() => {
        console.log("TaskContext component mount edildi")
        getTaskList();

    }, [])

    useEffect(() => {
        console.log("TaskContext state güncellendi")
        //setTask(JSON.parse(localStorage.getItem('data')));
        localStorage.setItem('data', JSON.stringify(tasks));
        //setTask(JSON.parse(localStorage.getItem('data')));
    })

    useEffect(() => {
        console.log("TaskContext task güncellendi")
    }, [tasks])


    const value = {
        tasks,
        saveTask,
        removeTask,
        updateTask,
        dataOptions,
        getTasks,
        getTaskList
    };

    return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
