import express, { response } from 'express';
import { urlencoded } from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import routes from './routes.js';

import {
    getAdmin,
    createProject, 
    getProjects, 
    createPost,
    getPosts, 
    // getBlogRecords 
} from './database_controller.js';


const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(express.json());


app.get('/login', async (req, res) => {
    const { email, password } = req.query;
    const user = await getAdmin(`${email}`)
    const _isMatch = await bcrypt.compareSync(password, user.password)
    _isMatch ? res.json({ 'ok': true, 'status': 201, 'user': user.email }) :
        res.json({ 'ok': false, 'status': 401, 'message': 'incorrect email or password' });
});

app.post('/create-project', async (req, res) => {
    const {
        title,
        description,
        long_desc,
        live_url,
        repo_url,
        year,
        status,
        featured,
        image_url,
        tech } = req.body;
    const response = await createProject(
        title,
        description,
        long_desc,
        live_url,
        repo_url,
        year,
        status,
        featured,
        image_url,
        JSON.stringify(tech));
        response.ok ? res.json({ 'statusCode': 201, 'ok': true, 'insertId': response.insertId }) : res.json({ 'statusCode': 501, 'ok': false });
});

app.get('/get-projects', async (req, res) => {
    const response = await getProjects();
    return response.ok ? res.json({ 'statusCode': 201, 'ok': true, 'projects': response.projects }) : res.json({ 'statusCode': 404, 'ok': false, 'message': response.message })
});


app.post('/create-post', async (req, res) => {
    const { title, excerpt, content, coverImage, readTime, published, tags } = req.body;
    const response = await createPost(title, excerpt, content, coverImage, readTime, JSON.stringify(tags), published);
    return response.ok ? res.json({ 'statusCode': 201, 'ok': true, 'insertId': response.insertId }) : res.json({ 'statusCode': 501, 'ok': false, 'message': response.message })
});

app.get('/get-posts', async (req, res) => {
    const response = await getPosts();
    return response.ok ? res.send({ 'ok': true, 'statusCode': 201, 'posts':response.posts}) :
        res.json({ 'ok': false, 'statusCode': 401, 'message': response.message })
})



app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
})

