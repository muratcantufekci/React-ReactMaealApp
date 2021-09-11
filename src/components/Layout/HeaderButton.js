import { useContext, useEffect, useState } from 'react';
import classes from './HeaderButton.module.css';
import CartIcon from '../Card/CartIcon';
import CartContext from '../store/cart-context';


const HeaderButton = props => {
    const [btnIsHighlighted,setBtnIsHighlighted] = useState(false);
    const cartCtx = useContext(CartContext);
    const {items} = cartCtx;
    const numberOfCartItems = items.reduce((currNumber, item) => {
        return currNumber + item.amount;
    },0);
    

    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

    useEffect(()=> {
        if(items.length === 0){
            return;
        }
        setBtnIsHighlighted(true);
        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        },300);
        return () => {
            clearTimeout(timer);
        }

    },[items]);
    return <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
            <CartIcon />
            </span>
            <span>Your Card</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    
}
export default HeaderButton;