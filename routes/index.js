var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
// check connection

db.once('open',function () {
    console.log('Conected to database');

});
var Schema = mongoose.Schema;

var TASKSchema = new Schema(
    {
        text: {type: String, required: true},
        status: {type: Boolean, required:true}
    } );

var task = mongoose.model('TASK', TASKSchema);


//check for db errors
db.on('error',function (err) {
    console.log(err);

});
/* GET home page. */
router.get('/', function(req, res, next) {

    task.find().then(function(doc)
    {
            task.count({status:false},function (err,co) {
                res.render('index',{items:doc,coun:co});

            })
            });
});
router.post('/save', function(req, res, next) {
var a = new task();
a.text = req.body.tas;
a.status = false;

a.save();

res.redirect('/');
});
router.get('/update/:id', function(req, res, next) {
    var id = req.params.id;

    task.findById(id, function(err, doc) {

        doc.status = !doc.status;

        doc.save();
    })
    res.redirect('/');
});
router.get('/delete/:id', function(req, res, next) {
    var id = req.params.id;

    // var id = req.body.id;
    task.findByIdAndRemove(id).exec();
    res.redirect('/');
});
router.get('/complete', function(req, res, next) {


        task.remove({status:true}).exec();

            res.redirect('/');

    });

router.get('/justcompleted',function(req,res,next) {
    task.find({status:true}).then(function(doc)
{
        res.render('index',{items:doc});

});
});

router.get('/active' ,function(req,res,next) {
    task.find({status:false}).then(function(doc){
        res.render('index',{items:doc});
    });
});
router.post('/UPL', function(req, res, next) {

    task.findById(req.body.id, function(err, doc) {

        doc.text = req.body.tash ;

        doc.save();
    })
    res.redirect('/');
});


    router.get('/pleaset', function(req, res, next) {

        res.redirect('/');
    });
    router.get('/pleasef', function(req, res, next) {

        res.redirect('/');

});

module.exports = router;
