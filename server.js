const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use('/public', express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/static', express.static('static'));


//  all the data will be stored in the array whenever the server will work  //
let arr = [];
var index = 1;

app.get('', (req, resp) => {
    resp.sendfile('./static/index.html');
})


app.post('/set', (req, resp) => {
   
    arr[index] = req.body.url;
    // const shorted_url = { "url": `${req.rawHeaders[1]}/a${index}`, "given_url": arr[index++] };
    const shorted_url = { "url": `https://nice-pear-cape-buffalo-vest.cyclic.app/a${index}`, "given_url": arr[index++] };
    resp.render('shorted-url', shorted_url);

    console.log([req.body.url, shorted_url.url]);
})

app.get('/a*', (req, resp) => {
    var x = req.url.replace('/a', '');
    if (arr[x] == undefined) {
        resp.send("<h1>Shorted URL is not found in the Database</h1>");
    }
    else
        resp.redirect(arr[x]);
})

app.listen(5000);