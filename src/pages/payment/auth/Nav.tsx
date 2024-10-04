
// import {Link, useNavigate} from "react-router-dom"


const Nav = () => {

    // const navigate = useNavigate()
    // const logout = () => {
    //     localStorage.removeItem('auth');
    //     navigate('/login')
    // }


    return (
        <>
            <div className="px-4 mt-6">
                <div className="flex justify-around items-center bg-gray-200 rounded-full p-2">
                    {/*{state && state.token ? (*/}
                    {/*    <>*/}
                    {/*        <div className="text-center text-[#85827d] w-1/5 bg-[#1c1f24] m-1 p-2 rounded-2xl">*/}
                    {/*            <Link*/}
                    {/*                to="/payment"*/}
                    {/*                className="flex items-center flex-col text-center hover:glow-effect transition-all duration-300"*/}
                    {/*            >*/}
                    {/*                <p className="text-sm font-medium text-gray-500">Payment</p>*/}
                    {/*            </Link>*/}
                    {/*        </div>*/}
                    {/*        <div className="text-center text-[#85827d] w-1/5 m-1 p-2 rounded-2xl">*/}
                    {/*            <Link*/}
                    {/*                onClick={logout}*/}
                    {/*                className="flex items-center flex-col text-center hover:glow-effect transition-all duration-300"*/}
                    {/*            >*/}
                    {/*                <p className="text-sm font-medium text-gray-500">Logout</p>*/}
                    {/*            </Link>*/}
                    {/*        </div>*/}
                    {/*    </>*/}
                    {/*) : (*/}
                    {/*    <>*/}
                    {/*        <div className="text-center text-[#85827d] w-1/5 m-1 p-2 rounded-2xl">*/}
                    {/*            <Link*/}
                    {/*                to="/login"*/}
                    {/*                className="flex items-center flex-col text-center hover:glow-effect transition-all duration-300"*/}
                    {/*            >*/}
                    {/*                <p className="text-sm font-medium text-gray-500">Login</p>*/}
                    {/*            </Link>*/}
                    {/*        </div>*/}
                    {/*        <div className="text-center text-[#85827d] w-1/5  m-1 p-2 rounded-2xl">*/}
                    {/*            <Link*/}
                    {/*                to="/register"*/}
                    {/*                className="flex items-center flex-col text-center hover:glow-effect transition-all duration-300"*/}
                    {/*            >*/}
                    {/*                <p className="text-sm font-medium text-gray-500">Register</p>*/}
                    {/*            </Link>*/}
                    {/*        </div>*/}
                    {/*    </>*/}
                    {/*)}*/}

                </div>
            </div>
        </>
    )
}

export default Nav;