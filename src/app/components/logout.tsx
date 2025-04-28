"use client";
import { postAccount, postLogout } from "@/actions/user";
import { useEffect } from "react";

const Logout = () => {
    const fetchData = async () => {
        await postAccount();
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <button
            className="cursor-pointer"
            onClick={() => {
                postLogout();
            }}
        >
            Sign Out
        </button>
    );
};

export default Logout;
