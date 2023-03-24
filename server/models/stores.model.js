const mongoose = require('mongoose');


const StoreSchema = new mongoose.Schema({

    storeName: {
        type: String,
        required: [true, "storeName is required"],
         minlength: [3, "storeName must be at least 3 characters"]
    },

    storeNumber: {
        type: Number,
        required: [true, "storeNumber is required"],
        min: [1, "storeNumber must be greater than 0"]
    },

    open: {
        type: Boolean,
       default: false
    },
   
}, { timestamps: true });

const Store = mongoose.model('Store', StoreSchema);
module.exports = Store;

//Option 2
//module.exports.Joke = mongoose.model('Joke', JokeSchema)
//module.exports = {Joke: mongoose.model}