import React, { useEffect, useState } from 'react';
import Header from "../comps/Header";
import { getOrders } from "../comps/DataAccess";
import {Link} from "react-router-dom";

export default function DataPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getOrders().then((data) => {
            setOrders(data);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <>
                <Header />
                <div className="flex justify-center items-center h-screen">
                    <div className="text-lg font-semibold">Loading Orders...</div>
                </div>
            </>
        );
    }

    if (orders.length === 0) {
        return (
            <>
                <Header />
                <div className="flex justify-center items-center h-screen">
                    <div className="text-lg font-semibold">No Orders Found</div>
                </div>
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-full max-w-6xl px-4">
                    <div className="text-2xl font-semibold mb-4 text-center">Orders</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {orders.map(order => (
                            <Link to={`order/${order.orderid}`} key={order.orderid} className="block">
                                <div className="bg-white p-4 rounded-lg shadow-md hover:bg-amber-50 transition-colors duration-200">
                                    <h2 className="text-xl font-semibold">Order ID: {order.orderid}</h2>
                                    <div className="text-lg">Customer ID: {order.customerid}</div>
                                    <div className="text-lg">Date: {order.orderdate}</div>
                                    <div className="text-lg">Total: ${order.totalamount.toFixed(2)}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
