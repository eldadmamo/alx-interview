import {Toaster} from "react-hot-toast"
import {Link} from "react-router-dom";
import Hamster from "../../../icons/Hamster.tsx";
import Settings from "../../../icons/Settings.tsx";
import Friends from "../../../icons/Friends.tsx";
import Coins from "../../../icons/Coins.tsx";
import WebApp from "@twa-dev/sdk";
import Status from "../../../icons/Status.tsx";
import Post from "../../../icons/Post.tsx";
import Upload from "../../../icons/Upload.tsx";
import {Col, Form, Input, message, Row} from 'antd'
import '../alignment.css'
import {LoginUser} from "./users.ts";

interface LoginFormValues {
    email: string;
    password: string;
}

const Login = () => {
    const usering = WebApp.initDataUnsafe.user;
    const onFinish = async (values: LoginFormValues) => {
        try {
            const response = await LoginUser(values);
            if (response.success) {
                message.success(response.message);
                localStorage.setItem("token", response.data);
                window.location.href = "/payment";
            } else {
                message.error(response.message);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                message.error(error.message);
            } else {
                message.error("An unexpected error occurred");
            }
        }
    };

    return (
        <>
            <div className="bg-black flex justify-center">
                <div className="w-full bg-black text-white h-screen font-bold flex flex-col max-w-xl">
                    <div className="px-4 z-10">
                        <div className="flex items-center space-x-2 pt-4">
                            <div className="p-1 rounded-lg bg-[#1d2025]">
                                <Hamster size={24} className="text-[#d4d4d4]"/>
                            </div>
                            <div>
                                <p className="text-sm">{usering?.first_name}</p>
                                <p className="text-sm">{usering?.id}</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between space-x-4 mt-1">
                            <div className="flex items-center w-1/3">
                                <div className="w-full"></div>
                            </div>
                            <div
                                className="border-2 border-[#43433b] rounded-full px-4 py-[2px] bg-[#43433b]/[0.6] max-w-64">
                                <div className="bg-[#43433b] mx-2"></div>
                                <Settings className="text-white"/>
                            </div>
                        </div>
                    </div>

                    {/* New Gem, Crew, Tasks Section */}
                    <div className="px-4 mt-6">
                        <div className="flex justify-around items-center bg-gray-200 rounded-full p-2">
                            <div className="text-center text-[#85827d] w-1/5 bg-[#1c1f24] m-1 p-2 rounded-2xl">
                                <Link
                                    to="/login"
                                    className="flex items-center flex-col text-center hover:glow-effect transition-all duration-300"
                                >
                                    <p className="text-sm font-medium text-gray-500">Login</p>
                                </Link>
                            </div>
                            <div className="text-center text-[#85827d] w-1/5  m-1 p-2 rounded-2xl">
                                <Link
                                    to="/register"
                                    className="flex items-center flex-col text-center hover:glow-effect transition-all duration-300"
                                >
                                    <p className="text-sm font-medium text-gray-500">Register</p>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div
                        className="flex-grow mt-12 bg-gradient-to-b from-[#0000FF] to-[#000000] rounded-t-[48px] relative top-glow z-0">
                        <div
                            className="absolute top-[2px] left-0 right-0 bottom-0 bg-[#1d2025] rounded-t-[46px] h-[500px] overflow-y-auto">


                            <div
                                className="border-gray-300 p-6 mx-auto rounded-lg shadow-lg transition hover:shadow-xl">
                                <div className="flex items-center justify-around text-center space-x-4">
                                    <div className="container">
                                        <div className="text-center">
                                            <h1 className="pt-5 font-bold text-4xl">Login</h1>
                                            <br/>
                                            <p className="text-lg pb-4">
                                                Access your subscription. Anytime. Anywhere
                                            </p>

                                        </div>
                                        <Form onFinish={onFinish} className="bg-white shadow-lg rounded-lg p-6">
                                            <Row gutter={16}>
                                                <Col span={24}>
                                                    <Form.Item name="email" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                                                        <label className="block text-gray-700 mb-2">Email Address</label>
                                                        <Input
                                                            type="text"
                                                            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            placeholder="Enter your email"
                                                        />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row gutter={16}>
                                                <Col span={24}>
                                                    <Form.Item name="password" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                                                        <label className="block text-gray-700 mb-2">Password</label>
                                                        <Input
                                                            type="password"
                                                            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            placeholder="Enter your password"
                                                        />
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <button
                                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200 ease-in-out"
                                                type="submit"
                                            >
                                                Login
                                            </button>
                                        </Form>


                                    </div>
                                    <Toaster/>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom fixed div */}
                <div
                    className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-xl bg-[#E1F0F5] flex justify-around items-center z-50 rounded-t-3xl py-3 shadow-2xl drop-shadow-lg transition-all duration-300"
                >
                    {/* Wallet */}
                    <div className="text-center text-black w-1/5 hover:text-blue-700 transition-colors duration-300">
                        <Link to="/upload">
                            <div className="flex flex-col items-center space-y-1">
                                <Upload className="w-7 h-7 mx-auto"/>
                                <p className="mt-1 text-sm font-bold">Upload</p>
                            </div>
                        </Link>
                    </div>

                    {/* Swap */}
                    <div className="text-center text-gray-400 w-1/5 hover:text-blue-700 transition-colors duration-300">
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
                                <Friends className="w-7 h-7 mx-auto size-24"/>
                            </div>
                        </div>
                    </Link>

                    {/* Apps */}
                    <div className="text-center text-gray-400 w-1/5 hover:text-blue-700 transition-colors duration-300">
                        <Link to="/post">
                            <div className="flex flex-col items-center space-y-1">
                                <Post className="w-7 h-7 mx-auto"/>
                                <p className="mt-1 text-sm font-bold">Post</p>
                            </div>
                        </Link>
                    </div>

                    <div className="text-center text-gray-400 w-1/5 hover:text-blue-700 transition-colors duration-300">
                        <Link to="/payment">
                            <div className="flex flex-col items-center space-y-1">
                                <Coins className="w-7 h-7 mx-auto "/>
                                <p className="mt-1 text-sm font-bold">Payment</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
