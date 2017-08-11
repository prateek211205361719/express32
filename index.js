
var express = require('express');
var hbs = require('hbs');
hbs.registerHelper('handleCheckbox', function(val){
    return (val ? 'checked' : '');

});

var bodyParser = require('body-parser');
var { mongoose } = require('./config/mongoose');
var { Todo } = require('./model/todo');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname+'/public'));
app.set('view engine', hbs);


app.post('/todo/:id', function(req, res){
    req.body.completed = req.body.completed ? true : false;;
    Todo.findByIdAndUpdate(req.params.id,  req.body).then((result) => {
         res.redirect('/');
    }, (err) => {
         res.status(400).send(err);
    });
   
});

app.get('/', (req, res) => {
    Todo.find().then((result) => {
        res.render('home.hbs',{
            result
        });
    }, (err) => {
        res.status(400).send(err);
    });
    
});

app.get('/todo', function(req, res){
      res.render('edit.hbs');
});
app.post('/todo', function(req, res){
   var todo = new Todo(req.body);
   todo.save().then((result) => {
      res.redirect('/');
   }, (err) => {
      res.send(err);
   });
});

app.get('/todo/:id', function(req, res){
    Todo.findById(req.params.id).then((result) => {
         res.render('edit.hbs', {
             result
         });
    }, () => {

    });
    
});

app.get('/deleteTodo/:id', function(req, res){
    Todo.findByIdAndRemove(req.params.id).then((result) => {
        res.redirect('/');
    }, (err) => {

    });
    
});

app.listen(3000, function(){{
    console.log('------hello-------');
}});