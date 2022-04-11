import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import style from "./form.module.scss"

const ButtonStyle = styled.button`
  width: ${props => props.width ? props.width : 'auto'};
  height: ${props => props.height ? props.height : "32px"};
  background-color: ${props => props.color ? props.color : "#2277e0"};
  color:#fff;
  align-self: ${props => props.position ? props.position : "start"} ;
  margin-top: ${props => props.classProp ? props.classProp : "0"} ;
  border:none;
  outline:none;
  border-radius: 3px;
`;
const Button = (props) => {
    return (
        <>
            <ButtonStyle width={props.width} onClick={props.propFunc} classProp={props.classProp} type={props.htmlType} position={props.position} color={props.color} className={style.buttonWrapper}>{props.children}</ButtonStyle>
        </>
    );
};

Button.propTypes = {};
Button.defaultProps = {};

export default Button;
