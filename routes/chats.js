var express = require('express');
// var app = express(); come in app.js
var router = express.Router();
var idGen = 2;
var chats = [{
    id: 0,
    name: 'Chat 1',
    messages: [{message: 'Hello', author: 'Carlo', at: new Date()}]
}, {
    id: 1,
    name: 'Nerds',
    messages: [{message: 'Hello Nerds', author: 'Carlo', at: new Date()}, {message: 'Hello Carlo', author: 'Jack', at: new Date()}]
}];

router.get('/count', function(req, res){
    return res.json({count :chats.length});
});

router.get('/', function(req, res){
    if (req.query.name) {
        var temp = [];
        for(var chat of chats) {
            if (chat.name.indexOf(req.query.name) >= 0) {
                temp.push(chat);
            }
        }
        return res.json(temp);
    } 
    return res.json(chats);
});


router.get('/reset', function(req, res){
    chats = [{
        id: 0,
        name: 'Chat 1',
        message: [{message: 'Hello', author: 'Carlo', at: new Date()}]
    }, {
        id: 1,
        name: 'Nerds',
        message: [{message: 'Hello Nerds', author: 'Carlo', at: new Date()}, {message: 'Hello Carlo', author: 'Jack', at: new Date()}]
    }];
    idGen = 2;
    res.json();
})

router.get('/:id', function(req, res){
    for(var chat of chats) {
        if (chat.id === parseInt(req.params.id)) {
            return res.json(chat);
        }
    }
    res.status(404).json('chat not found');
})

router.delete('/:id', function(req, res){
    for(var i=0;  i < chats.length; i++) {
        if (chats[i].id === parseInt(req.params.id)) {
            chats.splice(i, 1);
            return res.json('chat deleted');
        }
    }
    res.status(404).json('chat not found');
})


router.post('/:id/messages', function(req, res){
    for(var chat of chats) {
        if (chat.id === parseInt(req.params.id)) {
            chat.messages.push({
                message: req.body.message, author: req.body.author, date: new Date()
            })
            return res.json(chat);
        }
    }
    res.status(404).json('chat not found');
})

router.post('/',  function(req, res){
    var chat = {
        id: idGen++,
        name: req.body.name,
        messages: [],
    }
    chats.push(chat)
    res.status(201).json(chat);
})


module.exports = router;