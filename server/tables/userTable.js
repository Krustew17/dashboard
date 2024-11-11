export function createUserTable() {
  return `CREATE TABLE IF NOT EXISTS user (
          id INT NOT NULL AUTO_INCREMENT,
          username VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL,
          status VARCHAR(255) NOT NULL,
          role VARCHAR(255) NOT NULL,
          lastLogin DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (id)
      );`;
}
