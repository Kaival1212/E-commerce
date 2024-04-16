import Header from "../comps/Header";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCategories, getProductById, editProduct } from "../comps/DataAccess";

export default function EditPage() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [formData, setFormData] = useState({
        productname: "",
        producturl: "",
        price: "",
        quantity: "",
    });

    useEffect(() => {
        setLoading(true);
        getProductById(id).then((data) => {
            setFormData({
                productname: data.productname,
                producturl: data.producturl,
                price: data.price.toString(),
                quantity: data.quantity.toString(),
            });
            setSelectedCategory(data.categoryid);
            setLoading(false);
        });

        getCategories().then((data) => {
            setCategories(data);
        });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        editProduct(id, {
            ...formData,
            categoryid: selectedCategory,
        }).then(() => {
            setLoading(false);
            alert("Product updated successfully!");
        });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    return (
        <>
            <Header />
            <div className="container mx-auto px-4 lg:px-12 py-8">
                <Link to="/admin" className="text-blue-500 hover:underline">
                    {"<- Back to Admin Page"}
                </Link>
                {loading ? (
                    <div className="flex min-h-screen items-center justify-center">
                        <div className="text-2xl text-center">Loading product details...</div>
                    </div>
                ) : (
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto"
                    >
                        <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
                        <div className="mb-4">
                            <label htmlFor="productname" className="block font-medium mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                id="productname"
                                name="productname"
                                className="border rounded-lg px-4 py-2 w-full"
                                value={formData.productname}
                                onChange={handleChange}
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
                                value={formData.producturl}
                                onChange={handleChange}
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
                                value={formData.price}
                                onChange={handleChange}
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
                                value={formData.quantity}
                                onChange={handleChange}
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
                                value={selectedCategory}
                                onChange={handleCategoryChange}
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
                )}
            </div>
        </>
    );
}
