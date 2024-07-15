import Link from "next/link";
import { FaBars, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <div className="container">
        <aside className="sidebar">
          <h3 className="sidebar-title">Sidebar</h3>

          <ul className="sidebar-links">
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
                <Link href="#">
                  <span>
                    <FaSignOutAlt />
                  </span>
                  Logout
                </Link>
              </li>
            </>
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
            {/* 
          {isAdmin ? (
            <li>
              <Link href="/p-admin">
                <span>
                  <FaSignIn />
                </span>
                Panel Admin
              </Link>
            </li>
          ) : null} */}
          </ul>
          <img className="wave" src="/Images/wave.svg" alt="wave" />
        </aside>
        <main className="main"></main>
      </div>
    </>
  );
}
