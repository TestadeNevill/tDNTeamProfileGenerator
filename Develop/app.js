const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const allMembers = [];

function newMember() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "member",
        message: "Which role has the new member?",
        choices: ["Manager", "Engineer", "Intern", "No more members"],
      },
    ])
    .then(info => {
      if (info.member === "Manager") {
        managerInfo();
      } else if (info.member === "Engineer") {
        engineerInfo();
      } else if (info.member === "Intern") {
        internInfo();
      } else if (info.member === "No more members") {
        generateHTML(outputPath, render(allMembers));
      }
    });
}

function managerInfo() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter your name",
      },
      {
        type: "input",
        name: "id",
        message: "Enter your id",
      },
      {
        type: "input",
        name: "email",
        message: "Enter your email",
      },
      {
        type: "input",
        name: "officeNumber",
        message: "Enter your office number",
      },
    ])
    .then(answers => {
      let manager = new Manager(
        answers.name,
        answers.id,
        answers.email,
        answers.officeNumber
      );
      allMembers.push(manager);
      newMember();
    });
}

function engineerInfo() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter member's name",
      },
      {
        type: "input",
        name: "id",
        message: "Enter member's ID number",
      },
      {
        type: "input",
        name: "email",
        message: "Enter member's email",
      },
      {
        type: "input",
        name: "github",
        message: "Enter member's GitHub username",
      },
    ])
    .then(answers => {
      let engineer = new Engineer(
        answers.name,
        answers.id,
        answers.email,
        answers.github
      );
      allMembers.push(engineer);
      newMember();
    });
}

function internInfo() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter member's name",
      },
      {
        type: "input",
        name: "id",
        message: "Enter member's ID number",
      },
      {
        type: "input",
        name: "email",
        message: "Enter member's email",
      },
      {
        type: "input",
        name: "school",
        message: "Enter member's school",
      },
    ])
    .then(answers => {
      let intern = new Intern(
        answers.name,
        answers.id,
        answers.email,
        answers.school
      );
      allMembers.push(intern);
      newMember();
    });
}

function generateHTML() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }
  fs.writeFileSync(outputPath, render(allMembers), "utf-8");
  console.log("Your team is complete!");
}

newMember();