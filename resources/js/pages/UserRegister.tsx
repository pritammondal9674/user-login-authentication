import React, { useState } from "react";
import axios from "axios";

export default function UserRegister() {
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [passwordConfirmation, setPasswordConfirmation] = useState(""); 

  const registerUser = async () => {
    if (!name || !email || !password || !passwordConfirmation) {
      alert("Please fill all fields");
      return;
    }
    if (password !== passwordConfirmation) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await axios.post("/api/register", {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      // Registration successful → redirect to login
      alert("Registration successful! Redirecting to login...");
      window.location.href = "/login";

    } catch (error: any) {
      if (error.response && error.response.data) {
        console.log("Registration error:", error.response.data);
        alert(JSON.stringify(error.response.data));
      } else {
        console.log("Error:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          📝 User Registration
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-gray-800"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-gray-800"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-gray-800"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-gray-800"
          />
        </div>

        <button
          onClick={registerUser}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-full transition duration-200"
        >
          Register
        </button>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
