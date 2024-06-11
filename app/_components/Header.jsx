import { UserButton, useUser } from "@clerk/nextjs";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../_context/CartContext";
import cartApis from "../_utils/cartApis";
import Cart from "./Cart";
import Link from "next/link";

function Header() {
  const { cart, setCart } = useContext(cartContext);
  const [isLogIn, setIsLogIn] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    setIsLogIn(window.location.href.toString().includes("sign-in"));
  }, []);

  useEffect(() => {
    if (user) {
      getCartItems();
    }
  }, [user]);

  const getCartItems = async () => {
    try {
      const res = await cartApis.getUserCartItems(
        user.primaryEmailAddress.emailAddress
      );
      const cartItems = res?.data?.data.map((cartItem) => ({
        id: cartItem.id,
        product: cartItem?.attributes?.products?.data[0],
      }));
      setCart(cartItems); // Update state once with all cart items
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const [openCart, setOpenCart] = useState(false);

  return (
    !isLogIn && (
      <header className="bg-white">
        <div className="mx-auto flex h-16 max-w-screen-2xl items-center gap-8 px-4 sm:px-6 lg:px-8 shadow-md">
          <Link href="/">
            <Image src="/logo.svg" alt="logo" width={50} height={50} />
          </Link>

          <div className="flex flex-1 items-center justify-end md:justify-between">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="/"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                    {" "}
                    Explore{" "}
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                    {" "}
                    Projects{" "}
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                    {" "}
                    About Us{" "}
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                    {" "}
                    Contact Us{" "}
                  </a>
                </li>
              </ul>
            </nav>
            {!user ? (
              <div className="flex items-center gap-4">
                <div className="sm:flex sm:gap-4">
                  <a
                    className="block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#3572EF]"
                    href="/sign-in"
                  >
                    Login
                  </a>
                  <a
                    className="hidden rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#3572EF] hover:text-white sm:block"
                    href="/sign-up"
                  >
                    Register
                  </a>
                </div>
                <button className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
                  <span className="sr-only">Toggle menu</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-5">
                <h2 className="flex gap-1">
                  <ShoppingCart
                    className="cursor-pointer"
                    onClick={() => setOpenCart(!openCart)}
                  />{" "}
                  {cart?.length ? cart?.length : ""}
                </h2>
                <UserButton afterSignOutUrl="/" />
                {openCart && <Cart />}
              </div>
            )}
          </div>
        </div>
      </header>
    )
  );
}

export default Header;
