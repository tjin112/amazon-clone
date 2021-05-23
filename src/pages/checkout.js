import Header from "../components/Header";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectItems, selectTotal } from "../slices/basketSlice";
import CheckOutProduct from "../components/CheckOutProduct";
import Currency from "react-currency-formatter";
import { session, useSession } from "next-auth/client";

function checkout() {
  const items = useSelector(selectItems);
  const [session] = useSession( )
  const total = useSelector(selectTotal)
  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex  max-w-screen-2xl mx-auto">
        {/* left */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b m-4">
              {items.length === 0
                ? "Your Shopping Basket is empty"
                : "Shoping Basket"}
            </h1>
            {items.map((item, i) => (
              <CheckOutProduct
                key={i}
                id={item.id}
                title={item.title}
                price={item.price}
                description={item.description}
                category={item.category}
                image={item.image}
                hasPrime={item.hasPrime}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        {/* right */}
        <div className='flex flex-col bg-white p-10'>
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal({items.length})items:
                <span className="font-bold">
                  <Currency quantity={total} />
                </span>
              </h2>
              <button
              disabled={!session}
                className={`${!session ? 'needSignin':'buttonClick'}`}
              >
                {!session ? "Sign in to checkout" : "Proceed to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default checkout;
