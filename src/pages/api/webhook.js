import { buffer } from "micro";
import * as admin from "firebase-admin";

// sercure connection to firebase
const serviceAccount = require("../../../permissions.json");
const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();
// establish connection to stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;
const fulfillOrder = async (session) => {
    console.log('fulfilling',session)
    return app
      .firestore()
      .collection("users")
      .doc(session.metadata.email)
      .collection("orders")
      .doc(session.id)
      .set({
        amount: session.amount_total / 100,
        amount_shipping: session.total_details.amount_shipping / 100,
        images: JSON.parse(session.metadata.images),
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        console.log(`Success:Order ${session.id} has been added to the database`);
      });
  };
export default async (req, res) => {
    console.log('this is req',res)
  if (req.method === "POST") {
      console.log('2')
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];

    let event;

    //veryfiy that event posted from stripe
    try {
      event = stripe.webhooks.constructEvent(
        payload,
        sig,
        endpointSecret
      );
      console.log('2222')
    } catch (err) {
      console.log("Err", err.message);
      return res.status(400).send(`webhook erro ${err.message}`);
    }
    //   handle checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      
      //   fulfil the order
      return fulfillOrder(session)
        .then(() => res.status(200))
        .catch((erro) => res.status(400).send(`webhook error: ${erro.message}`));
    }
  }
};
export const config ={
    api:{
        bodyParser:false,
        externalResolver:true
    }
}
