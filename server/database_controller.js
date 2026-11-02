import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';


//ENSURE TO SET UP YOUR DATABASE I.E MYSQL BEFORE PROCEEDING WITH THSE COMMANDS.


//Check and  create database if it does ot exist
async function createDatabase() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1993'
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS portfolio`);
  await connection.end()
}
createDatabase()

//Setting up the pool for command execution.
const pool = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1993',
  database: 'portfolio'
});



// Creating  schema for Admin
async function createAdminTable() {
  await pool.execute(`CREATE TABLE IF NOT EXISTS admin
  ( id  INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`)
}

// Creating  schema for projects
async function createProjectTable() {
  await pool.execute(`CREATE TABLE IF NOT EXISTS projects
  (id  INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  long_desc TEXT,
  live_url VARCHAR(2099),
  repo_url VARCHAR(2099),
  year  VARCHAR(255),
  status VARCHAR(99),
  featured BOOLEAN DEFAULT false,
  image_url VARCHAR(2099),
  tech JSON,
  views INT default 0
  )`)
}

// Creating  schema for posts
async function createPostTable() {
  await pool.execute(`CREATE TABLE IF NOT EXISTS posts
  (id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  excerpt VARCHAR(255),
  content TEXT,
  cover_image_url VARCHAR(2099),
  read_time VARCHAR(2099),
  tags JSON,
  status VARCHAR(99),
  views INT DEFAULT 0,
  year DATE DEFAULT (CURRENT_DATE)
  )`)
}

async function createTables() {
  await createAdminTable();
  await createProjectTable();
  await createPostTable();
}
createTables();



//Creates  admin  record if not exists
async function createAdmin(email, password) {
  const query = `INSERT INTO admin (email, password) VALUES(?,?)`
  const hashedPassword = await bcrypt.hashSync(password, 10);
  const [response] = await pool.execute(query, [email, hashedPassword])
  return response.affectedRows > 0 ? { 'ok': true, 'insertId': response.insertId } : { 'ok': false }
}

// createAdmin('taeb4all@gmail.com', 'taiwohassan');

// Function to Create Project
export async function createProject(
  title,
  description,
  long_desc,
  live_url,
  repo_url,
  year,
  status,
  featured,
  image_url,
  tech,
  views 
) {
  console.log(title,description,long_desc,live_url,repo_url,year,status,featured,image_url,tech
  )
  const query = `INSERT INTO projects (
  title,
  description,
  long_desc,
  live_url,
  repo_url,
  year,
  status,
  featured,
  image_url,
  tech,
  views
  )
  VALUES(?,?,?,?,?,?,?,?,?,?,?)
  `
  const [response] = await pool.query(query, [
    title,
    description,
    long_desc,
    live_url,
    repo_url,
    year,
    status,
    featured,
    image_url,
    tech,
    views
  ]
  );
  return response.affectedRows > 0 ? { 'ok': true, 'insertId': response.insertId } : { 'ok': false }
}

export async function getProjects() {
  const query = `SELECT * FROM projects`;
  const [projects] = await pool.query(query);
  return projects.length > 0 ? { 'ok': true, 'projects': projects } : { 'ok': false, 'message': 'no record found' }
}

export async function createPost(title, excerpt, content, coverImage, readTime, tags, published) {
  const query = `
    INSERT INTO posts(title, excerpt, content, cover_image_url, read_time, tags, status)
    VALUES(?,?,?,?,?,?,?)
  `
    const [response] = await pool.query(query, [title, excerpt, content, coverImage, readTime, tags, published]);
    return response.affectedRows > 0 ? { 'ok': true, 'insertId': response.insertId } : { 'ok': false }
  }

export async function getPosts() {
  const query = `SELECT * FROM posts`;
  const [posts] = await pool.query(query);
  return posts.length > 0 ? { 'ok': true, 'posts': posts } : { 'ok': false, 'message': 'no post found' }
}

export async function getAdmin(email) {
  const [rows] = await pool.execute(`SELECT * FROM admin WHERE email = ? `, [email]);
  return rows[0];
}


// export async function updateBlog(id, views, readtime) {
//   const query = `
//     UPDATE TABLE blog_record WHERE id = ? (views, readtime)
//     VALUES(?,?,?)
//   `
//   const [response] = await pool.query(query, [id, views, readtime])
//   return response.affectedRows > 0 ? { 'ok': true, 'insertId': response.insertId } : { 'ok': false }
// }




// export async function createAdminRecord(firstname, lastname, email, password) {
//   const [result] = await pool.query(
//     `INSERT INTO admin_record (firstname, lastname, email, password)
//      VALUES(?,?,?,?)
//     `, [firstname, lastname, email, password]
//   );
//   return { 'insertId': result.insertId }
// }
// export async function getSingleAdminRecord(email) {
//   const [rows] = await pool.query(
//     `SELECT * FROM admin_record WHERE email = ?
//     `, [email]
//   );
//   return rows[0];
// }
// createAdminRecord('Taiwo', 'Ebietanmi', 'taeb4all@gmail.com', 'taiwohassan');
