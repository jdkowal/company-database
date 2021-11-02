const { prompt } = require("inquirer");
const db = require("./db/connection");
require("console.table");

function databaseQuestions() {
    prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View All Employees",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "View All Departments",
                    value: "VIEW_DEPARTMENTS"
                },
                {
                    name: "View All Roles",
                    value: "VIEW_ROLES"
                },
                {
                    name: "Add Employee",
                    value: "ADD_EMPLOYEE"
                },
                {
                    name: "Add Department",
                    value: "ADD_DEPARTMENT"
                },
                {
                    name: "Add Role",
                    value: "ADD_ROLE"
                },
                {
                    name: "Update Employee Role",
                    value: "UPDATE_EMPLOYEE_ROLE"
                },
                {
                    name: "Quit",
                    value: "QUIT"
                }
            ]
        }
    ])
        .then(response => {
            if (response.choice === "VIEW_EMPLOYEES") {
                viewAllEmployees();
            } else if (response.choice === "ADD_EMPLOYEE") {
                addEmployee();
            } else if (response.choice === "UPDATE_EMPLOYEE_ROLE") {
                updateEmployee();
            } else if (response.choice === "VIEW_ROLES") {
                roles();
            } else if (response.choice === "ADD_ROLE") {
                addRole();
            } else if (response.choice === "VIEW_DEPARTMENTS") {
                departments();
            } else if (response.choice === "ADD_DEPARTMENT") {
                addDepartment();
            } else {
                quit();
            }
        })
};

function quit() {
    console.log("You have successfully quit");
    process.exit();
};

function init() {
    console.log("Welcome to the employee database");
    databaseQuestions();
}

function viewAllEmployees() {
    db.query(`SELECT employee.id, employee.first_name, employee.last_name , role.title, department.name AS 'department', role.salary, CONCAT(manager.first_name, " " , manager.last_name) AS 'manager' FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id;`, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.table(res);
            databaseQuestions();
        }
    })
};

function addEmployee() {
    db.query(`SELECT role.id, role.title FROM role;`, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            const role = res.map(role => ({ name: role.title, value: role.id }));

            db.query(`SELECT manager.id, manager.first_name, manager.last_name FROM employee LEFT JOIN employee manager ON manager.id = employee.manager_id WHERE manager.id IS NOT NULL;`, (err, res) => {
                if (err) {
                    console.log(err)
                } else {
                    res.push({ first_name: "None", last_name: "", id: null });
                    const manager = res.map(manager => ({ name: manager.first_name + " " + manager.last_name, value: manager.id }));

                    prompt([
                        {
                            name: "first_name",
                            message: "What is the employee's first name?"
                        },
                        {
                            name: "last_name",
                            message: "What is the employee's last name?"
                        },
                        {
                            type: "list",
                            name: "role",
                            message: "What is the employee's role?",
                            choices: role
                        },
                        {
                            type: "list",
                            name: "manager",
                            message: "Who is the employee's manager?",
                            choices: manager
                        }
                    ])

                        .then(res => {
                            db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUE (?, ?, ?, ?)`, [res.first_name, res.last_name, res.role, res.manager], (err, res) => {
                                if (err) {
                                    console.log(err)
                                } else {
                                    databaseQuestions();
                                }
                            })
                        })
                }
            })
        }
    })
};

function updateEmployee() {
    db.query(`SELECT employee.id, first_name, last_name FROM employee;`, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            const employee = res.map(employee => ({ name: employee.first_name + " " + employee.last_name, value: employee.id }));

            db.query(`SELECT role.id, role.title FROM role;`, (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    const role = res.map(role => ({ name: role.title, value: role.id }));

                    prompt([
                        {
                            type: "list",
                            name: "employee",
                            message: "Which employee would you like to update?",
                            choices: employee
                        },
                        {
                            type: "list",
                            name: "role",
                            message: "What will be the employee's new role?",
                            choices: role
                        }
                    ])

                        .then(res => {
                            db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [res.role, res.employee], (err, res) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    databaseQuestions();
                                }
                            })
                        })
                }
            })
        }
    })
};

function roles() {
    db.query(`SELECT role.id, role.title, department.name, role.salary FROM role INNER JOIN department ON role.department_id = department.id;`, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.table(res);
            databaseQuestions();
        }
    });
};

function addRole() {
    db.query(`SELECT department.id, department.name FROM department;`, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            const depName = res.map(department => ({ name: department.name, value: department.id }));

            prompt([
                {
                    name: "title",
                    message: "What is the title of the role you would like to add?",
                },
                {
                    name: "salary",
                    message: "What is the salary of the role?",
                },
                {
                    type: "list",
                    name: "department",
                    message: "To which department does this role belong?",
                    choices: depName
                }
            ])

                .then(res => {
                    db.query("INSERT INTO role(title, salary, department_id) VALUE (?, ?, ?)", [res.title, res.salary, res.department], (err, res) => {
                        if (err) {
                            console.log(err);
                        } else {
                            databaseQuestions();
                        }
                    });
                })
        }
    })
};

function departments() {
    db.query(`SELECT department.id, department.name FROM department;`, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.table(res);
            databaseQuestions();
        }
    })
};

function addDepartment() {
    prompt([
        {
            name: "name",
            message: "What is the name of the department?"
        }
    ])

        .then(res => {
            db.query(`INSERT INTO department(name) VALUE (?)`, res.name, (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    databaseQuestions();
                }
            })
        })
};


function quit() {
    console.log("You have successfully quit");
    process.exit();
};

function init() {
    console.log("Welcome to the employee database");
    databaseQuestions();
}

init();