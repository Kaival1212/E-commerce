import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../comps/DataAccess";
import Header from "../comps/Header";
import Sidebar from "../comps/Sidebar";

export default function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getProductById(id).then(data => {
            setProduct(data);
            setLoading(false);
        });
    }, [id]);

    function addtoCart(productid) {
        let cart = localStorage.getItem("cart");
        cart = cart ? cart.split(",") : [];
        cart.push(productid);
        cart = cart.join(",");
        localStorage.setItem("cart", cart);
        console.log(localStorage.getItem("cart"));
    }

    if (loading) {
        return (
            <>
                <Header />
                <div className="flex min-h-screen">
                    <Sidebar />
                    <div className="flex-grow flex items-center justify-center">
                        <div className="text-2xl text-center">
                            Loading product details...
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="flex min-h-screen">
                <Sidebar />
                <div className="flex-grow flex flex-col items-center justify-center bg-[#f4ede4] py-10 px-4">
                    <h1 className="text-4xl font-bold text-[#645454] mb-10">{product.productname}</h1>
                    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
                        <img src={product.producturl} alt={`${product.productname}`} className="mb-4 max-h-60 mx-auto"/>
                        <p className="text-xl mb-4"><strong>Price:</strong> ${product.price}</p>
                        <p className="text-xl mb-4"><strong>Quantity:</strong> {product.quantity} available</p>
                        <button onClick={()=>{addtoCart(product.productid)}} className="mt-4 bg-[#c98986] text-white text-lg px-6 py-3 rounded hover:bg-[#a76d68] transition-colors focus:outline-none focus:ring-2 focus:ring-[#a76d68] focus:ring-opacity-50">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
