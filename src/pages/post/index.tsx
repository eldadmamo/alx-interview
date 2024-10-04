import Hamster from "../../icons/Hamster.tsx";
import Settings from "../../icons/Settings.tsx";
import Friends from "../../icons/Friends.tsx";
import { Link } from "react-router-dom";
import Coins from "../../icons/Coins.tsx";
import { useEffect, useState } from 'react';
import { fetchMultiFiles } from '../../data/api.tsx';
import { Invite } from "../invites/invite";
import WebApp from "@twa-dev/sdk";
import Status from "../../icons/Status.tsx";
import Post from "../../icons/Post.tsx";
import Upload from "../../icons/Upload.tsx";

const Inviting = () => {
    const usering = WebApp.initDataUnsafe.user;
    const [files, setFiles] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>(''); // State for search query
    const [conditionFilter, setConditionFilter] = useState<string>(''); // State for condition filter
    const [yearFilter, setYearFilter] = useState<string>('')
    const [filteredFiles, setFilteredFiles] = useState<any[]>([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const getFiles = async () => {
            try {
                const data = await fetchMultiFiles();
                console.log('Fetched files:', data); // Check if data is fetched
                setFiles(data);
            } catch (err) {
                console.error('Fetch error:', err); // Log error if it occurs
            }
        };

        getFiles();
    }, []);

    useEffect(() => {
        let filtered = files;

        // Filter by search query
        if (searchQuery) {
            const lowercasedQuery = searchQuery.toLowerCase();
            filtered = filtered.filter(file =>
                file.make.toLowerCase().includes(lowercasedQuery) ||
                file.model.toLowerCase().includes(lowercasedQuery) ||
                file.year.toString().includes(lowercasedQuery)
            );
        }

        // Filter by condition (New/Used)
        if (conditionFilter) {
            filtered = filtered.filter(file => file.condition.toLowerCase() === conditionFilter.toLowerCase());
        }

        if(yearFilter){
            filtered = filtered.filter(file => file.year.toString() === yearFilter);
        }

        setFilteredFiles(filtered);
    }, [searchQuery, conditionFilter, yearFilter, files]);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const resetFilters = () => {
        setSearchQuery(''); // Clear search query
        setConditionFilter(''); // Clear condition filter
        setYearFilter(''); // Clear year filter
        setDropdownOpen(false); // Close dropdown after reset
    };

    const years = Array.from({ length: 45 }, (_, i) => 1980 + i);

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
                                <div className="w-full">

                                </div>
                            </div>
                            <div
                                className="border-2 border-[#43433b] rounded-full px-4 py-[2px] bg-[#43433b]/[0.6] max-w-64">

                                <div className="bg-[#43433b] mx-2"></div>
                                <Settings className="text-white"/>
                            </div>
                        </div>
                    </div>

                    <div
                        className="flex-grow mt-12 bg-gradient-to-b from-[#0000FF] to-[#000000] rounded-t-[48px] relative top-glow z-0">

                        <div
                            className="absolute top-[2px] left-0 right-0 bottom-0 bg-[#1d2025] rounded-t-[46px] h-[500px] overflow-y-auto">
                            <div className="px-4 mt-6 flex justify-between gap-2">
                                <div className="bg-[#272a2f] rounded-lg px-4 py-2 w-full relative">
                                    <div className="dot"></div>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center mt-4">
                                            <select
                                                id="condition"
                                                className="text-black p-2 rounded"
                                                value={conditionFilter}
                                                onChange={(e) => setConditionFilter(e.target.value)}
                                            >
                                                <option value="">All</option>
                                                <option value="new">New</option>
                                                <option value="used">Used</option>
                                            </select>
                                        </div>
                                        <div className="flex items-center mt-4 relative">
                                            <div className="relative">
                                                <button
                                                    onClick={toggleDropdown}
                                                    className="text-black p-2 rounded bg-white w-full text-left"
                                                    style={{width: '70px'}}
                                                >
                                                    {yearFilter || "Year"}
                                                </button>

                                                {dropdownOpen && (
                                                    <ul
                                                        className="absolute z-10 bg-white text-black rounded shadow-md w-full max-h-40 overflow-y-auto"
                                                        style={{maxHeight: '160px'}}  // Adjust this height to control the number of visible years
                                                    >
                                                        {years.map((year) => (
                                                            <li
                                                                key={year}
                                                                className="p-2 hover:bg-gray-200 cursor-pointer"
                                                                onClick={() => {
                                                                    setYearFilter(year.toString());
                                                                    setDropdownOpen(false);
                                                                }}>
                                                                {year}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <br/>
                                    <div className="flex items-center justify-center space-x-4">
                                        <input
                                            type="text"
                                            placeholder="Search by make, model, or year"
                                            className="text-black p-2 rounded"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />

                                        <button
                                            className="bg-red-500 text-white p-2 rounded"
                                            onClick={resetFilters}
                                        >
                                            Reset Filters
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div
                                className="border-gray-300  p-6 mx-auto rounded-lg shadow-lg transition hover:shadow-xl">
                                <div className="">
                                    <ul className="flex flex-col gap-2.5">
                                        {filteredFiles.slice(-5).reverse().map((file, index) => (
                                            <Invite
                                                key={index}
                                                name={file.name}
                                                value={file.value}
                                                condition={file.condition}
                                                make={file.make}
                                                model={file.model}
                                                year={file.year}
                                                price={file.price}
                                                imageUrl={`${import.meta.env.VITE_REACT_APP}/${file.files[0]?.filePath}`}
                                                checked={file.checked}
                                            />
                                        ))}
                                    </ul>
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
                                <Coins className="w-7 h-7 mx-auto"/>
                                <p className="mt-1 text-sm font-bold">Payment</p>
                            </div>
                        </Link>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Inviting;
