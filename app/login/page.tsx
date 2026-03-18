"use client";

import { useState, useEffect } from "react";
import { loginUser } from "../../services/auth.service";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await loginUser({ email, password });

      console.log("Login success:", data);

      localStorage.setItem("token", data.token);

      router.push("/dashboard");
    } catch {
      setError("Invalid email or password");
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

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

      {/* Right Login Form */}
      <div className="flex items-center justify-center bg-black">
        <form
          onSubmit={handleLogin}
          className="bg-white p-12 rounded-2xl shadow-2xl w-[480px]"
        >
          <h2 className="text-xl font-bold mb-4 text-black">Login</h2>

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

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-400 p-3 rounded mb-4 text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white w-full p-2 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
