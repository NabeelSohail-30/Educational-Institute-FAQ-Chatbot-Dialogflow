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
            case 'SAF Entrance Test': {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "Currently we are not conducting any entrance test. You can visit our center and fill the admission form. Our admission team will contact you shortly."
                                ]
                            }
                        }
                    ]
                })
                break;
            }
            case 'SAF Study Material': {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "We provide study material to our students. You can visit our center and get the study material."
                                ]
                            }
                        }
                    ]
                })
                break;
            }
            case 'SAF Class Duration': {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "Our classes duration is 45 minutes and it can be extended if required. we have 4 classes per day and our classes are scheduled for 6 days a week. You can visit our center and get the detailed schedule."
                                ]
                            }
                        }
                    ]
                })
                break;
            }
            case 'SAF Timing': {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "Our Classes are scheduled from 3:00 PM to 8:00 PM, six days a week from Monday to Saturday. You can visit our center and get the detailed schedule."
                                ]
                            }
                        }
                    ]
                })
                break;
            }
            case 'SAF Online Classes': {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "We are currently not providing online classes. You can visit our center and get the detailed schedule."
                                ]
                            }
                        }
                    ]
                })
                break;
            }
            case 'Payment Method': {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "You can pay our fee physically at our office or by online platforms such as easy-paisa or jazz cash"
                                ]
                            }
                        }
                    ]
                })
                break;
            }
            case 'Late Fee': {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "Yes, there is a late fee depending upon how late the fee is submitted. For more details you can visit our center"
                                ]
                            }
                        }
                    ]
                })
                break;
            }
            case 'Fee Installment': {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "As such we have no such provision for fee installments. The student has to pay its fee every month at once"
                                ]
                            }
                        }
                    ]
                })
                break;
            }
            case 'Transport Facility': {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "Currently we are not providing any transportation facility to the students"
                                ]
                            }
                        }
                    ]
                })
                break;
            }
            case 'One on One Coaching': {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "We are currently not providing one on one coaching to the students, for more detail you can visit our coaching center"
                                ]
                            }
                        }
                    ]
                })
                break;
            }
            case 'Tests and Exams': {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "Yes, we have a very good schedule of weekly test and we also conducts mids and final examination"
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