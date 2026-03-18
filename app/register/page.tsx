"use client";

import { useState } from "react";
import { registerUser } from "../../services/auth.service";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [organizationName, setOrganizationName] = useState<string>("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = await registerUser({
        name,
        email,
        password,
        organizationName,
      });

      console.log("Register success:", data);
      router.push("/login");
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <button
        onClick={() => (window.location.href = "/")}
        className="absolute top-6 left-6 text-white border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-blue-600 transition"
      >
        Home
      </button>
      {/* Left Branding Section */}
      <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 to-indigo-800 text-white p-12">
        <h1 className="text-4xl font-bold mb-6">Welcome to TeamFlow</h1>

        <p className="text-lg text-center max-w-md">
          Manage projects, organize tasks, and collaborate with your team
          efficiently using one powerful platform.
        </p>

        <div className="mt-10 space-y-2 text-gray-200 text-center">
          <p>✔ Project Management</p>
          <p>✔ Task Tracking</p>
          <p>✔ Team Collaboration</p>
        </div>
      </div>

      {/* Right Register Form */}
      <div className="flex items-center justify-center bg-black">
        <form
          onSubmit={handleRegister}
          className="bg-white p-12 rounded-2xl shadow-2xl w-[480px]"
        >
          <h2 className="text-xl font-bold mb-4 text-black">Register</h2>

          <input
            type="text"
            placeholder="Name"
            className="border w-full p-2 mb-3 text-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="border w-full p-2 mb-3 text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="border w-full p-2 mb-3 text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="text"
            placeholder="Organization Name"
            className="border w-full p-2 mb-3 text-black"
            value={organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
          />

          <button
            type="submit"
            className="bg-green-500 text-white w-full p-2 rounded"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
