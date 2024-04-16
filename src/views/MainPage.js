import React from 'react';
import MainPageimg1 from '../images/MainPageimg1.png';
import MainPageimg2 from '../images/MainPageimg2.png';
import bottomLeftGreen from '../images/bottom left green.svg';
import Header from "../comps/Header";

export default function MainPage() {
    return (
        <div className="relative min-h-screen">
            <Header/>
            {/* Background and images */}
            <img src={bottomLeftGreen} className="absolute bottom-0 left-0" alt="Decorative green graphic" height={300} width={300}/>
            <div className="absolute right-0 h-[70vh] w-[25vw] bg-[#23816a] rounded-bl-[30px] opacity-0 sm:opacity-100"/>
            <img src={MainPageimg2} className="absolute bottom-0 right-0 hidden sm:block sm:opacity-100" alt="Main page 2" height={200} width={200}/>
            <img src={MainPageimg1} className="absolute bottom-0 right-0 mr-52 mb-64 hidden sm:block sm:opacity-100" alt="Main page 1" height={230} width={230}/>

            {/* Main content */}
            <div className="w-[50vw] pt-[10vh] text-start">
                <h1 className="font-extrabold text-5xl">
                    SUMMER SALE<br/>IT'S NEW ARRIVALS
                </h1>
                <a href="/main">
                    <button className="bg-[#c98986] text-white text-lg px-4 py-2 rounded mt-2 leading-loose">
                        CHECK NOW!
                    </button>
                </a>
            </div>

            {/* Discount text */}
            <div className="absolute top-[30vh] right-[5vw] text-white text-3xl sm:opacity-100 opacity-0 z-10">
                25%<br/>OFF
            </div>
        </div>
    );
}
