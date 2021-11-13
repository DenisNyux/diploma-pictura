import React from 'react'
import { Nav } from 'reactstrap';
import { NavItem } from 'reactstrap';
import NavButton from './UI/button/NavButton';

export const MyNavigation = () => {
    return (
        <Nav vertical>
            <NavButton id="brushBtn"></NavButton>
        </Nav>
    )
}

export default MyNavigation;