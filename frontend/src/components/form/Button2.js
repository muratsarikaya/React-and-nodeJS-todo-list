import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import style from "./form.module.scss"

const ButtonStyle = styled.a`
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
const Button2 = (props) => {
    return (
        <>
            <ButtonStyle width={props.width} classProp={props.classProp} type={props.htmlType} position={props.position} color={props.color} className={style.buttonWrapper}>{props.children}</ButtonStyle>
        </>
    );
};

Button2.propTypes = {};
Button2.defaultProps = {};

export default Button2;
