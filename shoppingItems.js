const express = require("express")
const router = new express.Router()
const shoppingListDb = require("./fakeDb")
const ExpressError = require("./expressError")
const { route } = require("./app")

router.get('/', (req, res)=>{
    console.log('get works')
    res.json({shoppingListDb})
})

router.get('/:name', (req, res, next)=>{
    console.log('get by name works')
    const item = shoppingListDb.find(item => item.name === req.params.name)
    if (item === undefined) {
        throw new ExpressError("Item not found", 404)
        }
    res.json({ item })
  
})

router.post('/', (req, res, next)=>{
    console.log('post works')
    console.log(req.body)
    // console.log(req.body.item.price)
    try{
        if(!req.body.name) throw new ExpressError('NO ITEM ADDED', 400)
        shoppingListDb.push(req.body)
        console.log(shoppingListDb)
        return res.json({added: req.body})
    }catch(e){
        next(e)
    }
})

router.patch('/:name', (req, res, next) =>{
    let Item = shoppingListDb.find(item => item.name === req.params.name)
    console.log('patch works')
    console.log(Item)
    if (Item === undefined) {
        throw new ExpressError("item not found", 404)
      }
    Item.name = req.body.name
    Item.price = req.body.price
    console.log(shoppingListDb)
    res.json({ item: Item })
})

router.delete('/:name', (req, res)=>{
    let Item = shoppingListDb.findIndex(item => item.name === req.params.name)
    if (Item === -1) {
      throw new ExpressError("Item no found", 404)
    }
    shoppingListDb.splice(Item, 1)
    res.json({ message: "Deleted" })
})

module.exports = router