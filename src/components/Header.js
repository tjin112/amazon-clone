import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from 'next/router'
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import Router from "next/dist/next-server/lib/router/router";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";
function Header() {
  const extraTags = [
    {
      name: "Electronic",
    },
    {
      name: "Food & Grocery",
    },
    {
      name: "Prime",
    },
    {
      name: "Buy Again",
    },
    { name: "Shop Toolkit" },
    { name: "Health and Personal Care" },
  ];
  const [session] = useSession();
  const router = useRouter();
  const items = useSelector(selectItems)
  return (
    <>
      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <Image
            onClick={() => router.push('/')}
            src="https://links.papareact.com/f90"
            width={150}
            height={40}
            objectFit="contain"
            className="cursor-pointer"
          />
        </div>
        {/* search */}
        <div
          className="bg-yellow-400 hover:bg-yellow-500 
                        hidden sm:flex items-center cursor-pointer
                        h-10 rounded-md flex-grow"
        >
          <input
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
            type="text"
          />
          <SearchIcon className="h-12 p-4" />
        </div>
        {/* right */}
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          <div onClick={!session ? signIn : signOut} className="link">
            <p className="hover:underline">
              {session ? `Hello,${session.user.name}` : "Sign In"}
            </p>
            <p className="font-extrabold md:text-sm">Account & Lists</p>
          </div>
          <div className="link">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>
          <div onClick={()=>{router.push('/checkout')}} className="link relative flex items-center">
            <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
              {items.length}
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className="hidden md:inline font-extrabold md:text-sm mt-2">
              Basket
            </p>
          </div>
        </div>
      </div>
      <div className="flex space-x-3 p-2 pl-6  items-center bg-amazon_blue-light text-white text-sm">
        <p className="link flex">
          <MenuIcon className="h-6 mr-1" />
          All
        </p>
        <p className="link flex">Video</p>
        <p className="link flex">Amazon Business</p>
        <p className="link flex">Today's deal</p>
        {extraTags.map((extraTag) => {
          return (
            <p className="link hidden lg:inline-flex" key={extraTag.name}>
              {extraTag.name}
            </p>
          );
        })}
      </div>
    </>
  );
}

export default Header;
