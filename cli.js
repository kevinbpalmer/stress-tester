#!/usr/bin/env node
const chalk = require("chalk");
const checkRedirects = require("./index");
const [, , URL_EVEN, NUM_REQUESTS, URL_ODD] = process.argv;

if (!URL_EVEN) {
  return console.log(
    chalk.red.bold.underline(
      "Please provide a url you would like to stress test with repeated requests. E.g. https://example.com"
    )
  );
}

if (!NUM_REQUESTS || typeof parseInt(NUM_REQUESTS) !== "number") {
  return console.log(
    chalk.red.bold.underline(
      "Please provide the number of requests you would like to make to stress test. E.g. 10000"
    )
  );
}

checkRedirects(URL_EVEN, NUM_REQUESTS, URL_ODD);
