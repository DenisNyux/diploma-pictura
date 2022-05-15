import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import React, { useState } from 'react';
import classes from './MySideNav.module.css';
import SideNav from "@trendmicro/react-sidenav";

export const MySideNav = ({children}) => {
  const [isVisible, setVisible] = useState(true);

    return (
      
      <SideNav className={classes.sideNav}>
        <SideNav.Toggle
          onClick={() => {
            setVisible(!isVisible);
          }}
        />
        <SideNav.Nav>
          {children}
        </SideNav.Nav>
      </SideNav>
    );
}

export default MySideNav;