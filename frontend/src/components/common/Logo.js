import React from 'react';
import PropTypes from 'prop-types';
import LogoImage from "../../assets/img/logo.png"
const Logo = (props) => {
    return (
        <div className="logoWrapper">
            <img src={LogoImage} alt="logo" style={{width: "150px"}}/>
        </div>
    );
};

Logo.propTypes = {};
Logo.defaultProps = {};

export default Logo;
