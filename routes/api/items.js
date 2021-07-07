const express = require('express')
const router = express.Router()

//Item Model
const Item = require('../../models/Items');

// @route   GET api/items
// @desc    GET All items
// @access  Public
router.get('/', async (req, res) => {
    try{
        const items = await Item.find().sort({ date: -1})
        res.json(items)
    }catch(e){
        console.log(e)
    }
})

// @route   POST api/items
// @desc    Create an item
// @access  Public
router.post('/', async (req, res) => {
    const newItem = new Item({
        name: req.body.name
    })
    try{
        const item = await newItem.save()
        res.json(item)
    }catch(e){
        console.log(e)
    }
})

// @route   DELETE api/items
// @desc    Delete an item
// @access  Public
router.delete('/:id', async (req, res) => {
        try{
        const item = await Item.findById(req.params.id)
        await item.remove()
        res.json({success: true})
    }catch(e){
        console.log(e)
        res.status(404).json({success: false})
    }
})

module.exports = router