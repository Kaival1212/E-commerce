import Header from "../comps/Header";
import Sidebar from "../comps/Sidebar";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import { getProductsByCategory} from "../comps/DataAccess";


export default function CatPage() {

    const params = useParams();

    const [products, setProducts] = useState([]);

    useEffect(() => {

        const fetchProducts = async () => {
            const products = await getProductsByCategory(params.id);
            setProducts(products);
        }
        fetchProducts();

    }, [params.id]);

    return (
        <>
            <Header/>
            <div className={"flex gap-10"}>
                <Sidebar/>
                <div className="flex flex-col items-center justify-center flex-grow">
                    <h1 className="text-5xl font-inter text-[#645454] mb-12">Products Catalog</h1>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl px-4 md:px-0">
                        {products.map((product) => (
                                <Link
                                    to={`/main/category/product/${product.productid}`}
                                    key={product.productid}
                                >
                                    <div
                                        className="bg-gray-100 flex flex-col justify-center items-center text-center px-10 py-20 hover:bg-gray-300 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 shadow-xl rounded-xl">
                                        <div
                                            className="w-40 h-40 bg-white p-2 rounded-full flex items-center justify-center overflow-hidden shadow-sm">
                                            <img
                                                src={product.producturl}
                                                alt="Product"
                                                width={160}
                                                height={160}
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="text-xl font-semibold mt-4">
                                            {product.productname}
                                        </div>
                                        <div className="text-lg font-medium mt-1">${product.price}</div>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>

        </>
    )
}
