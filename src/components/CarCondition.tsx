import React from "react";
import "../index.css";

interface CarConditionProps {
    setCondition: (condition: string) => void;
}

const CarCondition: React.FC<CarConditionProps> = ({ setCondition }) => {
    const handleConditionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCondition(event.target.value);
    };

    return (
        <div className='w-full'>
            <label className='block mb-2 text-gray-700'>Condition*</label>
            <select
                onChange={handleConditionChange}
                className='border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 block w-full p-3 rounded-lg text-gray-700 transition-colors duration-300 ease-in-out'>
                <option value="">Select Condition</option>
                <option value="New">New</option>
                <option value="Used">Used</option>
            </select>
        </div>
    );
};

export default CarCondition;
