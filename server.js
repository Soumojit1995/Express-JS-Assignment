const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

let app = express();
let multer = require('multer');
let upload = multer();

const studentRouter = require("./Routes/studentRoutes.js");





app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({
    extended: true
})) // for parsing application/x-www-form-urlencoded

// for parsing multipart/form-data
app.use(upload.array());
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')))
app.get('/', async (req, res) => {

    try {
        let response;
        response = {
            'result': "Api Connected"
        };
        res.send(response);

    } catch (err) {
        error = {
            'error': 'Unable to save'
        }
        res.status(500).send(error);
    }
});
app.use(express.static(path.join(__dirname, 'public')))

app.use(studentRouter);

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
