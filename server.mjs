import express from 'express';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dialogflow from 'dialogflow'
import { WebhookClient } from 'dialogflow-fulfillment'

const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.sendStatus(200);
});

const pluck = (arr) => {
    const min = 0;
    const max = arr.length - 1;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    return arr[randomNumber]
}

app.get("/ping", (req, res) => {
    res.send("ping back");
})

const port = process.env.PORT || 5001;


/*---------------------APIs--------------------------*/

app.post('/webhook', async (req, res) => {

    try {
        const body = req.body;

        const intentName = body.queryResult.intent.displayName
        const params = body.queryResult.parameters

        switch (intentName) {
            case "Default Welcome Intent": {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "Hello There, Welcome to SAF Collegiate. How can I help you?"
                                ]
                            }
                        }
                    ]
                })
                break;
            }
            case "What is SAF Collegiate": {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "SAF Collegiate is a leading educational institution in Pakistan. It is a part of the SAF Group of Companies, which is a leading conglomerate in Pakistan. SAF Collegiate is a leading educational institution in Pakistan. It is a part of the SAF Group of Companies, which is a leading conglomerate in Pakistan."
                                ]
                            }
                        }
                    ]
                })
                break;
            }
            case "SAF Collegiate Classes": {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "SAF Collegiate offers coaching for the following classes: 9th, 10th, 11th, 12th"
                                ]
                            }
                        }
                    ]
                })
                break;
            }
            case "SAF Collegiate Streams": {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "SAF Collegiate offers coaching for the following streams: Computer Science, Pre-Medical, Pre-Engineering, Commerce"
                                ]
                            }
                        }
                    ]
                })
                break;
            }
            case "Class 9 CS Subjects": {
                if (params.ordinal != '9th' || params.number != '9') {
                    break;
                }
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "Class 9 Computer Science Subjects are: Computer Science, English, Urdu, Islamiat, Mathematics, Physics, Chemistry"
                                ]
                            }
                        }
                    ]
                })
                break;
            }
            case "Class 9 Pre-Eng Subjects": {
                if (params.ordinal != '9th' || params.number != '9') {
                    break;
                }
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "Class 9 Pre-Engineering Subjects are: English, Urdu, Islamiat, Mathematics, Physics, Chemistry"
                                ]
                            }
                        }
                    ]
                })
                break;
            }
            case "Class 9 Pre-Med Subjects": {
                if (params.ordinal != '9th' || params.number != '9') {
                    break;
                }
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "Class 9 Pre-Medical Subjects are: English, Urdu, Islamiat, Biology, Physics, Chemistry"
                                ]
                            }
                        }
                    ]
                })
                break;
            }
            case "Class 10 Pre-Med Subjects": {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "Class 10 Pre-Medical Subjects are: English, Urdu, Islamiat, Biology, Physics, Chemistry"
                                ]
                            }
                        }
                    ]
                })
                break;
            }
            case "Class 10 CS Subjects": {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "Class 10 Computer Science Subjects are: Computer Science, English, Urdu, Islamiat, Mathematics, Physics, Chemistry"
                                ]
                            }
                        }
                    ]
                })
                break;
            }
            default: {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "Sorry, I didn't get that. Please try again"
                                ]
                            }
                        }
                    ]
                })
            }
        }

    }
    catch (err) {
        console.log(err);
        res.send({
            "fulfillmentMessages": [
                {
                    "text": {
                        "text": [
                            "something is wrong in server, please try again"
                        ]
                    }
                }
            ]
        })
    }

});


/*---------------------Static Files--------------------------*/

const __dirname = path.resolve();
app.get('/', express.static(path.join(__dirname, "/Web/index.html")));
app.use('/', express.static(path.join(__dirname, "/Web")));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})