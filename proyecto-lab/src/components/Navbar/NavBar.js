import React, { Component } from "react";
import { MenuItems } from "./MenuItems";
import './NavBar.css';
import { Button } from "../button/Button";
import { Link } from 'react-router-dom';

class NavBar extends Component {
  state = { 
    clicked: false,
    isLoggedIn: !!localStorage.getItem('token')
  }

  componentDidMount() {
    window.addEventListener('storage', this.handleStorageChange);
    this.checkAuthStatus();
  }

  componentWillUnmount() {
    window.removeEventListener('storage', this.handleStorageChange);
  }

  handleStorageChange = () => {
    const token = localStorage.getItem('token');
    this.setState({ isLoggedIn: !!token });
  }

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked })
  }

  render() {
    const { isLoggedIn } = this.state;
    
    return (
      <nav className="NavbarItems">
        <h1 className="navbar-logo"><Link to={'/'} className="title-link">SGR</Link><i className="fa-solid fa-hospital icono"></i></h1>
        <div className="menu-icon" onClick={this.handleClick}>
          <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
        <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
          {MenuItems.map((item, index) => {
            return item.private
            ? isLoggedIn
              ? (
                <li key={index}>
                  <Link to={item.url} className={item.cName} >
                    {item.title}
                  </Link>
                </li>
              )
              : null
            : (
              <li key={index}>
                <Link to={item.url} className={item.cName} >
                  {item.title}
                </Link>
              </li>
            )
          })}
        </ul>
        {
          !isLoggedIn && <Link to="/login"><Button className='but'>Ingresar</Button></Link>
        }
      </nav>
    )
  }
}

export default NavBar;