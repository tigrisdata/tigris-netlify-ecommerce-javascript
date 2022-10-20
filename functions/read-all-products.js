import { Tigris } from "@tigrisdata/core";

const tigris = new Tigris({
  serverUrl: process.env.TIGRIS_URL
})

console.log(process.env.TIGRIS_URL)
exports.handler = async (event, context) => {
  const collection = tigris.getDatabase("ecommerce_db").getCollection("ecommerce_collection")

  try {
    const productsCursor = collection.findMany();
    const products = await productsCursor.toArray();
    return {
      statusCode: 200,
      body: JSON.stringify(products)
    };
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
  }
};