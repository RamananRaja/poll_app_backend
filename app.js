const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { mongoose } = require('./db/mongoose');
const { Question } = require('./db/models/questions.model')
const { User } = require('./db/models/users.model');
const { Answer } = require('./db/models/answers.model');

/*LOAD MIDDLEWARE*/
app.use(bodyParser.json());
//CORS headers middleware
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Request-With, x-access-token, x-refresh-token, content-type, Accept, _id");
    res.header("Access-Control-Expose-Headers", "x-refresh-token, x-access-token");
    res.header("Access-Control-Allow-Credentials", true);

    next();
});
/*END MIDDLEWARE

/* USER ROUTES */
//DUMMY
app.get(`/`, (req, res) => {
    res.send("hello world");
    console.log("test");
})
/**
 * POST /createQuestion
 * PURPOSE: creating new question to db
 */
app.post(`/createQuestion`, (req, res) => {
    let qno = req.body.qno;
    let ques = req.body.question;
    let op1 = req.body.option1;
    let op2 = req.body.option2;
    let op3 = req.body.option3;
    let op4 = req.body.option4;
    let question = new Question({ 'qno': qno, 'question': ques, 'option1': op1, 'option2': op2, 'option3': op3, 'option4': op4 });
    question.save().then(() => {
        console.log("saved");
        res.send({message:"saved"});
    }).catch((e) => {
        console.log(e);
    })
})
/**
 * POST /postAnswer
 * PURPOSE: saving answer
 */
app.post(`/postAnswer`, (req, res) => {
    //console.log("save answer fun");
    //console.log(req.body.ans);
    let username = req.body.username;
    let qno = req.body.qno;
    let ans = req.body.ans;
    let question = req.body.question;
    console.log(req.body.username);
    console.log(req.body.qno);
    console.log(req.body.ans);
    console.log(req.body.question);
    let answer = new Answer({ 'username': username, 'qid': qno, 'ans': ans, 'question': question });
    answer.save().then(() => {
        console.log("answer saved");
        res.send({message: "answer saved",success: true});
    }).catch((e) => {
        console.log(e);
    })
})
/**
 * PATCH /updateQuestion
 * PURPOSE: updating previous question in db
 */
app.patch(`/updateQuestion`, (req, res) => {
    Question.findOneAndUpdate({
        qno: req.body.qno
    },{
        $set: req.body
    }).then(() => {
        res.send({message:"success"});
    }).catch((e) => {
        console.log("failed");
    })
})
/**
 * DELETE /deleteQuestion
 * PURPOSE: deleting question from db
 */
app.post(`/deleteQuestion`,(req,res) => {
    Question.findOneAndDelete({
        qno: req.body.qno
    }).then((removeQuestion) => {
        res.send(removeQuestion);
    })
})
/**
 * GET /getQuestion
 * PURPOSE: displaying question from db
 */
app.get(`/getQuestion`, (req, res) => {
    Question.find({
    }).then((ques) => {
        res.send(ques);
    })
})
/**
 * POST /login
 * PURPOSE: login
 */
app.post(`/login`, (req,res) => {
    //console.log(req.body.username);
    //console.log(req.body.password);
    User.findOne({
        username: req.body.username,
        password: req.body.password,
    }).then((userData) => {
        if(userData === null) {
            console.log('login failed');
            //res.send({message: " login success"});
            res.send({message: "login failed"});
        } else {
            console.log('login success');
            //res.send({message: " login success"});
            res.send({userData, message: "200"});
        }
    }).catch((e) => {
        console.log(e);
    })
})

app.get('/fetchques/anlys/:qid', async(req, res ) => {
    const _id = req.params.qid;
    const ques = await Question.findById({ _id: _id });
    console.log(ques);
    const t_ans = await Answer.count({ qid: _id });
    const opt1 = await Answer.count({ qid: _id, ans: ques.option1 });
    const opt2 = await Answer.count({ qid: _id, ans: ques.option2 });
    const opt3 = await Answer.count({ qid: _id, ans: ques.option3 });
    const opt4 = await Answer.count({ qid: _id, ans: ques.option4 });
    res.send({ t_ans, opt1, opt2, opt3, opt4 });
});

//get user result
app.get('/getuserans/:username', async(req, res) => {
    const username = req.params.username;
    const usercnt = await Answer.count({ username: username });
    //console.log(usercnt);
    const userResult = await Answer.find({ username: username });
    
    console.log(userResult);
    /*for(let i=0; i<usercnt; i++) {
        const qno = userDetails[i]['qno'];
        const ans = userDetails[i]['ans'];
        console.log(qno, ans);
    }*/
    res.send(userResult);
})

app.get('/getuser', async(req, res) => {
    const userArr = await User.find({});
    console.log(userArr);
    res.send(userArr);
})


//Listening port
app.listen(3000, () => {
    console.log("SERVER IS LISTENING IN PORT 3000");
})