import { MongoClient } from 'mongodb';
import 'dotenv/config';

const client = new MongoClient(process.env.MONGO_URI);
const dbName = 'eduflex';

async function getCourseContent(courseId) {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection('courses');
  return await collection.find({ course_id: courseId }).toArray();
}

async function getSubmissionsCollection() {
  await client.connect();
  const db = client.db(dbName);
  return db.collection('submissions');
}

async function getCoursesCollection() {
  if (!client.isConnected?.()) await client.connect();
  const db = client.db(dbName);
  return db.collection('courses');
}

export { getCoursesCollection, getCourseContent, getSubmissionsCollection };

