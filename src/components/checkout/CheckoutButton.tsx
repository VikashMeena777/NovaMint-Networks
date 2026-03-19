'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui';
import { useCart } from '@/context/CartContext';

interface CheckoutButtonProps {
    billingName: string;
    billingEmail: string;
    billingPhone: string;
    disabled?: boolean;
}

export function CheckoutButton({
    billingName,
    billingEmail,
    billingPhone,
    disabled = false,
}: CheckoutButtonProps) {
    const [loading, setLoading] = useState(false);
    const { items, totalPrice, clearCart } = useCart();
    const router = useRouter();

    const loadCashfreeScript = (): Promise<boolean> => {
        return new Promise((resolve) => {
            if ((window as any).Cashfree) {
                resolve(true);
                return;
            }
            const script = document.createElement('script');
            script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleCheckout = async () => {
        if (!billingName || !billingEmail) {
            alert('Please fill in your billing details');
            return;
        }

        setLoading(true);

        try {
            // Load Cashfree SDK
            const loaded = await loadCashfreeScript();
            if (!loaded) {
                alert('Failed to load payment gateway. Please try again.');
                setLoading(false);
                return;
            }

            // Create order on server
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: items.map((item) => ({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        type: item.type,
                    })),
                    billing_name: billingName,
                    billing_email: billingEmail,
                    billing_phone: billingPhone,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to create order');
            }

            // Initialize Cashfree drop-in checkout
            const cashfree = (window as any).Cashfree({
                mode: data.environment === 'production' ? 'production' : 'sandbox',
            });

            const checkoutOptions = {
                paymentSessionId: data.paymentSessionId,
                redirectTarget: '_self',
            };

            cashfree.checkout(checkoutOptions).then((result: any) => {
                if (result.error) {
                    console.error('Cashfree checkout error:', result.error);
                    router.push(`/checkout/failed?order_id=${data.orderId}`);
                }
                if (result.redirect) {
                    // Payment will redirect, clear cart
                    clearCart();
                }
                if (result.paymentDetails) {
                    clearCart();
                    router.push(`/checkout/success?order_id=${data.orderId}`);
                }
            });
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Failed to initiate checkout. Please try again.');
            setLoading(false);
        }
    };

    return (
        <Button
            onClick={handleCheckout}
            disabled={disabled || loading || items.length === 0}
            className="w-full"
            size="lg"
        >
            {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
                <>
                    <CreditCard className="w-5 h-5" />
                    Pay ₹{totalPrice}
                </>
            )}
        </Button>
    );
}
