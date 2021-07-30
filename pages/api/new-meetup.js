import { MongoClient } from "mongodb";
// /api/new-meetup/new

async function hander(req, res) {
  if (req.method === "POST") {
    try {
      const data = req.body;

      const uri = "mongodb+srv://test:YEeKkVH9vYd96T5@cluster0.9qhae.mongodb.net/meetups?retryWrites=true&w=majority";
      const client = await MongoClient.connect(uri);
      const db = client.db();

      const meetupsCollection = db.collection("meetups");

      const result = await meetupsCollection.insertOne(data);

      console.log(result);
      client.close();

      res.status(201).json({ message: "Meetup Inserted!" });
    } catch (error) {
      console.log(error);
    }
  }
}

export default hander;
