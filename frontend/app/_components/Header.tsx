"use client";
import Link from "next/link";

import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";

import { useEffect, useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";

const useMediaQuery = (width) => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    media.addEventListener("change", updateTarget);

    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeEventListener("change", updateTarget);
  }, []);

  return targetReached;
};

export default function Header() {
  const [collapsed, setCollapsed] = useState(true);
  const isBreakpoint = useMediaQuery(912);

  const [showDropdown, setShowDropdown] = useState(false); // State for dropdown visibility
  const [searchInput, setSearchInput] = useState("");

  const toggleDropdown = () => {
    setShowDropdown((prevState) => !prevState); // Toggle dropdown visibility
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value); // Update search input value
  };
  const handleSearchClick = () => {
    setShowDropdown(true); // Open dropdown on search bar click
  };

  // console.log(chainIdHex)
  //
  const router = useRouter();

  const currentUrl = usePathname();

  useEffect(() => {
    console.log(collapsed);
  }, [collapsed]);
  const handleSidebar = () => {
    setCollapsed((prevCollapsed) => !prevCollapsed);
  };

  return (
    <div className="bg-gradient-to-r from-sky-500 to-indigo-500">
      {/* Navbar */}

      {!collapsed && isBreakpoint && (
        <div className={`z-50 h-screen ${!collapsed && "fixed inset-0"}`}>
          <Sidebar toggled={false} collapsedWidth="0px" collapsed={collapsed}>
            <div
              className="px-4 pt-4 w-full flex justify-end text-end cursor-pointer text-xl "
              onClick={handleSidebar}
            ></div>
            <Menu>
              <div className="text-xl text-white hover:text-green-700">
                <MenuItem>
                  <Link href="/">
                    <p
                      className={`text-white font-semibold ${
                        currentUrl == "/" && "border-b-2 border-orange-700"
                      } hover:text-orange-500 sm:text-xl text-lg`}
                    >
                      Home
                    </p>
                  </Link>
                </MenuItem>
              </div>
              <MenuItem>
                <Link href="/projects">
                  <p
                    className={`text-white ${
                      currentUrl == "/projects" &&
                      "border-b-2 border-orange-700"
                    } font-semibold hover:text-orange-500 text-lg`}
                  >
                    Projects
                  </p>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link href="/launch">
                  <p
                    className={`w-full text-white ${
                      currentUrl == "/launch" && "border-b-2 border-orange-700"
                    } font-semibold hover:text-orange-500 text-lg `}
                  >
                    Get Funded
                  </p>
                </Link>
              </MenuItem>
            </Menu>
          </Sidebar>
        </div>
      )}

      <nav className="flex  items-end flex-row w-full justify-between hh:justify-between hh:items-center px-2 py-2 sm:px-4 sm:py-4 h-full text-white bg-zinc-800 bg-gradient-to-r from-sky-500 to-indigo-500 ">
        <img
          src="./concordia.png"
          width={150}
          height={20}
          className="object-cover p-0 lt:block hidden"
        />
        <img
          src="./concordia.png"
          width={40}
          height={10}
          className="object-cover p-0 lt:hidden block"
        />
        <div className="max-w-md mx-auto mt-8">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Who are you looking for?
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="120 120 120 120"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Mockups, Logos..."
              value={searchInput}
              onClick={handleSearchClick}
              onChange={handleSearchInputChange}
              required
            />
            <div className="dropdown inline-block relative">
              <button
                onClick={toggleDropdown}
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Who are you looking for?
              </button>
              {showDropdown && (
                <div className="dropdown-content absolute z-10">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-white dark:hover:bg-gray-800"
                  >
                    Frontend Developer
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-white dark:hover:bg-gray-800"
                  >
                    Designer
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-white dark:hover:bg-gray-800"
                  >
                    Backend Developer
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end self-end ss:self-auto">
          <div className="flex justify-between items-center text-lg ">
            {!isBreakpoint && (
              <>
                <Link
                  href="/"
                  className={`text-white font-semibold ${
                    currentUrl == "/" && "border-b-2 border-orange-700"
                  } hover:text-orange-500 sm:text-xl text-lg`}
                >
                  {" "}
                  Home
                </Link>
                <Link
                  href="/projects"
                  className={`sm:ml-8 ml-6 text-white ${
                    currentUrl == "/projects" && "border-b-2 border-orange-700"
                  } font-semibold hover:text-orange-500 text-lg`}
                >
                  Projects
                </Link>

                <Link
                  href="/launch"
                  className={`sm:mx-4 mx-2 w-full text-white ${
                    currentUrl == "/launch" && "border-b-2 border-orange-700"
                  } font-semibold hover:text-orange-500 `}
                >
                  Create Project
                </Link>
              </>
            )}

            <div className="text-white flex flex-col w-full sc:py-10 items-start">
              {/* <Button type="button" text="Connect Wallet" /> */}
              <div className="px-0"> ConnectButton</div>
            </div>
            {isBreakpoint && (
              <div
                className="w-8 h-8 text-white hover:text-green-500 cursor-pointer"
                onClick={handleSidebar}
              >
                {/* <img
                  alt="..."
                  src="./menubar.svg"
                  className="object-cover w-full h-full cursor-pointer hover:text-green-500"
                /> */}
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}