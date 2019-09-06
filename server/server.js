const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config').get(process.env.NODE_ENV);
const app = express();

mongoose.Promise = global.Promise;

// mongoose.connect(config.DATABASE, { newUrlParser: true });
try {
    mongoose.connect(config.DATABASE, { useNewUrlParser: true });
} catch (error) {
    console.log(error);
}
const { Todo } = require('./models/todos');

app.use(bodyParser.json());


//saving user todo
app.post('/api/addTodo', (req, res) => {
    const todo = new Todo(req.body);
    todo.save((err, doc) => {
        if (err) return res.json({ success: false, error: err });
        res.status(200).json({
            success: true
        })
    })
})

// getting user's todos
app.get('/api/getItems', (req, res) => {
    try {
        let id = req.query.id;

        Todo.find({ cookieId: id }).exec((err, doc) => {
            if (err) return res.status(400).json({ success: false });
            res.json({
                Todos: doc
            })
        })
    }
    catch (err) {
        console.log(err)
    }

})

// updating todo 
app.get('/api/updatetodo', (req, res) => {
    let id = req.query.id;
    let action = req.query.action;
    Todo.findByIdAndUpdate(id, { isCompleted: action }, (err, user) => {
        if (err) return res.status(400).json({ success: false });
        res.json({
            success: true
        })
    })
})
// removing todo 
app.get('/api/removetodo', (req, res) => {
    let id = req.query.id;
    Todo.findByIdAndRemove(id, (err, user) => {
        if (err) return res.status(400).json({ success: false });
        res.json({
            success: true
        })
    })
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log("Server is running");
})