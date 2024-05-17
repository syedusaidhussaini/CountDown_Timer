#! /usr/bin/env node
import { differenceInSeconds } from 'date-fns';
import inquirer from 'inquirer';
import chalk from 'chalk';
console.log(chalk.blue("** WELCOME TO TYPESCRIPT COUNTDOWN TIMER**:"));
const reveal = await inquirer.prompt([{
        name: "userInput",
        type: "number",
        message: chalk.yellow.bgBlack("Please enter your countdown timer.."),
        validate: (input) => {
            if (isNaN(input)) {
                return chalk.yellow.bgBlack("Please enter a valid numbr");
            }
            else if (input >= 60 || input <= 0) {
                return chalk.yellow.bgBlack("Seconds within 0 - 59 sec");
            }
            else {
                return true;
            }
        }
    }]);
let input = reveal.userInput;
function startTime(val) {
    const intTime = new Date().setSeconds(new Date().getSeconds() + val + 2);
    const intervalTime = new Date(intTime);
    setInterval(() => {
        const currentTime = new Date();
        const timeDiff = differenceInSeconds(intervalTime, currentTime);
        if (timeDiff <= 0) {
            console.log(chalk.yellow.bgBlack("Time has expired"));
            process.exit();
        }
        const min = Math.floor((timeDiff % (3600 * 24)) / 3600);
        const sec = Math.floor(timeDiff % 60);
        console.log(`${min.toString().padStart(2, "0")}: ${sec.toString().padStart(2, "0")}}`);
    }, 1000);
}
startTime(input);
