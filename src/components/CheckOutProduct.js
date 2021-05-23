import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket,removeFromBasket} from "../slices/basketSlice";
function CheckOutProduct({
  id,
  title,
  price,
  description,
  category,
  image,
  rating,
  hasPrime,
}) {
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      rating,
      hasPrime,
    };
    dispatch(addToBasket(product));
  };
  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({id}));
  };
  

  return (
    <div className="grid grid-cols-5 my-3 justify-around">
      <Image src={image} width={200} height={200} objectFit="contain" />
      <div className="mx-5 col-span-2 mx-2">
        <p>{title}</p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </div>
        <p className="text-sm my-2 line-clamp-3">{description}</p>
        <Currency quantity={price}></Currency>
        {hasPrime && (
          <div className="flex items-center space-x-2 -m-t-5">
            <img
              className="w-12"
              src="https://links.papareact.com/fdw"
              alt=""
            />
            <p className="text-xs text-gray-500">Free Next-Delivery</p>
          </div>
        )}
      </div>
      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button className="buttonClick" onClick={addItemToBasket}>
          Add to Basket
        </button>
        <button className="buttonClick my-2" onClick={removeItemFromBasket}>
          Remove from Basket
        </button>
      </div>
      <style jsx>{`
        .container {
          flex-wrap: wrap;
        }
        .grid-cols-5 {
          grid-template-columns: repeat(5, minmax(0, 1fr));
        }
        .col-span-2 {
          grid-column: span 2 / span 2;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
        .space-y-2 {
          --tw-space-y-reverse: 0;
          margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));
          margin-bottom: calc(0.5rem * var(--tw-space-y-reverse));
        }
        .justify-self-end {
          justify-self: end;
        }
      `}</style>
    </div>
  );
}

export default CheckOutProduct;
