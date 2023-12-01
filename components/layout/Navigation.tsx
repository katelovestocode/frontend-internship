"use client";
import React, { useState } from "react";
import { useAppSelector } from "@/redux/store";
import NavLink from "../common/NavLink";
import { MdMenu, MdClose, MdOutlineEmail } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import useLogout from "@/hooks/useLogout";

export default function Navigation() {
  const name = useAppSelector((state) => state.authReducer.user?.name);
  const email = useAppSelector((state) => state.authReducer.user?.email);
  const isLoggedIn = useAppSelector((state) => state.authReducer.isLoggedIn);
  const logOutUser = useLogout();

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const toggleSideBar = () => {
    setIsSideBarOpen((prevState) => !prevState);
  };

  return (
    <>
      <div className="relative items-center">
        <nav
          className={`absolute top-full right-0 w-content flex-col items-center gap-6 p-10 bg-white text-center transition-opacity duration-250 ease-in-out ${
            isSideBarOpen ? "flex" : "hidden"
          } xl:flex xl:w-auto xl:flex-row xl:items-center xl:p-0 xl:bg-transparent xl:border-none xl:transition-none xl:opacity-100 xl:static`}
        >
          <NavLink
            hrefLink="/"
            label="Home"
            setIsSideBarOpen={setIsSideBarOpen}
          />
          <NavLink
            hrefLink="/about"
            label="About"
            setIsSideBarOpen={setIsSideBarOpen}
          />
          {isLoggedIn ? (
            <>
              <NavLink
                hrefLink="/users"
                label="Users"
                setIsSideBarOpen={setIsSideBarOpen}
              />
              <NavLink
                hrefLink="/companies"
                label="Companies"
                setIsSideBarOpen={setIsSideBarOpen}
              />
              <NavLink
                hrefLink="/profile"
                label="Profile"
                setIsSideBarOpen={setIsSideBarOpen}
              />

              <div className="py-4 flex gap-2 items-center xl:gap-4 flex-col xl:flex-row">
                <p className="flex gap-2 items-center text-xl ">
                  <FaUserAlt className="text-amber-700" /> {name}{" "}
                </p>
                <p className="flex gap-2 items-center text-xl ">
                  <MdOutlineEmail className="text-amber-700" />
                  {email}
                </p>
              </div>
              <button
                className="px-3 py-3 text-xl rounded-xl bg-gray-700 hover:bg-gray-600 shadow-md text-white"
                onClick={() => logOutUser()}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                hrefLink="/register"
                label="Register"
                setIsSideBarOpen={setIsSideBarOpen}
              />
              <NavLink
                hrefLink="/login"
                label="Login"
                setIsSideBarOpen={setIsSideBarOpen}
              />
            </>
          )}
        </nav>

        <div className="flex xl:hidden">
          {isSideBarOpen ? (
            <MdClose size="40" onClick={toggleSideBar} />
          ) : (
            <MdMenu size="40" onClick={toggleSideBar} />
          )}
        </div>
      </div>
    </>
  );
}
