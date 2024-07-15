"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FaBars, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

export default function Home() {
  const { status } = useSession();

  return (
    <>
      <div className="container">
        <aside className="sidebar">
          <h3 className="sidebar-title">Sidebar</h3>

          <ul className="sidebar-links">
            {status === "authenticated" ? (
              <>
                <li>
                  <Link href="/dashboard">
                    <span>
                      <FaBars />
                    </span>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="#" onClick={() => signOut({ redirect: false })}>
                    <span>
                      <FaSignOutAlt />
                    </span>
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/signin">
                    <span>
                      <FaSignInAlt />
                    </span>
                    Sign in
                  </Link>
                </li>
                <li>
                  <Link href="/signup">
                    <span>
                      <FaSignInAlt />
                    </span>
                    Sign up
                  </Link>
                </li>
              </>
            )}
          </ul>
          <img className="wave" src="/Images/wave.svg" alt="wave" />
        </aside>
        <main className="main"></main>
      </div>
    </>
  );
}
