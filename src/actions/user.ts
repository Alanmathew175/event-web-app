"use server";

import { auth, signOut } from "@/auth";
import { API } from "@/lib/fetch";

export const postAccount = async () => {
    console.log("slfjkss");

    const session = await auth();
    console.log(session, "from hereeeeeeeee");
    const d = await API.Post("create", {
        name: session?.user?.name,
        email: session?.user?.email,
        refresh_token: session?.user?.refreshToken,
    });
    console.log(d, "jasbfsk");
};

export const putAccount = async (phoneNumber: number) => {
    const session = await auth();

    const res = await API.Put(`update/${session?.user?.email}`, {
        phone_number: phoneNumber,
    });

    return res?.statusCode;
};

export const postLogout = async () => {
    const session = await auth();
    const res = await API.Put(`user/logout/${session?.user?.email}`, {});
    await signOut();
};

export const getUser = async () => {
    try {
        const session = await auth();
        const user = await API.Get(`user/${session?.user?.email}`);
        return user;
    } catch (error) {
        return { message: "Failed to get user details" };
    }
};
