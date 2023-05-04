// Require necessary packages
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

// Define arrays to store team member data
const managerData = [];
const engineerData = [];
const internData = [];

// Define a function to prompt the manager for their data
function promptManager() {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: "What is the team manager's name?",
    },
    {
      type: 'input',
      name: 'id',
      message: "What is the team manager's employee ID?",
    },
    {
      type: 'input',
      name: 'email',
      message: "What is the team manager's email address?",
    },
    {
      type: 'input',
      name: 'officeNumber',
      message: "What is the team manager's office number?",
    },
  ]);
}

// Define a function to prompt the user for a new engineer
function promptEngineer() {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: "What is the engineer's name?",
    },
    {
      type: 'input',
      name: 'id',
      message: "What is the engineer's employee ID?",
    },
    {
      type: 'input',
      name: 'email',
      message: "What is the engineer's email address?",
    },
    {
      type: 'input',
      name: 'github',
      message: "What is the engineer's GitHub username?",
    },
  ]);
}

// Define a function to prompt the user for a new intern
function promptIntern() {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: "What is the intern's name?",
    },
    {
      type: 'input',
      name: 'id',
      message: "What is the intern's employee ID?",
    },
    {
      type: 'input',
      name: 'email',
      message: "What is the intern's email address?",
    },
    {
      type: 'input',
      name: 'school',
      message: "What is the intern's school?",
    },
  ]);
}

// Define a function to generate the HTML file
function generateHTML() {
  // Read the contents of the template file
  const templatePath = path.resolve(__dirname, 'template.html');
  const template = fs.readFileSync(templatePath, 'utf8');
  
  // Compile the template
  const compiledTemplate = Handlebars.compile(template);
  
  // Define data object for Handlebars
  const data = {
    manager: managerData[0],
    engineers: engineerData,
    interns: internData,
  };
  
  // Generate the HTML using the compiled template and data object
  const html = compiledTemplate(data);
  
  // Write the HTML file to disk
  const outputPath = path.resolve(__dirname, 'output.html');
  fs.writeFileSync(outputPath, html);
}

// Define a function to handle clicks on email addresses
function handleEmailClick(email) {
  const mailto = `mailto:${email}`;
  window.location.href = mailto;
}

// Define a function to handle clicks on GitHub usernames
function handleGitHubClick(username) {
  const url = `https://github.com/${username}`;
  window.open(url);
}

// Define a function to run the application
async function run() {
  try {
    // Prompt the user for the manager's data
     // Prompt the user for the manager's data
     const manager = await promptManager();
    
     // Add the manager's data to the managerData array
     managerData.push(manager);
     
     // Define a variable to keep track of whether the user is finished entering data
     let isFinished = false;
     
     // Keep prompting the user for data until they indicate that they are finished
     while (!isFinished) {
       // Prompt the user to select an option
       const response = await inquirer.prompt([
         {
           type: 'list',
           name: 'option',
           message: 'What would you like to do?',
           choices: [
             'Add an engineer',
             'Add an intern',
             'Finish building my team',
           ],
         },
       ]);
       
       // Handle the user's selection
       switch (response.option) {
         case 'Add an engineer':
           // Prompt the user for the engineer's data
           const engineer = await promptEngineer();
           
           // Add the engineer's data to the engineerData array
           engineerData.push(engineer);
           
           break;
           
         case 'Add an intern':
           // Prompt the user for the intern's data
           const intern = await promptIntern();
           
           // Add the intern's data to the internData array
           internData.push(intern);
           
           break;
           
         case 'Finish building my team':
           // Indicate that the user is finished entering data
           isFinished = true;
           
           break;
           
         default:
           // Handle an invalid selection
           console.error(`Invalid option: ${response.option}`);
           
           break;
       }
     }
     
     // Generate the HTML file
     generateHTML();
     
     // Log a message indicating that the HTML file was generated
     console.log('HTML file generated successfully.');
   } catch (err) {
     // Log any errors that occur during the application's execution
     console.error(err);
   }
 }
 
 // Call the run function to start the application
 run();