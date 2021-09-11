import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state,action) => {
    if(action.type === 'ADD'){

        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingCartItem= state.items[existingCartItemIndex];        
        let updatedItems;
        
        if(existingCartItem){
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem ;
        }
        else {
            updatedItems = state.items.concat(action.item);
        }

         
         const newTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        return {
            items:updatedItems,
            totalAmount: newTotalAmount
        }
        
    }
    if(action.type === 'REMOVE'){
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);
        const existingCartItem = state.items[existingCartItemIndex];
        const newtotalAmount = state.totalAmount - existingCartItem.price;
        let updatedItems;
        if(existingCartItem.amount === 1){
            
            updatedItems = state.items.fiter(item => item.id !== action.id);            
        }
        else{
            const updatedItem = {...existingCartItem , amount: existingCartItem.amount - 1};
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return{
            items: updatedItems,
            totalAmount: newtotalAmount
        };
    }
    return defaultCartState;    
};


const CartProvider = props => {
    const [cartState,dispachCartAction] = useReducer(cartReducer,defaultCartState);
    const addItemHandler = item => {
        dispachCartAction({type:'ADD', item:item});
    };    
    const removeItemHandler = id => {
        dispachCartAction({type:'REMOVE', id:id});
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler ,
        removeItem:removeItemHandler
    };

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
};

export default CartProvider;