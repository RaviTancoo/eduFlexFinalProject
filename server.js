// 1. Install dependencies: npm install express dotenv cors
import mongoose from 'mongoose';
import oracledb from 'oracledb';
import fs from 'fs';
import path from 'path';

import express, { json }  from 'express';
import 'dotenv/config';
import userRoutes from './routes/user.js';
import contentRoutes from './routes/content.js';

const app = express();

// middleware
app.use(json());
app.use(express.static('public'));
app.use('/api', userRoutes);
app.use('/api', contentRoutes);

//mongodb
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ Connected to MongoDB");
}).catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});


const walletPath = path.join(process.cwd(), 'wallet');

async function connectToOracle() {
  try {
    process.env.TNS_ADMIN = "./wallet"; 
    const connection = await oracledb.getConnection({
      user: process.env.ORACLE_USER,
      password: process.env.ORACLE_PASSWORD,
      connectString: process.env.ORACLE_CONNECT
    });
    console.log("✅ Connected to Oracle DB");
    await connection.close();
  } catch (err) {
    console.error("❌ Oracle DB connection error:", err);
  }
}

connectToOracle();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`EduFlex Node server running on port ${PORT}`);
});
