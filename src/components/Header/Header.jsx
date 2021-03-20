import React from 'react';
import './Header.scss';

import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Logo from '../Logo/Logo';

const Header = () => {
  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Navbar.Brand>
        <NavLink to='/' exact className='header__link'>
          <Logo />
        </NavLink>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='ml-auto'>
          <NavLink to='/' exact activeClassName='active' className='header__link'>
            <i className="pi pi-image header__pi"/>
            TimeTrack
          </NavLink>
          <NavLink to='/works' activeClassName='active' className='header__link'>
            <i className="pi pi-th-large header__pi"/>
            Works
          </NavLink>
          <NavLink to='/charts' activeClassName='active' className='header__link'>
            <i className="pi pi-chart-bar header__pi"/>
            Charts
          </NavLink>
          <NavLink to='/about' activeClassName='active' className='header__link'>
            <i className="pi pi-id-card header__pi"/>
            About
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header;
