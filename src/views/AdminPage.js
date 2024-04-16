import { useEffect, useState } from "react";
import {deleteProduct, getAllProducts, getCategories, getProductsByCategory} from "../comps/DataAccess";
import Header from "../comps/Header";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {Link} from "react-router-dom";


export default function AdminPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        Promise.all([getCategories(), getAllProducts()])
            .then(([categoryData, productData]) => {
                setCategories(categoryData);
                setProducts(productData);
            })
            .catch((error) => {
                console.error("Error loading data:", error)
                setError(error);
            })
            .finally(() => setLoading(false));
    }, []);

    function handleClick(categoryId) {
        setLoading(true);
        const fetchFunction =
            categoryId === "all" ? getAllProducts : () => getProductsByCategory(categoryId);

        fetchFunction(categoryId)
            .then((data) => {
                setProducts(data);
                setSelectedCategory(categoryId);
            })
            .finally(() => setLoading(false));
    }

    function handleProductDelete(productId) {
        setLoading(true);
        confirmAlert({
            title: 'Confirm Delete',
            message: 'Are you sure you want to delete this product?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        deleteProduct(productId)
                            .then(() => {
                                Promise.all([getCategories(), getAllProducts()])
                                    .then(([categoryData, productData]) => {
                                        setCategories(categoryData);
                                        setProducts(productData);
                                    })
                                    .finally(() => setLoading(false));
                            })
                            .catch((error) => {
                                console.error('Error deleting product:', error);
                                setError(error);
                                setLoading(false);
                            });
                    }
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        });
    }

    return (
        <>
            <Header />
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-gray-100 py-4 shadow-lg">
                <div className="container mx-auto flex flex-wrap gap-2 justify-center px-4 lg:px-12">
                    <button
                        onClick={() => handleClick("all")}
                        className={`px-4 py-2 rounded-lg font-medium ${
                            selectedCategory === "all" ? "bg-blue-600" : "bg-green-500 hover:bg-green-600"
                        }`}
                    >
                        All
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.categoryid}
                            onClick={() => handleClick(cat.categoryid)}
                            className={`px-4 py-2 rounded-lg font-medium ${
                                selectedCategory === cat.categoryid ? "bg-blue-600" : "bg-green-500 hover:bg-green-600"
                            }`}
                        >
                            {cat.categoryname}
                        </button>
                    ))}
                </div>
            </div>
            <div className="container mx-auto px-4 lg:px-12 py-8">
                {loading ? (
                    <div className="flex min-h-screen items-center justify-center">
                        <div className="text-2xl text-center">Loading product details...</div>
                    </div>
                ) : error ? (
                    <div className="flex min-h-screen items-center justify-center">
                        <div className="text-2xl text-center text-red-500">
                            Error loading product details: {error.message}
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {products.map((product) => (
                            <div
                                key={product.productid}
                                className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                            >
                                <img src={product.producturl} alt={product.productname}
                                     className="w-full h-48 object-cover"/>
                                <div className="font-medium">{product.productname}</div>
                                <div>Price: {product.price}</div>
                                <div>Quantity: {product.quantity}</div>
                                <div className="flex justify-end space-x-2">

                                    <Link to={`edit/${product.productid}`} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Edit</Link>
                                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600" onClick={()=>{handleProductDelete(product.productid)}}>Delete</button>
                                </div>
                            </div>
                        ))}

                    </div>
                )}
            </div>
        </>
    );
}

