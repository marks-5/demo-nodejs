'use strict';

const timeout = 500
const welcome_message = "Hello MrCooper!"

const express = require('express');
const app = express();
const promBundle = require('express-prom-bundle');

app.use(require('express-bunyan-logger')());

// here we want to remove default metrics provided in prom-client
// this must be done before initializing promBundle
clearInterval(promBundle.promClient.collectDefaultMetrics());
promBundle.promClient.register.clear();

const bundle = promBundle({
  buckets: [0.1, 0.4, 0.7],
  includeMethod: true,
  includePath: true
});

app.use(bundle);

// native prom-client metric (no prefix)
const c1 = new bundle.promClient.Counter('c1', 'c1 help');
c1.inc(10);

app.get('/', (req, res) => {
  setTimeout(() => {
    res.send(welcome_message + '\n');
  }, timeout);
});

// Show 'APP' environment variables
app.get('/env', (req, res) => {
  var app_envs = {};

  Object.keys(process.env).forEach(function(key) {
    if (key.lastIndexOf('APP_', 0) === 0) {
      app_envs[key] = process.env[key];
    }
  });

  setTimeout(() => {
    res.send(app_envs);
  }, timeout);
});

app.get('/foo/:id', (req, res) => {
  setTimeout(() => {
    res.send('foo response\n');
  }, timeout);
});

app.delete('/foo/:id', (req, res) => {
  setTimeout(() => {
    res.send('foo deleted\n');
  }, timeout);
});

app.get('/bar', (req, res) => res.send('bar response\n'));

app.listen(5000, () => console.info( // eslint-disable-line
));

process.on("SIGINT", function() {
  console.log('CLOSING process on [SIGINT]');
  process.exit();
} );
