import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface PublicRoutesProps {
    children: ReactNode;
}

function PublicRoutes({ children }: PublicRoutesProps) {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate('/payment');
        }
    }, [navigate]);

    return (
        <div>
            {children}
        </div>
    );
}

export default PublicRoutes;
