import WebApp from "@twa-dev/sdk";
import Hamster from "../../icons/Hamster.tsx";
import Settings from "../../icons/Settings.tsx";
import Friends from "../../icons/Friends.tsx";
import Status from "../../icons/Status.tsx";
import Post from "../../icons/Post.tsx";
import Upload from "../../icons/Upload.tsx";
import Coins from "../../icons/Coins.tsx";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Slider} from "antd";

const Stats = () => {

    // Settings for the carousel
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    // Sample data for recent and old posts
    const recentPosts = [
        {
            title: "The Economist",
            description: "Xi Jinping is trying to remake the Chinese economy",
            duration: "26 mins",
            image: "https://via.placeholder.com/150"
        },
        {
            title: "The Conversation",
            description: "How Deng Xiaoping set China on a path to rule the world",
            duration: "8 mins",
            image: "https://via.placeholder.com/150"
        },
    ];

    return (
        <>
            {/* Main container */}
            <div className="bg-black flex justify-center min-h-screen">
                <div className="w-full text-white h-screen flex flex-col max-w-xl">

                    {/* Header Section */}
                    <div className="px-4 py-6 bg-black border-b border-gray-700 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Hamster size={28} className="text-gray-300"/>
                            <span className="text-xl font-semibold text-white">
                                {WebApp.initDataUnsafe?.user?.first_name || 'Guest'}
                            </span>
                        </div>
                        <Settings size={24} className="text-gray-300 hover:text-white transition"/>
                    </div>

                    {/* Scrollable Content Area */}
                    <div className="flex-grow bg-gradient-to-b from-black to-gray-900 pt-6 pb-16 overflow-y-auto">
                        <div className="px-4 space-y-6">

                            {/* Carousel Slider for Recent Posts */}
                            <Slider {...sliderSettings}>
                                {recentPosts.map((post, index) => (
                                    <div key={index}
                                         className="bg-[#1d2025] p-4 rounded-xl flex items-center shadow-lg flex-col">
                                        <div className="flex justify-center w-full">
                                            <img
                                                src={post.image}
                                                alt={`Episode ${index + 1} Thumbnail`}
                                                className="w-[1000px] h-[200px] object-cover"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </Slider>

                            {/* Old Posts Section */}
                            <div className="bg-[#1d2025] p-4 rounded-xl flex items-center space-x-4">
                                <img
                                    src="https://via.placeholder.com/80"
                                    alt="Episode 2 Thumbnail"
                                    className="w-20 h-20 rounded-lg object-cover"
                                />
                                <div>
                                    <h4 className="text-red-400 font-bold">The Conversation</h4>
                                    <p className="text-gray-300 text-sm">
                                        How Deng Xiaoping set China on a path to rule the world
                                    </p>
                                    <p className="text-gray-500 text-xs">8 mins</p>
                                </div>
                            </div>

                            <div className="bg-[#1d2025] p-4 rounded-xl flex items-center space-x-4">
                                <img
                                    src="https://via.placeholder.com/80"
                                    alt="Episode 2 Thumbnail"
                                    className="w-20 h-20 rounded-lg object-cover"
                                />
                                <div>
                                    <h4 className="text-red-400 font-bold">The Conversation</h4>
                                    <p className="text-gray-300 text-sm">
                                        How Deng Xiaoping set China on a path to rule the world
                                    </p>
                                    <p className="text-gray-500 text-xs">8 mins</p>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Bottom Navigation Bar */}
                    <div
                        className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-xl bg-[#E1F0F5] flex justify-around items-center z-50 rounded-t-3xl py-3 shadow-2xl drop-shadow-lg transition-all duration-300"
                    >
                        {/* Wallet */}
                        <div
                            className="text-center text-black w-1/5 hover:text-blue-700 transition-colors duration-300">
                            <Link to="/upload">
                                <div className="flex flex-col items-center space-y-1">
                                    <Upload className="w-7 h-7 mx-auto"/>
                                    <p className="mt-1 text-sm font-bold">Upload</p>
                                </div>
                            </Link>
                        </div>

                        {/* Swap */}
                        <div
                            className="text-center text-gray-400 w-1/5 hover:text-blue-700 transition-colors duration-300">
                            <Link to="/invites">
                                <div className="flex flex-col items-center space-y-1">
                                    <Status className="w-7 h-7 mx-auto"/>
                                    <p className="mt-1 text-sm font-bold">Status</p>
                                </div>
                            </Link>
                        </div>

                        {/* Center Highlighted Icon */}
                        <Link to="/stats">
                            <div className="relative -top-8 flex justify-center items-center mx-4">
                                <div
                                    className="absolute bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-full shadow-2xl z-10 border-[4px] border-gray-900 transition-transform transform hover:scale-110 duration-300">
                                    <Friends className="w-7 h-7 mx-auto size-24 text-black"/>
                                </div>
                            </div>
                        </Link>

                        {/* Apps */}
                        <div
                            className="text-center text-gray-400 w-1/5 hover:text-blue-700 transition-colors duration-300">
                            <Link to="/post">
                                <div className="flex flex-col items-center space-y-1">
                                    <Post className="w-7 h-7 mx-auto"/>
                                    <p className="mt-1 text-sm font-bold">Post</p>
                                </div>
                            </Link>
                        </div>

                        <div
                            className="text-center text-gray-400 w-1/5 hover:text-blue-700 transition-colors duration-300">
                            <Link to="/payment">
                                <div className="flex flex-col items-center space-y-1">
                                    <Coins className="w-7 h-7 mx-auto"/>
                                    <p className="mt-1 text-sm font-bold">Payment</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Toast Notifications */}
                <Toaster/>
            </div>
        </>
    );
}

export default Stats;
