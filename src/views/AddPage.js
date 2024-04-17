import Header from "../comps/Header";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {addProduct, getCategories} from "../comps/DataAccess";


export default function AddPage() {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories().then((data) => {
            setCategories(data);
        });
    }
    , []);
    function handleSubmit(e) {

        const productname = e.target.productname.value;
        const producturl = e.target.producturl.value;
        const price = e.target.price.value;
        const quantity = e.target.quantity.value;
        const categoryid = e.target.category.value;

        e.preventDefault();

        addProduct({
            productname,
            producturl,
            price,
            quantity,
            categoryid,
        }).then(() => {
            alert("Product added successfully!");
        });
        }





    return(
        <>
        <Header />
    <div className="container mx-auto px-4 lg:px-12 py-8">
        <Link to="/admin" className="text-blue-500 hover:underline">
            {"<- Back to Admin Page"}
        </Link>
        <form
                onSubmit={(e)=>{handleSubmit(e)}}
                className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto"
            >
                <h2 className="text-2xl font-bold mb-4">Add Product</h2>
                <div className="mb-4">
                    <label htmlFor="productname" className="block font-medium mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        id="productname"
                        name="productname"
                        className="border rounded-lg px-4 py-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="producturl" className="block font-medium mb-2">
                        Image URL
                    </label>
                    <input
                        type="url"
                        id="producturl"
                        name="producturl"
                        className="border rounded-lg px-4 py-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block font-medium mb-2">
                        Price
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        className="border rounded-lg px-4 py-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="quantity" className="block font-medium mb-2">
                        Quantity
                    </label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        className="border rounded-lg px-4 py-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="category" className="block font-medium mb-2">
                        Category
                    </label>
                    <select
                        id="category"
                        className="border rounded-lg px-4 py-2 w-full"
                    >
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                            <option key={cat.categoryid} value={cat.categoryid}>
                                {cat.categoryname}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mr-2"
                    >
                        Save
                    </button>
                </div>
            </form>
    </div>
</>
    )

}
