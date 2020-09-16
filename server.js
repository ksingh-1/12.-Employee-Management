const inquirer = require("inquirer");
let Database = require("./async-db");
let cTable = require("console.table");
//Defined Variables
//Creates And Updates The Table Set Up in MySQL
const db = new Database({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employeeDB"
  });
//Function To Get Manager Names
async function getManagerNames() {
    let query = "SELECT * FROM employee WHERE manager_id IS NULL";

    const rows = await db.query(query);
    //Defines How Employee Names Are Perceived
    let employeeNames = [];
    for(const employee of rows) {
        employeeNames.push(employee.first_name + " " + employee.last_name);
    }
    return employeeNames;
}
//Function For Getting Roles of Employees
async function getRoles() {
    let query = "SELECT position FROM role";
    const rows = await db.query(query);

    let roles = [];
    for(const row of rows) {
        roles.push(row.position);
    }

    return roles;
}
//Function Gets Department Names
async function getDepartmentNames() {
    let query = "SELECT name FROM department";
    const rows = await db.query(query);

    let departments = [];
    for(const row of rows) {
        departments.push(row.name);
    }

    return departments;
}
//Department Name Brings Back What Department ID It Is
async function getDepartmentId(departmentName) {
    let query = "SELECT * FROM department WHERE department.name=?";
    let args = [departmentName];
    const rows = await db.query(query, args);
    return rows[0].id;
}
//Returns The Role ID Associated With The Corresponding Role Name
async function getRoleId(roleName) {
    let query = "SELECT * FROM role WHERE role.position=?";
    let args = [roleName];
    const rows = await db.query(query, args);
    return rows[0].id;
}
//Returns Employee ID Corresponding To The Employee's Full Name
async function getEmployeeId(fullName) {
    let employee = getFirstAndLastName(fullName);

    let query = 'SELECT id FROM employee WHERE employee.first_name=? AND employee.last_name=?';
    let args=[employee[0], employee[1]];
    const rows = await db.query(query, args);
    return rows[0].id;
}
//Function Gets Employee's Names
async function getEmployeeNames() {
    let query = "SELECT * FROM employee";

    const rows = await db.query(query);
    let employeeNames = [];
    for(const employee of rows) {
        employeeNames.push(employee.first_name + " " + employee.last_name);
    }
    return employeeNames;
}
//Function Allows User To View All Roles
async function viewAllRoles() {
    console.log("");
  
    let query = "SELECT * FROM role";
    const rows = await db.query(query);
    console.table(rows);
    return rows;
}
//Function Allows User To View All Departments
async function viewAllDepartments() {

    let query = "SELECT * FROM department";
    const rows = await db.query(query);
    console.table(rows);
}
//Function To View All Employees
async function viewAllEmployees() {
    console.log("");
    let query = "SELECT * FROM employee";
    const rows = await db.query(query);
    console.table(rows);
}
//Function To View All Employees By Department
async function viewAllEmployeesByDepartment() {
    console.log("");
    let query = "SELECT first_name, last_name, department.name FROM ((employee INNER JOIN role ON role_id = role.id) INNER JOIN department ON department_id = department.id);";
    const rows = await db.query(query);
    console.table(rows);
}

