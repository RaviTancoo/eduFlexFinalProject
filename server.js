import mongoose from 'mongoose';
//import oracledb from 'oracledb';
import path from 'path';

import express, { json } from 'express';
import 'dotenv/config';
import userRoutes from './routes/user.js';
import contentRoutes from './routes/content.js';
import { mongoCourseRoutes } from './routes/mongoRoutes.js';

import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', userRoutes);
app.use('/api', contentRoutes);
app.use('/api/mongo', mongoCourseRoutes);

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));



/*
if (process.env.USE_ORACLE === 'true') {
  const walletPath = path.join(process.cwd(), 'wallet');

  async function connectToOracle() {
    try {
      process.env.TNS_ADMIN = walletPath;
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
} else {
  console.log("ℹ️ Oracle wallet not found — skipping Oracle DB connection.");
}*/
console.log("ℹ️ Skipping Oracle DB connection for Render deployment.");

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 EduFlex Node server running on port ${PORT}`);
});
