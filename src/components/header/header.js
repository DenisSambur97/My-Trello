import React from "react";
import './header.scss'
import logo from './Trello-logo.png'

const Header = () => {
    return(
        <header className='header'>
            <img src={logo} alt="Trello" className='header__logo'/>
            <p className='header__title'>Аналог <span className="header__title_name">Trello</span> для MAXA Designs</p>
        </header>
    )
}

export default Header