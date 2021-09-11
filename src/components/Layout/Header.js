import React, { Fragment } from "react";
import classes from './Header.module.css';
import mealsImage from '../../assets/meals.jpg';
import HeaderButton from "./HeaderButton";

const Header = (props) =>{
    return(
        <Fragment>
            <header className={classes.header}>
                <h1>React Meals</h1>
                <HeaderButton onClick={props.onShowCart}/>
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt="Best meals app!"/>
            </div> 
        </Fragment>
    )
}
export default Header;