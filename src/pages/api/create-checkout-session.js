const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
export default async (req, res) => {
  const { items, email } = req.body;
  const transformedItems = items.map((item) => ({
    description: item.description,
    quantity: 1,
    price_data: {
      currency: "usd",
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        images: [item.image],
      },
    },
  }));
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: transformedItems,
    mode: "payment",
    shipping_address_collection : {
        allowed_countries : ['GB','US','CA']
    },
    shipping_rates:['shr_1IuQfKBRMa5UZ3XQVo6mFj2O'],
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(items.map((item) => item.image)),
    },
  });
  console.log(session)
  res.status(200).json({id:session.id})
};
