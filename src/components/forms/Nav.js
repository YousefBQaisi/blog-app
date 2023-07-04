import React from 'react';
import { Menu, Container } from 'semantic-ui-react';
// import "./App.css";

const Navbar = () => {
  return (
    <Menu fixed="top" inverted className="navbar">
      <Container>
        <Menu.Item as="a" header>
         UFC Discussion
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item as="a">Home</Menu.Item>
          <Menu.Item as="a">About</Menu.Item>
          
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

export default Navbar;
