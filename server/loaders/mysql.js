import mySQL from "mysql";

export default async function setupMySql({ expressApp }) {
  const connection = mySQL.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
  });

  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      return;
    }
    console.log("Connected to MySQL database");
  });
}
