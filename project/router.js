const router = require("express").Router()
// const { Router } = require("express")
const knex = require('./database')

// Insert data into candidate table
router.post('/candidate-info', (req, res) => {
    // console.log(req.body,"body")
    const user_data = {
        Name: req.body.Name,
        Email: req.body.Email,
        address: req.body.address
    }
    knex('candidate').insert(user_data)
        .then((data) => {
            console.log(data, ' crete! sucssfully...')
            res.send({
                "statusCode": 200,
                "message": "candidate data has inserted sucssfully"
            })
        }).catch((er) => {
            console.log(er, "error");
            res.send({ "statusCode": 404 })
        })

})
// Insering data into test_score table
router.post('/test_score-createdata', (req, res) => {
    const user_data = {
        user_id: req.body.user_id,
        first_round: req.body.first_round,
        second_round: req.body.second_round,
        third_round: req.body.third_round
    }
    knex('test_score').insert(user_data)
        .then((data) => {
            // console.log(data)
            res.send({
                "statusCode": 200,
                "message": "test_score data has inserted sucssfully"
            })
        }).catch((er) => {
            // console.log(er);
            res.send({"statuscode":404})
        })

})
// Getting data from candidate table
router.get('/candidate-getdata', (req, res) => {
    knex().select('*').from('candidate')
        .then((data) => {
            console.log(data);
            res.send({
                "statusCode": 200,
                "message": "candidate data  get sucssfully"
            })
        })
        .catch((err) => {
            console.log(err);
            res.send({"statuscode":404})
        })
})
// Getting data from test_score table
router.get('/testscore-getdata', (req, res) => {
    knex().select('*').from('test_score')
        .then((data) => {
            console.log(data);
            res.send({"statuscode":200,"message":"test_score data is coming!....'"})
        })
        .catch((err) => {
            console.log(err);
            res.send({"statuscode":404})
        })
})

// Showing all round scores:-
router.get('/user-scores', (req, res) => {
    knex
        .select("*").from('candidate')
        .join('test_score', function () {
            this.on('candidate.id', 'test_score.user_id')
        })
        .then((data) => {
            res.send({"statuscode":200 ,"message":"Show all score data here"})
            console.log("all three round scores........")
            for (i in data) {
                console.log(data[i]["first_round"], data[i]["second_round"], data[i]["third_round"])
            }
        }).catch((error => {
            console.log(error,"error")
            res.send({"statuscode":404})
        }))
})

//Here  i am joining two table in one table
router.get('/score-Average', (req, res) => {
    knex
        .select("*").from('candidate')
        .join('test_score', function () {
            this.on('candidate.id', 'test_score.user_id')
        })
        .then((data) => {
            res.send({"statuscode": 200,"message": 'score average sucessfully'})
            // i am finding here average of each round
            var sum1 = 0;
            var sum2 = 0;
            var sum3 = 0;
            var count = 0
            for (i in data) {
                count += 1
                sum1 = sum1 + data[i]["first_round"]
                sum2 = sum2 + data[i]["second_round"]
                sum3 = sum3 + data[i]["third_round"]
            }
            console.log("the average of first round is......:-", sum1 / count)
            console.log("the average of second round is......:-", sum2 / count)
            console.log("the average of third round is........:-", sum3 / count)
            var first_average = sum1 / count
            var second_average = sum2 / count
            var third_average = sum3 / count
            if (first_average > second_average && first_average > third_average) {
                console.log("hieghest average is first round:-", first_average)
            }
            else if (second_average > first_average && second_average > third_average) {
                console.log("heighest average is second round:-", second_average)
            }
            else if (third_average > first_average && third_average > second_average) {
                console.log("heighest average is third round:-", third_average)
            }

        }).catch((error => {
            console.log(error,"error")
            res.send({"statuscode":404})
        }))
})

// Findind maximum score :-
router.get('/maximum-score', (req, res) => {
    knex
        .select("*").from('candidate')
        .join('test_score', function () {
            this.on('candidate.id', 'test_score.user_id')
        })
        .then((data) => {
            // console.log(data)
            res.send({"statuscode":200})
            var scores = []
            for (i in data) {
                var score = (data[i].first_round + data[i].second_round + data[i].third_round)
                scores.push(score)
            }
            console.log(scores)
            console.log('heightest score is this:-',Math.max.apply(Math, scores))
        }).catch((error => {
            console.log(error,"error")
            res.send({"statuscode":404})
        }))
})

// Updating the data in candidate table:-
router.put('/updating-candidate-data/:id', (req, res) => {
    knex.update(
        req.body
    )
        .table('candidate').where('id', req.params.id)
        .then(() => {
            res.send({"message":200,"message":'candidate data updated sucessfully....!!'})
        })
        .catch((err) => {
            res.send({"statuscode":404})
        })
})

// updating data in test_score table:-
router.put('/updating-test_score-data/:id', (req, res) => {
    knex.update(
        req.body
    )
        .table('test_score').where('id', req.params.id)
        .then(() => {
            console.log(data)
            res.send({"statuscode":200,"message":'test_score data updated sucessfully....!!'})
        })
        .catch((err) => {
            res.send({"statuscode":200})
        })
})


// Deleting   data from candidate table:-
router.delete('/deleting-candidate-data/:id', (req, res) => {
    knex('candidate')
        .where({ 'id': req.params.id }).del()
        .then(() => {
            res.send({"statuscode":200,"message":'candidate data deleted sucessfully....!!'})
        })
        .catch((err) => {
            res.send({"statuscode":404})
        })
})

// Deleting data from test_score table:-
router.delete('/deleting-test_score-data/:id', (req, res) => {
    knex('test_score')
        .where({ 'id': req.params.id }).del()
        .then(() => {
            res.send({"statuscode":200,"message":'test_score data deleted sucessfully....!!'})
        })
        .catch((err) => {
            res.send({"statuscode":404})
        })
})
module.exports = router;

