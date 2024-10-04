import React from 'react';
import CarYears from "../list/Caryear.ts";
import "../index.css";

// Define the type for the props
interface CarYearProps {
    selectedYear: string;
    setSelectedYear: (year: string) => void;
}

const CarYear: React.FC<CarYearProps> = ({ selectedYear, setSelectedYear }) => {

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(e.target.value);
    };

    return (
        <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">Year*:</label>
            <select
                required
                value={selectedYear}
                onChange={handleChange}
                className="border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 block w-full p-3 rounded-lg text-gray-700 transition-colors duration-300 ease-in-out"
            >
                <option value="">Year</option>
                {CarYears.map((year, index) => (
                    <option key={index} value={year}>{year}</option>
                ))}
            </select>
        </div>
    );
}

export default CarYear;
