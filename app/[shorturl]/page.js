import { redirect } from "next/navigation"
import clientPromise from "../lib/mongodb"

export default async function Page({ params }) {
    const shorturl = (await params).shorturl
    const client = await clientPromise;
    const db = client.db('bitLinks');
    const collection = db.collection('links');


    const shortUrlExists = await collection.findOne({shortUrl : shorturl});
    if(shortUrlExists){
         redirect(shortUrlExists.url);
    }
    else{
        redirect(process.env.NEXT_PUBLIC_BASE_URL)
    }

    return <div>My Post: {url}</div>
  }