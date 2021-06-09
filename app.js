var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt-nodejs');

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
    secret: 'ambc@!vsmkv#!&*!#EDNAnsv#!$()_*#@',
    resave: false,
    saveUninitialized: true
}));


http.createServer(app).listen(
    app.get('port'),
        function(){
            console.log(
                'Express.js server listening on port' + app.get('port')
            );
        }
);

const users = [
    {
        user_id:'jinpyo0311',
        user_nickname:'홍삼',
        user_pwd:'********'
    },
    {
        user_id:'jinpyo311',
        user_nickname:'홍삼2',
        user_pwd:'********' 
    }
]

const findUser = (user_id,user_pwd) => {
    return users.find( v => (v.user_id === user_id && v.user_pwd === user_pwd));
};

const findUserIndex = (user_id,user_pwd) => {
    return users.findIndex( v => (v.user_id === user_id && v.user_pwd === user_pwd));
};

app.get('/',(req,res) => {
    const sess = req.session;
    res.render('index',{
        nickname: sess.user_uid+1 ? users[sess.user_uid]['user_nickname'] : ''
    });
});



app.get('/login',(req,res) => {
    res.render('includes/login');
});

app.post('/login', (req,res) => {
    const body = req.body;
    if( findUser(body.user_id, body.user_pwd)){
        req.session.user_uid = findUserIndex( body.user_id, body.user_pwd);
        res.redirect('/');
    }else{
        res.send('유효하지 않습니다');
    }
});

app.get('/logout',(req,res)=>{
    delete req.session.user_uid;
    res.redirect('/');
});
