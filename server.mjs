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
            case "SAF Collegiate Boards": {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "Currently SAF Collegiate offers coaching for Karachi Board only. We are working on expanding our services to other boards."
                                ]
                            }
                        }
                    ]
                })
                break;
            }
            case "Admission Process": {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "Admission process is very simple. You can visit our website and fill the admission form. Our admission team will contact you shortly."
                                ]
                            }
                        }
                    ]
                })
                break;
            }
            case "Admission Fee": {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "Admission fee is PKR 500. You can pay the fee online or in cash at our office."
                                ]
                            }
                        }
                    ]
                })
                break;
            }
            case "Fee Structure Class 9": {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "Fee structure for class 9 is PKR 3000 per month. You can pay the fee online or in cash at our office. For more details visit our office."
                                ]
                            }
                        }
                    ]
                })
                break;
            }
            case "Fee Structure Class 10": {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "Fee structure for class 10 is PKR 3000 per month. You can pay the fee online or in cash at our office. For more details visit our office."
                                ]
                            }
                        }
                    ]
                })
                break;
            }
            case "Fee Structure Class 11": {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "Fee structure for class 11 is PKR 3500 per month. You can pay the fee online or in cash at our office. For more details visit our office."
                                ]
                            }
                        }
                    ]
                })
                break;
            }
            case "Fee Structure Class 12": {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "Fee structure for class 12 is PKR 3500 per month. You can pay the fee online or in cash at our office. For more details visit our office."
                                ]
                            }
                        }
                    ]
                })
                break;
            }
            case "SAF Faculty": {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "SAF Collegiate has a team of highly qualified and experienced faculty members. Our faculty members are highly qualified and experienced. They are well trained and have a lot of experience in their respective fields.\n\nOur faculty members include \n\n 1. Sir Shabbir Hussain (Faculty of Physics and Commerce) \n 2. Sir Abdul Rehman (Faculty of Chemistry) \n 3. Sir Muhammad Owais (Faculty of English, Biology, Commerce) \n 4. Sir Zahid Ali (Faculty of Math) \n 5. Sir Muhammad Nabeel (Faculty of Computer Science) \n\n For more details visit our center."
                                ]
                            }
                        }
                    ]
                })
                break;
            }
            case "SAF Contact Number": {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "You can contact us at the following numbers: \n\n 1. 021-34567890 \n 2. 021-34567891 \n 3. 021-34567892"
                                ]
                            }
                        }
                    ]
                })
                break;
            }
            case "SAF Address": {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "You can visit our center at the following address: \n\n 1. 123, ABC Street, Karachi, Pakistan"
                                ]
                            }
                        }
                    ]
                })
                break;
            }
            case "SAF Email": {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "You can contact us at the following email address: safcollegiate@gmail.com"
                                ]
                            }
                        }
                    ]
                })
                break;
            }
            case "SAF Website": {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "You can visit our website at the following link: https://safcollegiate.com"
                                ]
                            }
                        }
                    ]
                })
                break;
            }
            case "SAF Social Media": {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "You can follow us on the following social media platforms: \n\n 1. Facebook: https://www.facebook.com/safcollegiate \n 2. Instagram: https://www.instagram.com/safcollegiate \n 3. Twitter: https://www.twitter.com/safcollegiate"
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