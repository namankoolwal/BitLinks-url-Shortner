import clientPromise from "@/app/lib/mongodb"

export async function POST(request) {

    const body = await request.json();
    const client = await clientPromise;
    const db = client.db('bitLinks');
    const collection = db.collection('links');

    // if shorturl already exists
    const shortUrlExists = await collection.findOne({shortUrl : body.shortUrl});
    if(shortUrlExists){
        return Response.json({success: false, error: true, message: 'short URL already exists'}, {
            status: 400
        });
    }

    const result = await collection.insertOne({
        url:body.url,
        shortUrl: body.shortUrl,
    }); 

    return Response.json({success: true , error: false, message: 'Short URL generated successfully' })
  }