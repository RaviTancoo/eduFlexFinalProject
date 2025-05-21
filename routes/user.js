import { Router } from 'express';
const router = Router();

import insertUser from '../config/oracle.js';

router.post('/register', async (req, res) => {
  const user = req.body;
  try {
    await insertUser(user);
    res.json({ status: 'success', message: 'Registered to the Hogwarts database 🪄' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

import oracledb from 'oracledb';

//NUMBER OF REGISTERED USERS
router.get('/count', async (req, res) => {
  try {
    const connection = await oracledb.getConnection({
      user: process.env.ORACLE_USER,
      password: process.env.ORACLE_PASSWORD,
      connectString: process.env.ORACLE_CONNECT
    });

    const result = await connection.execute(`
      SELECT role, COUNT(*) AS count 
      FROM users 
      GROUP BY role
    `);

    await connection.close();

    const counts = {};
    result.rows.forEach(row => {
      const [role, count] = row;
      counts[role.toLowerCase()] = count;
    });

    res.json({ status: 'success', counts });

  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});


//UPDATE STUDENTS WHO HAVE BECOME TEACHERS
router.put('/update-role', async (req, res) => {
  const { user_id, new_role } = req.body;

  try {
    const connection = await oracledb.getConnection({
      user: process.env.ORACLE_USER,
      password: process.env.ORACLE_PASSWORD,
      connectString: process.env.ORACLE_CONNECT
    });

    const result = await connection.execute(
      `UPDATE users SET role = :new_role WHERE user_id = :user_id`,
      [new_role, user_id],
      { autoCommit: true }
    );

    await connection.close();
    res.json({ status: 'success', rowsUpdated: result.rowsAffected });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

//DELETE USERS
router.delete('/delete-user', async (req, res) => {
  const { user_id, first_name, last_name } = req.body;

  try {
    const connection = await oracledb.getConnection({
      user: process.env.ORACLE_USER,
      password: process.env.ORACLE_PASSWORD,
      connectString: process.env.ORACLE_CONNECT
    });

    const result = await connection.execute(
      `DELETE FROM users WHERE user_id = :user_id AND first_name = :first_name AND last_name = :last_name`,
      { user_id, first_name, last_name },
      { autoCommit: true }
    );

    await connection.close();

    if (result.rowsAffected === 0) {
      return res.status(404).json({ status: 'error', message: 'No matching user found.' });
    }

    res.json({ status: 'success', message: `Deleted User : ${user_id} ${first_name} ${last_name}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});


export default router;
