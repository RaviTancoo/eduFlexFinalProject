import pkg from 'oracledb';
const { initOracleClient, getConnection } = pkg;
// import { initOracleClient, getConnection } from 'oracledb';
import 'dotenv/config';


initOracleClient({ libDir: process.env.ORACLE_CLIENT_PATH });

async function insertUser(user) {
  const connection = await getConnection({
    user: process.env.ORACLE_USER,
    password: process.env.ORACLE_PASSWORD,
    connectString: process.env.ORACLE_CONNECT

  });

  await connection.execute(
    `INSERT INTO users (user_id, first_name, last_name, email, role)
     VALUES (:id, :fname, :lname, :email, :role)`,
    {
      id: user.user_id,
      fname: user.first_name,
      lname: user.last_name,
      email: user.email,
      role: user.role
    },
    { autoCommit: true }
  );

  await connection.close();
}

export default insertUser;
