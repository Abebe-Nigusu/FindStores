const Store = require("../models/stores.model")
//option2:
//const {Store} = require("../models/author.model")

module.exports.apiTest = (req, res) => {
     res.json({message: "The server is working!"})
}

module.exports.getAll = (req, res) => {
    Store.find()
        .then(allstores=> res.json(allstores))
        .catch(err=>res.status(400).json(err))
}

module.exports.getOne = (req, res) => {
    const paramsId = req.params.id
    Store.findOne({ _id: paramsId })
        .then(oneStore => res.json(oneStore))
        .catch(err=>res.status(400).json(err))
}

module.exports.addStore = (req, res) => {
    const newStore = req.body
    Store.create(newStore)
    .then(addedStore=> res.json(addedStore))
    .catch(err=>res.status(400).json(err))
}

module.exports.updateStore = (req, res) => {
    Store.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        {new: true, runValidators: true} 
    )
    .then(updatedStore=> res.json(updatedStore))
    .catch(err=>res.status(400).json(err))
}

module.exports.deleteStore = (req, res) => {
    
    Store.deleteOne({ _id: req.params.id })
    .then(message=> res.json(message))
    .catch(err=>res.status(400).json(err))
    
}