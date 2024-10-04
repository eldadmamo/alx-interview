import {useEffect, useState} from "react";
import {GetUserInfo} from "./auth/users";
import {message} from "antd";
import {useNavigate} from "react-router-dom";
import React from 'react';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
    const navigate = useNavigate();

    const [userData, setUserData] = useState(null);

    const getData = async () => {
        try {
            const response = await GetUserInfo();
            if (response.success) {
                setUserData(response.data);
            } else {
                message.error(response.message);
            }
        } catch (error) {
            navigate('/login');
            if (error instanceof Error) {
                message.error(error.message); // Now error.message is safe to access
            } else {
                message.error("An unknown error occurred");
            }
        }
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            if (!userData) {
                getData();
            }
        } else {
            navigate('/login');
        }
    }, [userData, navigate]);

    return <div>{children}</div>;
}

export default ProtectedRoute;
