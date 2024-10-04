import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Invites from "../pages/invites";
import Stats from "../pages/home";
import WebApp from "@twa-dev/sdk";
import Post from "../pages/post";
import Payment from "../pages/payment";
import Login from "../pages/payment/auth/Login.tsx";
import Register from "../pages/payment/auth/Register.tsx";
import Uploads from "../pages/upload";
import Home from "../pages/home";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "../pages/payment/ProtectedRoute.tsx";
import PublicRoutes from "../pages/payment/publicRoutes.tsx";

export function RoutesProvider() {
    const telegramUsername = WebApp?.initDataUnsafe?.user?.username || 'eldu';
    const location = useLocation();
    const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            // Check if the screen width is less than or equal to 1024px (tablet or mobile)
            if (window.innerWidth <= 1024) {
                setIsMobileOrTablet(true);
            } else {
                setIsMobileOrTablet(false);
            }
        };

        // Check screen size on load
        checkScreenSize();

        // Listen to window resize events to update state
        window.addEventListener("resize", checkScreenSize);

        return () => {
            window.removeEventListener("resize", checkScreenSize);
        };
    }, []);

    useEffect(() => {
        // Store the current path in sessionStorage
        sessionStorage.setItem("lastPath", location.pathname);
    }, [location]);

    useEffect(() => {
        // On initial load, redirect to the last visited path if available
        const lastPath = sessionStorage.getItem("lastPath");
        if (lastPath) {
            window.history.replaceState({}, '', lastPath);
        }
    }, []);

    // Render a fallback or redirect if not on a mobile/tablet device
    if (!isMobileOrTablet) {
        return (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <h1>Sorry, this app is only available on mobile and tablet devices.</h1>
            </div>
        );
    }

    return (
        <>
            <Toaster />
            <Routes>
                <Route element={<Home />} path="/" index />
                <Route element={<Uploads />} path="/upload" />
                <Route element={<Invites telegramUsername={telegramUsername} />} path="/invites" />
                <Route element={<Stats />} path="/stats" />
                <Route element={<Post />} path="/post" />
                <Route element={<ProtectedRoute><Payment /></ProtectedRoute>} path="/payment" />
                <Route element={<PublicRoutes><Login /></PublicRoutes>} path="/login" />
                <Route element={<PublicRoutes><Register /></PublicRoutes>} path="/register" />
            </Routes>
        </>
    );
}
