"use client";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import Cookies from "js-cookie";
import { logOut } from "@/redux/slices/authSlice";
import { useAuth0 } from "@auth0/auth0-react";
import NavLink from "../common/NavLink";
import { MdMenu, MdClose } from "react-icons/md";

export default function Navigation() {
  const name = useAppSelector((state) => state.authReducer.user?.name);
  const email = useAppSelector((state) => state.authReducer.user?.email);
  const isLoggedIn = useAppSelector((state) => state.authReducer.isLoggedIn);
  const dispatch = useAppDispatch();
  const { logout } = useAuth0();

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const toggleSideBar = () => {
    setIsSideBarOpen((prevState) => !prevState);
  };

  const handleLogOut = () => {
    dispatch(logOut());
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("provider");
    //Auth0 logout
    logout({ logoutParams: { returnTo: window.location.origin } });
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
                hrefLink="/profile"
                label="Profile"
                setIsSideBarOpen={setIsSideBarOpen}
              />
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
                hrefLink="/company-profile"
                label="Company Profile"
                setIsSideBarOpen={setIsSideBarOpen}
              />

              <div className="border-solid border-gray-700 border-1 rounded-xl p-4 flex gap-2  xl:gap-3 flex-col xl:flex-row shadow-md">
                <p className="text-xl text-amber-700"> {name} </p>
                <p className="text-xl text-amber-700"> {email} </p>
              </div>
              <button
                className="px-4 py-3 text-xl border-solid border-gray-200 border-2 rounded-xl bg-gray-700 hover:bg-gray-600 shadow-md text-white "
                onClick={() => handleLogOut()}
              >
                Sign Out
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
