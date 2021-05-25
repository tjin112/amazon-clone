import moment from "moment";
import Currency from "react-currency-formatter";
function Order({ id, amount, amountShipping, items, timestamp, images }) {
    // console.log(images)
  return (
    <div className="relative border rounded-md">
      <div className="flex items-center space-x-10 p-5 bg-gray-100 text-sm text-grey-600">
        <div>
          <p className="font-bold text-sm">Order Placed</p>
          <p>{moment.unix(timestamp).format("DD MMM YYYY")}</p>
        </div>

        <div>
          <p className="font-bold text-sm">Total</p>
          <p>
            <Currency quantity={amount} currency="usd" />- Next Dat Delivery{" "}
            <Currency quantity={amountShipping} currency="usd" />
          </p>
        </div>

        <p className="text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500">
          {items.length} items
        </p>
        <p className="absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap">Order # {id}</p>
      </div>
      <div className="p-5 sm:p-10">
          <div className="flex space-x-6 overflow-x-auto">
              {images.map(image=>(
                  <img className="h-20 object-contain sm:h-32" src={image} alt="" key={image}/>
              ))}
          </div>
      </div>
    </div>
  );
}

export default Order;
