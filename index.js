const fetch = require("isomorphic-unfetch");
const chalk = require("chalk");

const log = console.log;

let results = [];
let errors = [];
module.exports = async (URL_EVEN, NUM_REQUESTS, URL_ODD) => {
  for (i = 0; i < parseInt(NUM_REQUESTS); i++) {
    if (i % 2) {
      const res = await fetch(URL_EVEN);
      const responseObject = await res.json();

      if (res.ok && responseObject.length > 0) {
        log(chalk.green("SUCCESS"));
        log(chalk.blue.underline("Number: ", i + 1));
        results.push(responseObject);
      } else {
        log(chalk.red.bold.underline("REQUEST FAILED: ", responseObject));
        errors.push(responseObject);
      }
    } else {
      const res = await fetch(URL_ODD ? URL_ODD : URL_EVEN);
      const responseObject = await res.json();

      if (res.ok && responseObject.length > 0) {
        log(chalk.green("SUCCESS"));
        log(chalk.blue.underline("Number: ", i + 1));
        results.push(responseObject);
      } else {
        log(chalk.red.bold.underline("REQUEST FAILED: ", responseObject));
        errors.push(responseObject);
      }
    }
  }

  if (results.length > 0) {
    log(chalk.yellow("All result objects: ", results));
    log(
      chalk.magenta.underline.bold(
        "All requests succeeded. Total requests made: ",
        results.length
      )
    );
  }

  if (errors.length > 0) {
    log(chalk.red.bold.underline("FAILED REQUESTS: ", errors));
    log(chalk.red.bold.underline("Number of failed requests: ", errors.length));
  }
};
