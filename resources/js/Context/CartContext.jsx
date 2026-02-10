import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const STORAGE_KEY = 'kaffah_cart';

function getInitialCart() {
    if (typeof window === 'undefined') return [];
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
}

function cartReducer(state, action) {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existing = state.find((item) => item.id === action.payload.id);
            if (existing) {
                return state.map((item) =>
                    item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item
                );
            }
            return [...state, { ...action.payload, qty: 1 }];
        }
        case 'REMOVE_ITEM':
            return state.filter((item) => item.id !== action.payload);
        case 'UPDATE_QTY':
            return state.map((item) =>
                item.id === action.payload.id
                    ? { ...item, qty: Math.max(1, action.payload.qty) }
                    : item
            );
        case 'CLEAR_CART':
            return [];
        default:
            return state;
    }
}

export function CartProvider({ children }) {
    const [cart, dispatch] = useReducer(cartReducer, [], getInitialCart);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    }, [cart]);

    const addItem = (item) => dispatch({ type: 'ADD_ITEM', payload: item });
    const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id });
    const updateQty = (id, qty) => dispatch({ type: 'UPDATE_QTY', payload: { id, qty } });
    const clearCart = () => dispatch({ type: 'CLEAR_CART' });

    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.priceNum * item.qty, 0);

    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, updateQty, clearCart, totalItems, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within CartProvider');
    return context;
}
