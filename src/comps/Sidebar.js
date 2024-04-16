import {useEffect, useState} from "react";
import {getCategories} from "./DataAccess";
import {Link} from "react-router-dom";


export default function Sidebar() {

const [categories, setCategories] = useState([]);

useEffect(() => {
    getCategories().then((data) => {
        setCategories(data);
    });

}, []);

    return(
            <div className="flex ">
                <div className="bg-gray-200 w-64 p-5 min-h-[80vh]">
                    <Link to="/main">
                        <div className="block bg-gray-300 text-gray-900 text-lg font-bold rounded px-4 py-3 mb-5 text-center shadow">
                            Categories
                        </div>
                    </Link>
                    {categories.map((cat) => (
                        <Link to={`/main/category/${cat.categoryid}`} key={cat.categoryid}>
                            <div className="block py-2 my-2 font-semibold hover:bg-gray-300 rounded text-center">
                                {cat.categoryname}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

    )

}
