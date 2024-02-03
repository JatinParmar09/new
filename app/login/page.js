"use client";
import Navbar from "../../components/Navbar";
import LoginForm from "../../components/LoginForm";

export default function login({searchParams}) {
console.log("data ",searchParams);

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <LoginForm value={searchParams.admin} />
      </main>
    </>
  );
}
