"use client"; // decorator for CSR only

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();

  const [data, setData] = React.useState("nothing");

  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      console.log("Logout Success", response.data);
      toast.success("Logout successful");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error: any) {
      toast.error(error.message);
      console.log("Logout failed", error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/currentUser");
      console.log("User Details", res.data.data);
      setData(res.data.data.username);
    } catch (error: any) {
      console.log("User Details failed", error.message);
    }
  };
  return (
    <div className="flex flex-col min-h-screen py-2 justify-center items-center">
      <h1 className="text-2xl mb-4">Profile</h1>
      <h2 className="p-3 rounded bg-green-400 text-black">
        {data === "nothing" ? (
          "Nothing to show"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        onClick={logout}
        type="button"
        className="bg-blue-300 p-2 px-4 text-lg rounded-full mb-4 text-black mt-2 focus:outline-none focus:bg-blue-500  hover:bg-blue-400 "
      >
        Logout
      </button>
      <button
        onClick={getUserDetails}
        type="button"
        className="bg-orange-400 p-2 px-4 text-lg rounded-full mb-4 text-black mt-2 focus:outline-none focus:bg-blue-500  hover:bg-blue-400 "
      >
        Get User Details
      </button>

      <Toaster />
    </div>
  );
}
