import React from 'react';
import cars from "../list/Car.ts";
import "../index.css";

// Define the types for the props
interface CarModelDropdownProps {
    selectedMake: string;
    setSelectedMake: React.Dispatch<React.SetStateAction<string>>;
    selectedModel: string;
    setSelectedModel: React.Dispatch<React.SetStateAction<string>>;
}

const CarModelDropdown: React.FC<CarModelDropdownProps> = ({ selectedMake, setSelectedMake, selectedModel, setSelectedModel }) => {
    const handleCompanyChanges = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCompany = event.target.value;
        setSelectedMake(selectedCompany);
        setSelectedModel(''); // Reset selected model when company changes
    };

    const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedModel(event.target.value);
    };

    return (
        <>
            <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">Make*:</label>
                <select required value={selectedMake} onChange={handleCompanyChanges} className="border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 block w-full p-3 rounded-lg text-gray-700 transition-colors duration-300 ease-in-out">
                    <option value="">Company</option>
                    {Object.keys(cars).map((company) => (
                        <option key={company} value={company}>
                            {company}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">Model*:</label>
                <select value={selectedModel} onChange={handleModelChange} disabled={!selectedMake} className="border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 block w-full p-3 rounded-lg text-gray-700 transition-colors duration-300 ease-in-out">
                    <option value="">Select Model</option>
                    {selectedMake && cars[selectedMake].map((model) => (
                        <option key={model} value={model}>
                            {model}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
};

export default CarModelDropdown;
