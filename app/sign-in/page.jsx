"use client";
import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function CustomSignIn() {
  const { signIn, isLoaded, setActive } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!isLoaded) return;

    try {
      const result = await signIn.create({ identifier: email, password });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/");
      } else {
        console.log(result);
      }
    } catch (err) {
      setError(err.errors[0]?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-2 p-2">
      <h1 className="text-2xl text-white p-6">Enter your logIn Credentials!</h1>

      <form
        onSubmit={handleSignIn}
        className="space-y-4 p-8 text-white rounded shadow-md w-full max-w-sm bg-white/2 backdrop-blur-md"
      >
        <h2 className="text-xl font-bold mb-4 text-white">Sign In</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer transition "
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
