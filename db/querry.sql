-- view all employees 
-- SELECT 
--     employee.id, employee.first_name, employee.last_name , role.title, department.name AS 'department', role.salary, CONCAT(manager.first_name, " " , manager.last_name) AS 'manager'
--     FROM employee LEFT JOIN role ON employee.role_id = role.id
--     LEFT JOIN department ON role.department_id = department.id
--     LEFT JOIN employee manager ON manager.id = employee.manager_id && department.id;

--view all roles
-- SELECT 
--     role.id, role.title, department.name, role.salary FROM role INNER JOIN department ON role.department_id = department.id;

-- view all departments 
-- SELECT 
--     department.id, department.name FROM department;

--add employee
-- SELECT 
--     role.id, role.title FROM role;

-- SELECT 
--     manager.id, manager.first_name, manager.last_name 
--     FROM employee 
--     LEFT JOIN employee manager ON manager.id = employee.manager_id 
--     WHERE manager.id IS NOT NULL;

-- INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUE 