import React from 'react';
import PropTypes from 'prop-types';
import NewJob from "./NewJob";
import JobList from "./JobList";
import JobSearch from "./JobSearch";

const Main = (props) => {
    return (
        <>
            <div className="newJobWrapper">
                <NewJob/>
            </div>
            <div className="tableListWrapper">
                <JobList/>
            </div>
        </>
    );
};

Main.propTypes = {};
Main.defaultProps = {};

export default Main;
