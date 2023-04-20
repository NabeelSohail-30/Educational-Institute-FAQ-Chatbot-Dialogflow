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
            case "About": {
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

            case "Address": {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "SAF Collegiate is located at 1st Floor, 1st Avenue, Block 5, Clifton, Karachi, Pakistan."
                                ]
                            }
                        }
                    ]
                })
                break;
            }

            case "AdmissionFee": {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "The admission fee is PKR 100,000."
                                ]
                            }
                        }
                    ]
                })
                break;
            }

            case "AdmissionProcess": {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "The admission process is as follows: 1. Fill out the admission form. 2. Submit the admission form along with the required documents. 3. Pay the admission fee. 4. Start attending the classes at the institute."
                                ]
                            }
                        }
                    ]
                })
                break;
            }

            case "EducationalBoard": {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "SAF Collegiate is affiliated with the Board of Intermediate and Secondary Education, Karachi."
                                ]
                            }
                        }
                    ]
                })
                break;
            }

            case "Email": {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "You can contact us at example@gnail.com"
                                ]
                            }
                        }
                    ]
                })
                break;
            }

            case "Facebook": {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "You can find us on Facebook at https://www.facebook.com/SAF-Collegiate-100000000000000"
                                ]
                            }
                        }
                    ]
                })
                break;
            }

            case "Instagram": {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "card": {
                                "title": "Follow us on Instagram!",
                                "subtitle": "Stay up-to-date with our latest news and events",
                                "imageUri": "https://instagram.fkhi2-3.fna.fbcdn.net/v/t51.2885-19/316153330_2294629310695386_8725431159697261149_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fkhi2-3.fna.fbcdn.net&_nc_cat=106&_nc_ohc=1BniT3iRJ-0AX9yCLLZ&edm=ABmJApABAAAA&ccb=7-5&oh=00_AfCMlQ75Rr8zJGnmz96pm1kAOuAXWac789wrKsOWV-Ou5g&oe=6446AB7E&_nc_sid=6136e7",
                                "buttons": [
                                    {
                                        "text": "Follow us",
                                        "postback": "https://www.instagram.com/coder_nabeel30/?hl=en"
                                    }
                                ]
                            }
                        }
                    ]
                });
                break;
            }


            case "Default Fallback Intent": {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "Sorry, I didn't get that. Please try again or contact us at 0300-1234567"
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