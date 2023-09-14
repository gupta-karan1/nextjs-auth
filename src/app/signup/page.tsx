"use client"; // decorator for CSR only
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    username: "",
    password: "",
    email: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.password.length > 0 &&
      user.email.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onSignup = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/api/users/signup", user);

      console.log("Signup Success", response.data);
      toast.success("Sign up successful");

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error: any) {
      toast.error(error.message);

      console.log(" Sign up failed", error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col min-h-screen py-2 justify-center items-center">
      <h1 className="text-2xl mb-4">{loading ? "Processing" : "Sign Up"}</h1>

      <div className="flex flex-col">
        <label htmlFor="username" className="text-sm">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="johnsmith89"
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-black"
        />

        <label htmlFor="email" className="text-sm">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="johnsmith89@gmail.com"
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-black"
        />

        <label htmlFor="password" className="text-sm">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-black"
        />

        <button
          type="button"
          onClick={onSignup}
          className="bg-blue-300 p-2 text-lg rounded-full mb-4 text-black mt-2 focus:outline-none focus:bg-blue-500  hover:bg-blue-400 "
          disabled={buttonDisabled || loading}
        >
          {buttonDisabled ? "No Sign Up" : "Sign Up"}
        </button>

        <Link href="/login">
          <p className="text-sm text-center">Already have an account? Login</p>
        </Link>
      </div>
      <Toaster />
    </div>
  );
}
