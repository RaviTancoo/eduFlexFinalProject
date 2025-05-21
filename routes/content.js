import { Router } from 'express';
const router = Router();
import { getCourseContent } from '../config/mongo.js';

router.get('/course-content/:courseId', async (req, res) => {
  const { courseId } = req.params;
  try {
    const content = await getCourseContent(courseId);
    res.json({ status: 'success', data: content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

export default router;
