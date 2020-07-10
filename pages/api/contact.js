import { MongoClient } from "mongodb";

const requestContact = async () => {
  const client = new MongoClient(process.env.ConnectionString);
  try {
    await client.connect();
    return await client
      .db("stewie-test")
      .collection("Contacts")
      .findOne({ contactNumber: 0 });
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
};

const update = async updates => {
  const client = new MongoClient(process.env.ConnectionString);
  try {
    await client.connect();
    return await client
      .db("stewie-test")
      .collection("Contacts")
      .updateMany(
        { contactNumber: 0 },
        {
          $set: [{}, ...updates].reduce((updater, update) => ({
            ...updater,
            [update.location]: update.updatedValue
          }))
        }
      );
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
};

export default (req, res) => {
  if (req.method === "POST") {
    update(req.body)
      .then(() =>
        res
          .status(200)
          .json({})
          .end()
      )
      .catch(() => res.status(500));
  } else {
    requestContact().then(result => res.status(200).json(result));
  }
};
