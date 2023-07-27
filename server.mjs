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

            case "Instagram": {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "Follow us on Instagram to stay up-to-date with our latest news and events"
                                ]
                            }
                        },
                        {
                            "payload": {
                                "richContent": [
                                    [
                                        {
                                            "type": "info",
                                            "title": "Follow us on Instagram!",
                                            "subtitle": "Stay up-to-date with our latest news and events",
                                            "image": {
                                                "src": {
                                                    "rawUrl": "https://example.com/instagram-logo.png"
                                                }
                                            },
                                            "actionLink": "https://www.instagram.com/safcollegiate/"
                                        }
                                    ]
                                ]
                            }
                        }
                    ]
                });
                break;
            }

            case "Facebook": {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "Follow us on Facebook to stay up-to-date with our latest news and events"
                                ]
                            }
                        },
                        {
                            "payload": {
                                "richContent": [
                                    [
                                        {
                                            "type": "info",
                                            "title": "Follow us on Facebook!",
                                            "subtitle": "Stay up-to-date with our latest news and events",
                                            "image": {
                                                "src": {
                                                    "rawUrl": "https://example.com/facebook-logo.png"
                                                }
                                            },
                                            "actionLink": "https://www.facebook.com/safcollegiate/"
                                        }
                                    ]
                                ]
                            }
                        }
                    ]
                });
                break;
            }

            case "Email": {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "You can contact us at safcollegiate@gmail.com"
                                ]
                            }
                        },
                        {
                            "payload": {
                                "richContent": [
                                    [
                                        {
                                            "type": "info",
                                            "title": "Contact us at safcollegiate@gmail.com",
                                            "subtitle": "We are here to help you!",
                                            "image": {
                                                "src": {
                                                    "rawUrl": "https://example.com/email-logo.png"
                                                }
                                            },
                                            "actionLink": "mailto:sample@gmail.com"
                                        }
                                    ]
                                ]
                            }
                        }
                    ]
                })
                break;
            }

            case "LinkedIn": {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "Follow us on LinkedIn to stay up-to-date with our latest news and events"
                                ]
                            }
                        },
                        {
                            "payload": {
                                "richContent": [
                                    [
                                        {
                                            "type": "info",
                                            "title": "Follow us on LinkedIn!",
                                            "subtitle": "Stay up-to-date with our latest news and events",
                                            "image": {
                                                "src": {
                                                    "rawUrl": "https://example.com/linkedin-logo.png"
                                                }
                                            },
                                            "actionLink": "https://www.linkedin.com/company/saf-collegiate/"
                                        }
                                    ]
                                ]
                            }
                        }
                    ]
                });
                break;
            }

            case "Twitter": {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "Follow us on Twitter to stay up-to-date with our latest news and events"
                                ]
                            }
                        },
                        {
                            "payload": {
                                "richContent": [
                                    [
                                        {
                                            "type": "info",
                                            "title": "Follow us on Twitter!",
                                            "subtitle": "Stay up-to-date with our latest news and events",
                                            "image": {
                                                "src": {
                                                    "rawUrl": "https://example.com/twitter-logo.png"
                                                }
                                            },
                                            "actionLink": "https://twitter.com/safcollegiate"
                                        }
                                    ]
                                ]
                            }
                        }
                    ]
                });
                break;
            }

            case "Youtube": {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "Follow us on Youtube to stay up-to-date with our latest news and events"
                                ]
                            }
                        },
                        {
                            "payload": {
                                "richContent": [
                                    [
                                        {
                                            "type": "info",
                                            "title": "Follow us on Youtube!",
                                            "subtitle": "Stay up-to-date with our latest news and events",
                                            "image": {
                                                "src": {
                                                    "rawUrl": "https://example.com/youtube-logo.png"
                                                }
                                            },
                                            "actionLink": "https://www.youtube.com/channel/UCZQY9YQZ5ZQZ5ZQZ5ZQZ5ZQ"
                                        }
                                    ]
                                ]
                            }
                        }
                    ]
                });
                break;
            }

            case "Website": {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "Visit our website to learn more about us"
                                ]
                            }
                        },
                        {
                            "payload": {
                                "richContent": [
                                    [
                                        {
                                            "type": "info",
                                            "title": "Visit our website",
                                            "subtitle": "Learn more about us",
                                            "image": {
                                                "src": {
                                                    "rawUrl": "https://example.com/website-logo.png"
                                                }
                                            },
                                            "actionLink": "https://www.safcollegiate.com/"
                                        }
                                    ]
                                ]
                            }
                        }
                    ]
                });
                break;
            }

            case "SocialMedia": {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "Visit our website to learn more about us"
                                ]
                            }
                        },
                        {
                            "payload": {
                                "richContent": [
                                    [
                                        {
                                            "type": "chips",
                                            "options": [
                                                {
                                                    "text": "Facebook",
                                                    "image": {
                                                        "src": {
                                                            "rawUrl": "https://example.com/images/logo.png"
                                                        }
                                                    },
                                                    "link": "https://example.com"
                                                },
                                                {
                                                    "text": "Instagram",
                                                    "image": {
                                                        "src": {
                                                            "rawUrl": "https://example.com/images/logo.png"
                                                        }
                                                    },
                                                    "link": "https://example.com"
                                                },
                                                {
                                                    "text": "Twitter",
                                                    "image": {
                                                        "src": {
                                                            "rawUrl": "https://example.com/images/logo.png"
                                                        }
                                                    },
                                                    "link": "https://example.com"
                                                },
                                                {
                                                    "text": "LinkedIn",
                                                    "image": {
                                                        "src": {
                                                            "rawUrl": "https://example.com/images/logo.png"
                                                        }
                                                    },
                                                    "link": "https://example.com"
                                                },
                                            ]
                                        }
                                    ]
                                ]
                            }
                        }
                    ]
                });
                break;
            }

            case "WhatsApp": {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "You can contact us on WhatsApp at 0300-1234567"
                                ]
                            }
                        },
                        {
                            "payload": {
                                "richContent": [
                                    [
                                        {
                                            "type": "info",
                                            "title": "Contact us on WhatsApp",
                                            "subtitle": "0300-1234567",
                                            "image": {
                                                "src": {
                                                    "rawUrl": "https://example.com/whatsapp-logo.png"
                                                }
                                            },
                                            "actionLink": "https://wa.me/923001234567"
                                        }
                                    ]
                                ]
                            }
                        }
                    ]
                });
                break;
            }

            case "Streams": {
                const classValue = params.Classes;
                let fulfillmentMessages;

                if (classValue === "9" || classValue === "10") {
                    fulfillmentMessages = [
                        {
                            text: {
                                text: [`We offer the following streams for class ${classValue}`],
                            },
                        },
                        {
                            payload: {
                                richContent: [
                                    [
                                        {
                                            type: "chips",
                                            options: [
                                                {
                                                    text: "Computer Science",
                                                    image: {
                                                        src: {
                                                            rawUrl: "https://example.com/images/logo.png",
                                                        },
                                                    },
                                                    link: "https://example.com",
                                                },
                                                {
                                                    text: "Medical",
                                                    image: {
                                                        src: {
                                                            rawUrl: "https://example.com/images/logo.png",
                                                        },
                                                    },
                                                    link: "https://example.com",
                                                },
                                            ],
                                        },
                                    ],
                                ],
                            },
                        },
                    ];
                } else if (classValue === "11" || classValue === "12") {
                    fulfillmentMessages = [
                        {
                            text: {
                                text: [`We offer the following streams for class ${classValue}`],
                            },
                        },
                        {
                            payload: {
                                richContent: [
                                    [
                                        {
                                            type: "chips",
                                            options: [
                                                {
                                                    text: "Computer Science",
                                                    image: {
                                                        src: {
                                                            rawUrl: "https://example.com/images/logo.png",
                                                        },
                                                    },
                                                    link: "https://example.com",
                                                },
                                                {
                                                    text: "Commerce",
                                                    image: {
                                                        src: {
                                                            rawUrl: "https://example.com/images/logo.png",
                                                        },
                                                    },
                                                    link: "https://example.com",
                                                },
                                                {
                                                    text: "Pre Engineering",
                                                    image: {
                                                        src: {
                                                            rawUrl: "https://example.com/images/logo.png",
                                                        },
                                                    },
                                                    link: "https://example.com",
                                                },
                                                {
                                                    text: "Pre Medical",
                                                    image: {
                                                        src: {
                                                            rawUrl: "https://example.com/images/logo.png",
                                                        },
                                                    },
                                                    link: "https://example.com",
                                                },
                                            ],
                                        },
                                    ],
                                ],
                            },
                        },
                    ];
                } else {
                    fulfillmentMessages = [
                        {
                            text: {
                                text: [`Sorry, we do not offer any streams for class ${classValue}`],
                            },
                        },
                    ];
                }

                res.send({
                    fulfillmentMessages,
                });
                break;
            }


            case "RequiredDocuments": {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "You need to submit the following documents"
                                ]
                            }
                        },
                        {
                            "payload": {
                                "richContent": [
                                    [
                                        {
                                            "type": "chips",
                                            "title": "Required Documents",
                                            "subtitle": "You need to submit the following documents",
                                            "image": {
                                                "src": {
                                                    "rawUrl": "https://example.com/images/logo.png"
                                                }
                                            },
                                            "options": [
                                                {
                                                    "text": "Matric Certificate",
                                                    "image": {
                                                        "src": {
                                                            "rawUrl": "https://example.com/images/logo.png"
                                                        }
                                                    },
                                                },
                                                {
                                                    "text": "FSC Certificate",
                                                    "image": {
                                                        "src": {
                                                            "rawUrl": "https://example.com/images/logo.png"
                                                        }
                                                    },
                                                },
                                                {
                                                    "text": "Domicile",
                                                    "image": {
                                                        "src": {
                                                            "rawUrl": "https://example.com/images/logo.png"
                                                        }
                                                    },
                                                },
                                                {
                                                    "text": "Character Certificate",
                                                    "image": {
                                                        "src": {
                                                            "rawUrl": "https://example.com/images/logo.png"
                                                        }
                                                    },
                                                },
                                            ]
                                        }
                                    ]
                                ]
                            }
                        }
                    ]
                });
                break;
            }

            case "FeeStructure": {
                const feeStructure = {
                    "9": {
                        "Computer Science": "PKR 3000",
                        "Pre Medical": "PKR 3000"
                    },
                    "10": {
                        "Computer Science": "PKR 3000",
                        "Pre Medical": "PKR 3000"
                    },
                    "11": {
                        "Pre Engineering": "PKR 3500",
                        "Pre Medical": "PKR 3500",
                        "Commerce": "PKR 3500",
                        "Computer Science": "PKR 3500"
                    },
                    "12": {
                        "Pre Engineering": "PKR 3500",
                        "Commerce": "PKR 3500",
                        "Computer Science": "PKR 3500",
                        "Pre Medical": "PKR 3500"
                    }
                };

                const classFee = feeStructure[params.Classes] ? feeStructure[params.Classes][params.Group] : null;

                if (classFee) {
                    res.send({
                        "fulfillmentMessages": [{
                            "text": {
                                "text": [
                                    `The fee structure for Class ${params.Classes} ${params.Group} is as ${classFee} per month`
                                ]
                            }
                        }]
                    });
                } else {
                    res.send({
                        "fulfillmentMessages": [{
                            "text": {
                                "text": [
                                    "Sorry, the fee structure for your class is not available. Please contact us at 0300-1234567"
                                ]
                            }
                        }]
                    });
                }

                break;
            }

            case "PhoneNumber": {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "You can contact us on 0300-1234567"
                                ]
                            }
                        }
                    ]
                });
                break;
            }

            case "BatchSize": {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "The batch size is 30 students"
                                ]
                            }
                        }
                    ]
                })
                break;
            }

            case "ClassDuration": {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "The class duration is 1 hour"
                                ]
                            }
                        }
                    ]
                })
                break;
            }

            case "ClassTiming": {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "The class timings are 8:00 AM to 2:00 PM"
                                ]
                            }
                        }
                    ]
                })
                break;
            }

            case "Classes": {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "We Offer coaching for the following classes"
                                ]
                            }
                        },
                        {
                            "payload": {
                                "richContent": [
                                    [
                                        {
                                            "type": "chips",

                                            "options": [
                                                {
                                                    "text": "11",
                                                },
                                                {
                                                    "text": "12",
                                                },
                                                {
                                                    "text": "10",
                                                },
                                                {
                                                    "text": "09",
                                                },
                                            ]
                                        }
                                    ]
                                ]
                            }
                        }
                    ]
                })
                break;
            }

            case "AdmissionCancellationPolicy": {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "You can cancel your admission at any time"
                                ]
                            }
                        }
                    ]
                })
                break;
            }

            case "AdmissionForm": {
                res.send({
                    "telegram": [
                        {
                            "text": "You can fill the form Online from our website, and we also provide admission forms at the institute",
                            "reply_markup": {
                                "inline_keyboard": [
                                    [
                                        {
                                            "text": "Link to the Form",
                                            "url": "https://www.safcollegiate.com/"
                                        }
                                    ]
                                ]
                            }
                        }
                    ]
                })
                break;
            }

            case "ClassMode": {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "We offer 3 modes of class"
                                ]
                            }
                        },
                        {
                            "payload": {
                                "richContent": [
                                    [
                                        {
                                            "type": "chips",

                                            "options": [
                                                {

                                                    "text": "Online",
                                                },

                                                {
                                                    "text": "Offline",
                                                },
                                                {

                                                    "text": "Both",
                                                },
                                            ]
                                        }
                                    ]
                                ]
                            }
                        }
                    ]
                })
                break;
            }

            case "DemoClass": {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "We Offer Free Demo Class for Students, Students can come to the institute and attend the demo class without any complicated process."
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
                                    "Sorry, I didn't get that. Please try again or contact us at 0300-1234567"
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