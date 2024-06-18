const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const cors = require('cors')
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('public'))
app.use('/Files', express.static('Files'))


const mongoUrl = "mongodb+srv://raghu071003:saisrv0703@uploads.6lm0tfe.mongodb.net/"
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
}).then(() => {
    console.log("connected to database");
}).catch((e) => console.log(e))


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const folderPath = path.join('./Files', req.params.folder);
        fs.mkdirSync(folderPath, { recursive: true });
        cb(null, folderPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + '_' + file.originalname);
    }
});
const upload = multer({ storage: storage })


app.get('/', async (req, res) => {
    res.send('Success')
})

app.listen(5000, () => {
    console.log('Server started on 5000');
})


app.post("/uploadFiles/:folder(*)", upload.single("file"), async (req, res) => {
    try {
        console.log(req.file);
        res.send({ status: 'ok' })
    } catch (e) {
        console.log(e);
        res.status(500).send({ error: 'Server error' });
    }
})



app.get('/files/:folderPath(*)', async (req, res) => {
    const folderPath = path.join(__dirname, 'Files', req.params.folderPath || '');
    try {
        const files = fs.readdirSync(folderPath);
        const fileList = files.map(file => ({
            name: file,
            type: fs.statSync(path.join(folderPath, file)).isDirectory() ? 'folder' : 'file'
        }));
        res.json({ fileList });
    } catch (error) {
        res.status(404).json({ error: 'Folder not found' });
    }
});
///DownLoad Files

app.get('/download/:folder(*)/:fileName', (req, res) => {
    const { folder, fileName } = req.params;
    const filePath = path.join(__dirname, folder, fileName);

    try {
        if (fs.existsSync(filePath)) {
            res.sendFile(filePath);
        } else {
            res.status(404).send('File not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


//Delete Files from server and database


app.delete('/deleteFile/:folder(*)/:fileName', async (req, res) => {
    const { folder, fileName } = req.params;
    try {
        const filePath = path.join(__dirname, folder, fileName);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log('del')
        }

        res.send({ status: 'ok', message: 'File deleted successfully' });
    } catch (err) {
        console.error("Error deleting file:", err);
        res.status(500).send({ error: 'Server error' });
    }
});
var userLoggedIn = ''
const JWT_SECRET = 'treceS321';
const Users = require('./UserDetails.js');
app.post('/login', upload.none(), async (req, res) => {
    const userName = req.body.username;
    const password = req.body.password;

    try {
        // Find user by username
        const user = await Users.findOne({ username: userName });

        if (user && user.password === password) {
            // Generate JWT token
            const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '24h' });
            
            res.json({ status: 'ok', message: 'Login Successful', token, data: user });
            
        } else {
            // Send error response if username or password is incorrect
            res.status(401).json({ status: 'error', message: 'Invalid username or password' });
            
        }
    } catch (error) {
        console.error('Error occurred while logging in:', error);
        res.status(500).send({ status: 'error', message: 'Internal Server Error' });
    }
});



app.post('/register', upload.none(), async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const existingUser = await Users.findOne({ username: username });
        if (existingUser) {
            return res.status(201).json({ status: 'error', message: 'User already exists' });

        }
        const newUser = new Users({ username: username, password: password });
        await newUser.save();
        return res.status(200).json({ status: 'ok', message: 'User Registered Successfully', data: newUser });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
});


app.post('/logout', (req, res) => {
    console.log(req.headers)
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
        res.status(200).json({ message: 'Logout successful' });
    });
});

