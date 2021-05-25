import Head from "next/head";
import Header from '../components/Header'
import Banner from '../components/Banner'
import ProductFeed from '../components/ProductFeed'
import axios from 'axios'
import { getSession } from "next-auth/client";

 export default function Home({products}) {
  return (
    <div className='bg-gray-100'>
      <Head>
        <title>Taimin Clone</title>
      </Head>
      <Header />
      <main className='max-w-screen-2xl mx-auto '>
        {/* banner */}
        <Banner />
        {/* prodect */}
        <ProductFeed products={products}  />
      </main>
    </div>
  );
}
export async function getServerSideProps(ctx){
  const session = await getSession(ctx)
  const products = await axios.get('https://fakestoreapi.com/products').then(res=>{
    return res.data
  })
  return {
    props:{
      products:products,
      // session
    }
  }
}
