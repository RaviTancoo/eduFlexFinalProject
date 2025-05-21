// 1. Install dependencies: npm install express dotenv cors
import mongoose from 'mongoose';
import oracledb from 'oracledb';
import path from 'path';

import express, { json }  from 'express';
import 'dotenv/config';
import userRoutes from './routes/user.js';
import contentRoutes from './routes/content.js';
import { mongoCourseRoutes } from './routes/mongoRoutes.js'; // ✅ named import

import { fileURLToPath } from 'url';

const app = express();

// middleware
app.use(json());
app.use(express.static('public'));
app.use('/api', userRoutes);
app.use('/api', contentRoutes);
app.use('/api/mongo', mongoCourseRoutes);

//mongodb
mongoose.connect(process.env.MONGO_URI)
  .then(function () {
    console.log("✅ Connected to MongoDB");
  })
  .catch(function (err) {
    console.error("❌ MongoDB connection error:", err);
  });

//oracledb
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

app.use('/api', mongoCourseRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from public/
app.use(express.static(path.join(__dirname, 'public')));