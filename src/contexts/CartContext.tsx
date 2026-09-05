'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Cart item type
export interface CartItem {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    type: 'one-time' | 'subscription';
    billingCycle?: 'monthly' | 'yearly';
    quantity: number;
}

// Cart context type
interface CartContextType {
    items: CartItem[];
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    totalItems: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'novamint_cart_v2';

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);

    // Hydrate cart from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem(CART_STORAGE_KEY);
            if (saved) {
                setItems(JSON.parse(saved));
            }
        } catch {
            // Ignore parse errors
        }
        setIsHydrated(true);
    }, []);

    // Sync cart to localStorage whenever items change
    useEffect(() => {
        if (!isHydrated) return;
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
        } catch {
            // Ignore storage quotas
        }
    }, [items, isHydrated]);

    const addItem = (newItem: Omit<CartItem, 'quantity'>) => {
        setItems(prev => {
            const existing = prev.find(item => item.id === newItem.id);
            if (existing) {
                return prev.map(item =>
                    item.id === newItem.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...newItem, quantity: 1 }];
        });
        setIsOpen(true); // Open cart when item is added
    };

    const removeItem = (id: string) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(id);
            return;
        }
        setItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
        try {
            localStorage.removeItem(CART_STORAGE_KEY);
        } catch {
            // Ignore
        }
    };

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{
            items,
            addItem,
            removeItem,
            updateQuantity,
            clearCart,
            isOpen,
            setIsOpen,
            totalItems,
            totalPrice
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
