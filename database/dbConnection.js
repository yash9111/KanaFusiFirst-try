const mongoose = require('mongoose');
require('dotenv').config();


const URI = `mongodb+srv://Adityadev:${process.env.SECRET_PASS}@cluster0.75kbw6j.mongodb.net/Node-Api?retryWrites=true&w=majority`

const connection = () => {
    try {
        mongoose.connect(URI)
            .then(() => { console.log("Database Connected") })
            .catch(() => { console.log("Database not connected") })


    } catch (er) {
        console.log(e.error)
    }
}

module.exports = connection;