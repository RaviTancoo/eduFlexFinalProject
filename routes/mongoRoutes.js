import express from 'express';
import { getCourseContent, getSubmissionsCollection } from '../config/mongo.js';
import { getCoursesCollection } from '../config/mongo.js'; 

const router = express.Router();

router.get('/course/:id', async (req, res) => {
  const courseId = parseInt(req.params.id); 
  try {
    const content = await getCourseContent(courseId);
    res.json(content);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch course content' });
  }
});

router.post('/insert-submission', async (req, res) => {
  try {
    const submissionsCollection = await getSubmissionsCollection();
    const submission = req.body;
    await submissionsCollection.insertOne(submission);
    res.json({ status: 'success', message: 'Submission added.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

router.put('/update-lesson/:courseId/:lessonId', async (req, res) => {
  const { courseId, lessonId } = req.params;
  const updates = req.body;

  try {
    const courses = await getCoursesCollection();

    const result = await courses.updateOne(
      { course_id: parseInt(courseId), "lessons.lesson_id": lessonId },
      {
        $set: {
          ...(updates.topic && { "lessons.$.topic": updates.topic }),
          ...(updates.content && { "lessons.$.content": updates.content }),
          ...(updates.resources && { "lessons.$.resources": updates.resources })
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Course or lesson not found." });
    }

    res.json({ message: "Lesson updated successfully." });
  } catch (err) {
    console.error("Update failed:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.get('/submissions-count-per-course', async (req, res) => {
  try {
    const coursesCollection = await getCoursesCollection();
    const submissionsCollection = await getSubmissionsCollection();

    const aggResult = await submissionsCollection.aggregate([
      {
        $group: {
          _id: "$course_id",
          totalSubmissions: { $sum: 1 }
        }
      }
    ]).toArray();

    res.json(aggResult);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get submissions count' });
  }
});


export const mongoCourseRoutes = router;