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
        <Nav className='ml-auto nav__center'>
          <NavLink to='/' exact activeClassName='active' className='header__link'>
            <i className='pi pi-image header__pi'/>
            TimeTrack
          </NavLink>
          <NavLink to='/works' activeClassName='active' className='header__link'>
            <i className='pi pi-th-large header__pi'/>
            Works
          </NavLink>
          <NavLink to='/charts' activeClassName='active' className='header__link'>




            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024' width='24px'>
              <path
                fill='currentColor'
                d='M614.9 849.5c0 13 2.9 17.1 16.4 16.8 37.4-.9 74.9-.1 112.4.1 0-210.4-.1-420.8.2-631.2 0-8.9-1.8-10.9-10.7-10.8-39.5.6-79 .3-118.4.3.1 3.5.4 7 .4 10.4 0 204.8.1 409.6-.3 614.4zm-159.2 8.7c-.1 6.2 2.8 8.1 13.3 7.9 33.5-.4 66.9-.4 100.4 0 11.6.1 15.5-1.6 15.2-8.8-.7-26.4-.3-52.8-.3-79.2 0-68.8-.3-137.6.4-206.5.1-8.4-4.2-10.3-17.5-10.1-31.9.5-63.9.5-95.9 0-12.3-.2-15.9 1.6-15.8 9.1.6 47.8.3 95.5.3 143.3.1 48.2.3 96.3-.1 144.3zM309 866.1c33.4-.7 66.9-.9 100.3.1 12 .3 15.2-4.3 15.1-18.2-.5-71-.2-142-.2-213s-.2-142 .2-213c.1-12.5-3.1-16.5-13.6-16.2-33.9.7-67.9.7-101.8 0-10.5-.2-13.6 3.8-13.5 16.3.3 142.6.3 285.2 0 427.9-.1 12.2 3 16.3 13.5 16.1zm-160.3.1c33.4-.4 66.9-.5 100.3 0 12 .2 15.2-2.4 15.1-10.1-.5-39.6-.2-79.2-.2-118.8 0-39.6-.2-79.2.2-118.8.1-7-3.1-9.2-13.6-9.1-33.9.4-67.9.4-101.8 0-10.5-.1-13.6 2.1-13.5 9.1.3 79.6.3 159.1 0 238.7-.1 6.8 2.9 9.1 13.5 9zm637.4 0c33.4-.3 66.9-.4 100.3 0 12 .1 15.2-1.8 15.1-7.8-.5-30.7-.2-61.3-.2-92 0-30.7-.2-61.3.2-92 .1-5.4-3.1-7.1-13.6-7-33.9.3-67.9.3-101.8 0-10.5-.1-13.6 1.7-13.5 7 .3 61.6.3 123.1 0 184.7-.1 5.4 3 7.2 13.5 7.1zm203.2 21.2H51.4V71.7c0-5.9-4.8-10.7-10.7-10.7h-30C4.8 61 0 65.8 0 71.7v856.5c0 5.9 4.8 10.7 10.7 10.7h978.7c5.9 0 10.7-4.8 10.7-10.7v-30.1c-.1-5.9-4.9-10.7-10.8-10.7z'/>
            </svg>

            <span>Charts</span>



            
          </NavLink>
          <NavLink to='/about' activeClassName='active' className='header__link'>
            <i className='pi pi-id-card header__pi'/>
            About
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header;
