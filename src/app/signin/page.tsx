"use client";

import React, { useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

function page() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const identifierRef = useRef<null | HTMLInputElement>(null);
  const passwordRef = useRef<null | HTMLInputElement>(null);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = {
      identifier: identifierRef.current?.value || "",
      password: passwordRef.current?.value || "",
    };

    startTransition(async () => {
      const res = await signIn("credentials", {
        redirect: false,
        identifier: user.identifier,
        password: user.password,
      });

      if (res?.status === 200) {
        alert("welcome");
        router.push("/dashboard");
      } else {
        alert("Not found user");
      }
    });
  };

  return (
    <>
      <div className="box">
        <h1>Login Form</h1>
        <form role="form" method="post" onSubmit={submitForm}>
          <div className="inputBox">
            <input
              disabled={isPending}
              type="text"
              autoComplete="off"
              required
              ref={identifierRef}
            />
            <label>Username OR Email</label>
          </div>
          <div className="inputBox">
            <input
              disabled={isPending}
              type="password"
              autoComplete="off"
              required
              ref={passwordRef}
            />
            <label>Password</label>
          </div>

          <input
            disabled={isPending}
            type="submit"
            className="register-btn"
            value={isPending ? "Entering..." : "Sign In"}
          />
        </form>
      </div>
    </>
  );
}

export default page;
