"use client";

import { signIn } from "next-auth/react";

const SignInButton = () => {
    const handleSignIn = async () => {
        await signIn("google");
    };

    return <button onClick={handleSignIn}>Sign in with Google</button>;
};

export default SignInButton;
