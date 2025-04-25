"use client";
import { useSignUp } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const { signUp, setActive } = useSignUp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUp.create({ emailAddress: email, password });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err) {
      console.error("Sign Up Error:", err);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const result = await signUp.attemptEmailAddressVerification({ code });
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/Dashboard");
      }
    } catch (err) {
      console.error("Verification Error:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-0 p-2 ">
      <h1 className="text-2xl text-white p-6">Create your account!</h1>
      <form
        onSubmit={pendingVerification ? handleVerify : handleSignUp}
        className="space-y-4 p-8 text-white rounded shadow-md w-full max-w-sm bg-white/2 backdrop-blur-md"
      >
        <h2 className="text-xl font-bold mb-4">
          {pendingVerification ? "Verify Your Email" : "Create Account"}
        </h2>

        {!pendingVerification ? (
          <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 mb-3 border rounded"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mb-3 border rounded"
            />
          </>
        ) : (
          <input
            type="text"
            placeholder="Verification Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            className="w-full px-3 py-2 mb-3 border rounded"
          />
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer transition"
        >
          {pendingVerification ? "Verify Code" : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
