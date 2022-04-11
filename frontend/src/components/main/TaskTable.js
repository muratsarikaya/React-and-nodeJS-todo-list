import React from 'react';
import PropTypes from 'prop-types';
import {Table} from "antd";

const TaskTable = (props) => {
    return (
        <Table
            loading={props.loading}
            pagination={props.pagination}
            columns={props.columns}
            dataSource={props.dataSource}/>
    );
};

TaskTable.propTypes = {};
TaskTable.defaultProps = {};

export default TaskTable;
