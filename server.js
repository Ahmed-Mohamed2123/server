const nodemailer = require('nodemailer');
var express = require('express');
var app = express();
var port = process.env.PORT || 3002;

var auth = {
  type: 'oauth2',
  user: 'ahmedshabana646@gmail.com',
  clientId: '1023684869024-bgd8i5o5e6pnf0aqm43epqasjlveei1s.apps.googleusercontent.com',
  clientSecret: 'ISXWj6A7QsupcVHIDVhXxUSc',
  refreshToken: '1//048z6EEizSDn2CgYIARAAGAQSNwF-L9IrIMNfTP5JvRt3bFp1ZmlBywabUpNJol__6BcPePgtYh3wTYTTdlhksTvu_l6qhvGFUQg',
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.multipart());

app.use((req, res, next) =>  {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/send', (req, res) =>{
  response = {
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
  }
  
  
  var mailOptions = {
      from: req.body.name,
      to: 'ahmedshabana646@gmail.com',
      subject: 'My site contact from: ' + req.body.name,
      text: req.body.message,
      html: 'Message from: ' + req.body.name + '<br></br> Email: ' +  req.body.email + '<br></br> Message: ' + req.body.message
  };
var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: auth,
  });
transporter.sendMail(mailOptions, (err, res) => {
      if (err) {
          return console.log(err);
      } else {
          console.log('success');
      }
  });
})
// start the server
app.listen(port);

