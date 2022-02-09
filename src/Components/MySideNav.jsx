import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import React, { useState } from 'react';
import classes from './MySideNav.module.css';
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";

export const MySideNav = ({children}) => {
  const [isVisible, setVisible] = useState(true);

    return (
      
      <SideNav className={classes.sideNav} expanded={isVisible}>
        <SideNav.Toggle
          onClick={() => {
            setVisible(!isVisible);
          }}
        />
        <SideNav.Nav defaultSelected="home">
          <NavItem className={classes.navItem} eventKey="home">
            <NavIcon>
            </NavIcon>
            <NavText>Home</NavText>
          </NavItem>
          <NavItem className={classes.navItem} eventKey="placed orders">
            <NavIcon>
              <i
                className="fa fa-fw fa-line-chart"
                style={{ fontSize: "1.75em" }}
              />
            </NavIcon>
            <NavText>placed orders</NavText>
          </NavItem>
          {children}
        </SideNav.Nav>
      </SideNav>
    );
}

export default MySideNav;