"use client";

import React, { useRef, useTransition } from "react";
import { User } from "../types/User.types";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const firstNameRef = useRef<null | HTMLInputElement>(null);
  const lastNameRef = useRef<null | HTMLInputElement>(null);
  const usernameRef = useRef<null | HTMLInputElement>(null);
  const emailRef = useRef<null | HTMLInputElement>(null);
  const passwordRef = useRef<null | HTMLInputElement>(null);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newUser: User = {
      firstName: firstNameRef.current?.value || "",
      lastName: lastNameRef.current?.value || "",
      username: usernameRef.current?.value || "",
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
    };

    startTransition(async () => {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      switch (res.status) {
        case 201: {
          await signIn("credentials", {
            redirect: false,
            isSignUp: true,
            identifier: newUser.email,
          });

          alert("register is successfully");
          router.push("/dashboard");
          break;
        }
        case 422: {
          alert("Data is not valid !!");
          break;
        }
        case 409: {
          alert("This username or email is exist already !!");
          break;
        }

        default:
          alert("Error !!");
          break;
      }
    });
  };

  return (
    <>
      <div className="box">
        <h1>SignUp Form</h1>
        <form role="form" method="post" onSubmit={submitForm}>
          <div className="inputBox">
            <input
              disabled={isPending}
              ref={firstNameRef}
              type="text"
              autoComplete="off"
              required
            />
            <label>FirstName</label>
          </div>
          <div className="inputBox">
            <input
              disabled={isPending}
              ref={lastNameRef}
              type="text"
              autoComplete="off"
              required
            />
            <label>LastName</label>
          </div>
          <div className="inputBox">
            <input
              disabled={isPending}
              ref={usernameRef}
              type="text"
              autoComplete="off"
              required
            />
            <label>Username</label>
          </div>
          <div className="inputBox">
            <input
              disabled={isPending}
              ref={emailRef}
              type="email"
              autoComplete="off"
              required
            />
            <label>Email</label>
          </div>
          <div className="inputBox">
            <input
              disabled={isPending}
              ref={passwordRef}
              type="password"
              autoComplete="off"
              required
            />
            <label>Password</label>
          </div>

          <input
            disabled={isPending}
            type="submit"
            className="register-btn"
            value={isPending ? "Registration..." : "Sign Up"}
          />
        </form>
      </div>
    </>
  );
}

export default page;
