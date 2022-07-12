import React, {Component} from "react";
import {MenuItems} from "./MenuItems";
import './NavBar.css';
import {Button} from "../button/Button";
import {Link} from 'react-router-dom';

class NavBar extends Component{
state = { clicked: false }

handleClick = () => {
  this.setState({clicked: !this.state.clicked})
}



render() {
  const isLoggedIn = localStorage.getItem('token')
  isLoggedIn ? console.log("logeado") : console.error("no logeado");
  return (
    <nav className="NavbarItems">
      <h1 className="navbar-logo"><Link to={'/'} className="title-link">SGR</Link><i className="fa-solid fa-hospital icono"></i></h1>
      <div className="menu-icon" onClick={this.handleClick}>
        <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
      </div>
      <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
        {MenuItems.map((item,index)=>{
          return (
            <li key={index}>
              <Link to={item.url} className={item.cName} >
                {item.title}
              </Link>
            </li>
          )
        })}
      </ul>
      {/* <div>{isLoggedIn ? <Link to="/profile"><Button>Perfil</Button></Link> : <Link to="/login"><Button>Ingresar</Button></Link>}</div> */}
      <Link to="/login"><Button>Ingresar</Button></Link>
    </nav>
  )
}
}
export default NavBar;