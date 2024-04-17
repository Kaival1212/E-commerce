import React, { useEffect, useState } from 'react';
import Header from '../comps/Header';
import { getProductById } from '../comps/DataAccess';
import {Link} from "react-router-dom";

export default function CartPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const cart = localStorage.getItem('cart');
        if (cart) {
            const cartArray = cart.split(',');
            Promise.all(cartArray.map(productId => getProductById(productId)))
                .then(products => {
                    setProducts(products);
                    setLoading(false);
                    calculateTotal(products);
                });
        } else {
            setLoading(false);
        }
    }, []);

    const calculateTotal = (products) => {
        const totalAmount = products.reduce((acc, product) => acc + parseFloat(product.price), 0);
        setTotal(totalAmount);
    };

    const emptyCart = () => {
        localStorage.removeItem('cart');
        setProducts([]);
        setTotal(0);
    };


    if (loading) {
        return (
            <>
                <Header />
            <div className="flex justify-center items-center h-screen">
            <div className="text-lg font-semibold">Loading...</div>
        </div>
                </>);
    }

    if (products.length === 0) {
        return (
            <>
                <Header />
            <div className="flex justify-center items-center h-screen text-xl font-bold text-gray-600">
                Your cart is empty
            </div>
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="flex flex-col items-center">
                <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
                <div className="w-full md:w-2/3">
                    <ul>
                        {products.map((product, index) => (
                            <li key={index} className="flex justify-between items-center p-4 border-b border-gray-200">
                                <span className="text-lg font-medium">{product.productname}</span>
                                <span className="text-lg text-gray-600">${product.price.toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-between items-center p-4 mt-4 font-semibold text-xl">
                        <span>Total:</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none mr-10 focus:shadow-outline"
                        type="button">
                        Buy Now
                    </button>
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => {emptyCart();}}
                        type="button">
                        Empty cart
                    </button>
                </div>
            </div>
        </>
    );
}
