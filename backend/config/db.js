const mongoose = require("mongoose");
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const conn = async () => {
  try {
    const dbConn = await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@cluster0.byaxz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("Connected to the database");
    return dbConn;
  } catch (error) {
    console.log(error);
  }
};

conn();
