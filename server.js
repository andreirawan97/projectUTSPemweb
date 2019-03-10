const http = require('http');
const ngrok = require('ngrok');
const express = require('express');
const fs = require('fs');
const app = express();

const port = 8099;
const server = app.listen(port, (err) => {
  if (err) return console.log(`Uh oh, ${err}`);

  console.log(`The server is running on port ${port}`);
});

app.use(express.static(__dirname + '/public/'));

// Route Handling
app.get('/main.php', (req, res) => {
  fs.readFile('public/main.php', (err, pageRes) => {
    if (err) {
      res.writeHead(404);
      res.write('404 Bro');
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(pageRes);
    }

    res.end();
  });
});

app.get('/login.php', (req, res) => {
  fs.readFile('public/login.php', (err, pageRes) => {
    if (err) {
      res.writeHead(404);
      res.write('404 Bro');
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(pageRes);
    }

    res.end();
  });
});

app.get('/actions/loginAction.php', (req, res) => {
  fs.readFile('public/actions/loginAction.php', (err, pageRes) => {
    if (err) {
      res.writeHead(404);
      res.write('404 Bro');
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(pageRes);
    }

    res.end();
  });
});

// Make connection with ngrok
(async () => {
  const url = await ngrok.connect(port);

  console.log(`${url}`);
})();
