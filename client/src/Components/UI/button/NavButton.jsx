import React from 'react';
import classes from './NavButton.module.css';

export const NavButton = ({id, children}) => {
    return (
        <button id={id} className={classes.NavBtn}>{children}</button>
    )
};

export default NavButton;