//Function To Get First And Last Name To Create Full Name
function getFirstAndLastName( fullName ) {
    let employee = fullName.split(" ");
    if(employee.length == 2) {
        return employee;
    }
//
    const last_name = employee[employee.length-1];
    let first_name = " ";
    for(let i=0; i<employee.length-1; i++) {
        first_name = first_name + employee[i] + " ";
    }
    return [first_name.trim(), last_name];
}
//Function Allows Update of Employee Role
async function updateEmployeeRole(employeeInfo) {
    const roleId = await getRoleId(employeeInfo.role);
    const employee = getFirstAndLastName(employeeInfo.employeeName);

    let query = 'UPDATE employee SET role_id=? WHERE employee.first_name=? AND employee.last_name=?';
    let args=[roleId, employee[0], employee[1]];
    const rows = await db.query(query, args);
    console.log(`Updated employee ${employee[0]} ${employee[1]} with role ${employeeInfo.role}`);
}
//Function That Allows User To Add Employee
async function addEmployee(employeeInfo) {
    let roleId = await getRoleId(employeeInfo.role);
    let managerId = await getEmployeeId(employeeInfo.manager);

    let query = "INSERT into employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)";
    let args = [employeeInfo.first_name, employeeInfo.last_name, roleId, managerId];
    const rows = await db.query(query, args);
    console.log(`Added employee ${employeeInfo.first_name} ${employeeInfo.last_name}.`);
}
//Function That Allows User To Remove Employees
async function removeEmployee(employeeInfo) {
    const employeeName = getFirstAndLastName(employeeInfo.employeeName);
    let query = "DELETE from employee WHERE first_name=? AND last_name=?";
    let args = [employeeName[0], employeeName[1]];
    const rows = await db.query(query, args);
    console.log(`Employee removed: ${employeeName[0]} ${employeeName[1]}`);
}
//Function That Allows User To Add A Department
async function addDepartment(departmentInfo) {
    const departmentName = departmentInfo.departmentName;
    let query = 'INSERT into department (name) VALUES (?)';
    let args = [departmentName];
    const rows = await db.query(query, args);
    console.log(`Added department named ${departmentName}`);
}
//Function That Allows User To Add A Role
async function addRole(roleInfo) {
    const departmentId = await getDepartmentId(roleInfo.departmentName);
    const salary = roleInfo.salary;
    const position = roleInfo.roleName;
    let query = 'INSERT into role (position, salary, department_id) VALUES (?,?,?)';
    let args = [position, salary, departmentId];
    const rows = await db.query(query, args);
    console.log(`Added role ${position}`);
}
//Function That Asks The User What They Would Like To Do
async function mainPrompt() {
    return inquirer
        .prompt([
            {
                name: "action",
                type: "list",
                message: "What Would You Like To Do?",
                choices: [
                  "Add A Department",
                  "Add An Employee",
                  "Add An Employee Role",
                  "Remove An Employee",
                  "Update An Employee Role",
                  "View All Departments",
                  "View All Employees",
                  "View All Employees By Department",
                  "View All Roles",
                  "Exit"
                ]
            }
        ])
}
//Function That Gets Employee Info
async function getAddEmployeeInfo() {
    const managers = await getManagerNames();
    const roles = await getRoles();
    return inquirer
        .prompt([
            {
                name: "first_name",
                type: "input",
                message: "What's The Employee's First Name?"
            },
            {
                name: "last_name",
                type: "input",
                message: "What's The Employee's Last Name?"
            },
            {
                name: "role",
                type: "list",
                message: "What's The Employee's Role?",
                choices: [
                    ...roles
                ]
            },
            {
                name: "manager",
                type: "list",
                message: "Who's The Employee's Manager?",
                choices: [
                    ...managers
                ]
            }
        ])
}
//Function That Gets Employee Info And Asks What Employee Needs To Be Removed
async function getRemoveEmployeeInfo() {
    const employees = await getEmployeeNames();
    return inquirer
    .prompt([
        {
            name: "employeeName",
            type: "list",
            message: "Which Employee Needs To Be Removed?",
            choices: [
                ...employees
            ]
        }
    ])
}
//Function That Gets Department Information And Add A New Department
async function getDepartmentInfo() {
    return inquirer
    .prompt([
        {
            name: "departmentName",
            type: "input",
            message: "What's The New Department's Name?"
        }
    ])
}
//Function That Gets Role Information And Allows User To Input New Role
async function getRoleInfo() {
    const departments = await getDepartmentNames();
    return inquirer
    .prompt([
        {
            name: "roleName",
            type: "input",
            message: "What's The Title/Position Of The New Role'?",

        },
        {
            name: "salary",
            type: "input",
            message: "What's The New Role's Salary?"
        },
        {
            name: "departmentName",
            type: "list",
            message: "What Department Uses This Role?",
            choices: [
                ...departments
            ]
        }
    ])
}
////Function That Gets Employee Role Information And Allows User To Update It
async function getUpdateEmployeeRoleInfo() {
    const employees = await getEmployeeNames();
    const roles = await getRoles();
    return inquirer
        .prompt([
            {
                name: "employeeName",
                type: "list",
                message: "Which Employee Do You Want To Update?",
                choices: [
                    ...employees
                ]
            },
            {
                name: "role",
                type: "list",
                message: "What's The Employee's New Role?",
                choices: [
                    ...roles
                ]
            }
        ])

}
//Function Goes Back To Main Questions List
async function main() {
    let exitLoop = false;
    while(!exitLoop) {
        const prompt = await mainPrompt();

        switch(prompt.action) {
            case 'Add department': {
                const newDepartmentName = await getDepartmentInfo();
                await addDepartment(newDepartmentName);
                break;
            }

            case 'Add employee': {
                const newEmployee = await getAddEmployeeInfo();
                console.log("add an employee");
                console.log(newEmployee);
                await addEmployee(newEmployee);
                break;
            }

            case 'Add role': {
                const newRole = await getRoleInfo();
                console.log("add a role");
                await addRole(newRole);
                break;
            }

            case 'Remove employee': {
                const employee = await getRemoveEmployeeInfo();
                await removeEmployee(employee);
                break;
            }
            
            case 'Update employee role': {
                const employee = await getUpdateEmployeeRoleInfo();
                await updateEmployeeRole(employee);
                break;
            }

            case 'View all departments': {
                await viewAllDepartments();
                break;
            }

            case 'View all employees': {
                await viewAllEmployees();
                break;
            }

            case 'View all employees by department': {
                await viewAllEmployeesByDepartment();
                break;
            }

            case 'View all roles': {
                await viewAllRoles();
                break;
            }

            case 'Exit': {
                exitLoop = true;
                process.exit(0); 
                return;
            }

            default:
                console.log(`Internal warning. Shouldn't get here. action was ${prompt.action}`);
        }
    }
}
//Exit 
process.on("exit", async function(code) {
    await db.close();
    return console.log(`About to exit with code ${code}`);
});

main();