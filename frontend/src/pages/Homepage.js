import React from "react";

const HomePage = () => {
    return (
        <div className="flex h-screen bg-pink-100">
            {/* Sidebar */}
            <div className="w-1/6 bg-pink-200 p-4 flex flex-col items-center space-y-4">
                <div className="text-2xl font-bold">☕</div>
                <button className="bg-brown-500 text-white px-4 py-2 rounded">Menu</button>
                <button className="bg-white text-brown-500 px-4 py-2 rounded">Cart</button>
                <button className="bg-white text-brown-500 px-4 py-2 rounded">Log out</button>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
                {/* Search Bar */}
                <div className="flex justify-between items-center mb-4">
                    <input type="text" placeholder="Search" className="border px-4 py-2 w-1/2" />
                    <div className="text-lg">User007</div>
                </div>

                {/* Category Filters */}
                <div className="flex space-x-4 mb-6">
                    <button className="bg-brown-300 px-4 py-2 rounded">All</button>
                    <button className="bg-white px-4 py-2 rounded">Coffee</button>
                    <button className="bg-white px-4 py-2 rounded">Tea</button>
                    <button className="bg-white px-4 py-2 rounded">Juice</button>
                    <button className="bg-white px-4 py-2 rounded">Cake</button>
                    <button className="bg-white px-4 py-2 rounded">Coffee Beans</button>
                </div>

                {/* Product List */}
                <div className="grid grid-cols-3 gap-4">
                    {['Light Roast', 'Medium Roast', 'Dark Roast', 'Light Roast', 'Medium Roast', 'Dark Roast'].map((item, index) => (
                        <div key={index} className="bg-white p-4 rounded shadow flex flex-col items-center">
                            <div className="text-3xl">☕</div>
                            <div>{item}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Order Summary */}
            <div className="w-1/6 bg-pink-200 p-4 flex flex-col justify-between">
                <div>
                    <h2 className="text-lg font-bold mb-4">Order</h2>
                    <input type="text" className="border w-full px-2 py-1" placeholder="Enter order..." />
                </div>
                <button className="bg-brown-500 text-white px-4 py-2 rounded mt-4">Purchase</button>
            </div>
        </div>
    );
};

export default HomePage;
