import React from 'react';

interface ButtonProps {
    type?: "primary" | "danger";
    size?: "sm" | "md";
    text?: string;
    handleClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({type = "primary", size = "md", text = "Submit", handleClick}) => {
    const typeClasses = type === "danger" ? "bg-red-500 text-white" : "bg-blue-500 text-white";
    const sizeClasses = size === "sm" ? "px-4 py-2 text-sm" : "px-6 py-3 text-md";

    return (
        <button
            onClick={handleClick}
            className={`rounded ${typeClasses} ${sizeClasses} hover:opacity-80 focus:outline-none focus:ring`}
        >
            {text}
        </button>
    );
};

export default Button;
