const express = require("express");
const app = express();
const fs = require("fs");

app.post('/student/add', async (req, res) => {

    try {
        let response;
        let allStudentData=fetchStudent();
        let studentData = ({
            studentFirstName: req.body.studentFirstName,
            collegeName: req.body.collegeName,
            location: req.body.location,
        })
        console.log(studentData );
        allStudentData.push(studentData);
        saveStudentDetails(allStudentData);
        response = {
            'result': "Success"
        };
        res.send(response);

    } catch (err) {
        error = {
            'error': 'Unable to save'
        }
        res.status(500).send(error);
    }
});
app.get('/student/getDetails', async (req, res) => {
    try {
        response=fetchStudent();
        res.send(response);
        
    } catch (err) {
        error = {
            'error': 'Unable to connect'
        }
        res.status(500).send(error);
    }
});
app.get('/student/studentsList', async (req, res) => {
    try {
        let response=[];
        let allData=fetchStudent();
        let studentNameList=[];
        for ( const list of allData) {
            studentNameList.push(list.studentFirstName);
        }
        console.log(studentNameList);
        response={
            'result': studentNameList,
        };
        res.send(response);
        
    } catch (err) {
        error = {
            'error': 'Unable to connect'
        }
        res.status(500).send(error);
    }
});
var fetchStudent = () => {  //global function
    try {
      var allStudent= fs.readFileSync('details.json');
      return JSON.parse(allStudent);  //convert into object
    } catch(e) {
      return []
    }
};
var saveStudentDetails = (value) => {  //global function
fs.writeFileSync('details.json', JSON.stringify(value));
};
  
module.exports = app;