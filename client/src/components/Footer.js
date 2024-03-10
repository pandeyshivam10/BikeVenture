import React from "react";

const Footer = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      {" "}
      {user ? (
        <div
          className="footer"
          style={{
            backgroundColor: "#f0f0f0",
            textAlign: "center",
          }}
        >
          <footer class="bg-black ">
            <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8 ">
              <div class="md:flex md:justify-between pl-5">
                <div class="mb-6 md:mb-0">
                  <a
                    href="/"
                    className="flex items-center justify-center text-center h-12 w-12 rounded-full bg-blue-500 text-white font-bold text-xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
                    style={{ textDecoration: "none" }} // inline style to remove underline
                  >
                    <h1 className="text-3xl font-bold text-gray-800 leading-none">
                      <span className="text-blue-500">Bike</span>
                      <span className="text-white">Venture</span>
                    </h1>
                  </a>
                </div>
                <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                  <div>
                    <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                      Resources
                    </h2>
                    <ul class="text-gray-500 dark:text-gray-400 font-medium">
                      <li class="mb-4">
                        <a href="/" class="hover:underline">
                          Home
                        </a>
                      </li>
                      <li>
                        <a href="/bookings" class="hover:underline">
                          My Bookings
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                      Follow us
                    </h2>
                    <ul class="text-gray-500 dark:text-gray-400 font-medium">
                      <li class="mb-4">
                        <a
                          href="https://twitter.com/stark_shiva_"
                          class="hover:underline"
                        >
                          Twitter
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.linkedin.com/in/shivam-pandey-77530a202/"
                          class="hover:underline"
                        >
                          LinkedIn
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                      Legal
                    </h2>
                    <ul class="text-gray-500 dark:text-gray-400 font-medium">
                      <li class="mb-4">
                        <a href="#" class="hover:underline">
                          Privacy Policy
                        </a>
                      </li>
                      <li>
                        <a href="#" class="hover:underline">
                          Terms &amp; Conditions
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
              <div class="sm:flex sm:items-center sm:justify-between">
                <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                  © 2023{" "}
                  <a href="/" class="hover:underline">
                    BikeVenture™
                  </a>
                  . All Rights Reserved.
                </span>
              </div>
            </div>
          </footer>
        </div>
      ) : null}
    </div>
  );
};

export default Footer;
