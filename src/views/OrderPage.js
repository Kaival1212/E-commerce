import {getOrderItems} from "../comps/DataAccess";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Header from "../comps/Header";


export default function OrderPage() {

    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    const [orders, setOrder] = useState([]);

    useEffect(() => {
        getOrderItems(id).then((data) => {
            setOrder(data);
            setLoading(false);
        });
    }, []);

    return (
            <>
                <Header />

                {loading && (
                    <div className="flex justify-center items-center h-screen">
                        <div className="text-lg font-semibold">Loading Orders...</div>
                    </div>
                )}

                {!loading && orders.length > 0 && (
                    <div className="flex justify-center items-center min-h-screen">
                        <div className="text-lg font-semibold">Orders</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
                            {orders.map(order => (
                                <div key={order.orderid} className="bg-white p-4 rounded-lg shadow-md w-full max-w-md hover:bg-amber-50 transition duration-200 ease-in-out">
                                    <h2 className="text-xl font-semibold">Order ID: {order.orderid}</h2>
                                    <div className="text-lg">Product ID: {order.productid}</div>
                                    <div className="text-lg">Total: ${order.price.toFixed(2)}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {!loading && orders.length === 0 && (
                    <div className="flex justify-center items-center h-screen">
                        <div className="text-lg font-semibold">No Orders Found</div>
                    </div>
                )}
            </>
    );
}
