import React from 'react';
import headerimg from '../images/headerimg.svg';
import {Link} from "react-router-dom";

export const Header = () => {
    return (
        <header className="bg-gradient-to-r from-pink-500 to-purple-500 text-gray-100 py-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center px-4 lg:px-12">
                <Link to="/" className="flex items-center gap-4 cursor-pointer">
                    <img src={headerimg} alt="Logo" width={48} height={48}/>
                    <span className="text-xl font-bold tracking-wider uppercase">Zoya Clothing</span>
                </Link>
                <nav className="hidden md:flex items-center gap-8 text-lg">
                    <Link to="/"><span className="hover:underline cursor-pointer">Home</span></Link>
                    <Link to={"/admin"}><span className="hover:underline cursor-pointer">Admin</span></Link>
                    <Link to="/main"><span className="hover:underline cursor-pointer">Shop</span></Link>
                    <Link to={"/cart"}><span className="hover:underline cursor-pointer">Cart</span></Link>
                </nav>
                <div className="md:hidden">
                    <img src="/menu-icon.svg" alt="Menu" width={24} height={24} className="cursor-pointer"/>
                </div>
            </div>
        </header>
    );
}

export default Header;
