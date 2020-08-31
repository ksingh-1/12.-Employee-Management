const inquirer=require("inquirer");
const mysql=require("mysql");
const { start } = require("repl");

var connection=mysql.createConnection({
    host:"localhost",
    port:3000,
    user:"root",
    password:"",
    database: "employeetracker_db"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});


async function loadMainPrompts() {
    const { choice } = await prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          {
            name: "View All Employees:",
            value: "VIEW_EMPLOYEES"
          },
          {
            name: "View All Employees By Department:",
            value: "VIEW_EMP_BY_DEPARTMENT"
          },
          {
            name: "View All Employees By Manager:",
            value: "VIEW_EMP_BY_MANAGER"
          },
          {
            name: "Add An Employee:",
            value: "ADD_EMP"
          },
          {
            name: "Remove An Employee:",
            value: "REMOVE_EMP"
          },
          {
            name: "Update An Employee Role:",
            value: "UPDATE_EMP_ROLE"
          },
          {
            name: "Update An Employee Manager:",
            value: "UPDATE_EMP_MANAGER"
          },
          {
            name: "View All Employee Roles:",
            value: "VIEW_ROLES"
          },
          {
            name: "Add A Role:",
            value: "ADD_ROLE"
          },
          {
            name: "Remove A Role:",
            value: "REMOVE_ROLE"
          },
          {
            name: "View All Departments:",
            value: "VIEW_DEP"
          },
          {
            name: "Add A Department:",
            value: "ADD_DEP"
          },
          {
            name: "Remove A Department:",
            value: "REMOVE_DEP"
          },
          {
            name: "Quit",
            value: "QUIT"
          }
        ]
      }
    ]);
  
    // Call the appropriate function depending on what the user chose
    switch (choice) {
        case "VIEW_EMP":
            return viewEmployees();
        case "VIEW_EMP_BY_DEPARTMENT":
            return viewEmployeesByDepartment();
        case "VIEW_EMP_BY_MANAGER":
            return viewEmployeesByManager();
        case "ADD_EMP":
            return addEmployee();
        case "REMOVE_EMP":
                return removeEmployee();
        case "UPDATE_EMP_ROLE":
            return updateEmployeeRole();
        case "UPDATE_EMP_MANAGER":
            return updateEmployeeManager();
        case "VIEW_ROLES":
            return viewRoles();
        case "ADD_ROLE":
            return addRole();
        case "REMOVE_ROLE":
            return removeRole();
        case "VIEW_DEP":
            return viewDepartments();
        case "ADD_DEP":
            return addDepartment();
        case "REMOVE_DEP":
            return removeDepartment(); 
        default:
            return quit();
    }
  }
  