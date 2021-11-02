
INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 001),
        ("Salesperson", 80000, 001),
        ("Lead Engineer", 150000, 002),
        ("Software Engineer", 120000, 002),
        ("Account Manager", 160000, 003),
        ("Accountant", 125000, 003),
        ("Legal Team Lead", 250000, 004),
        ("Lawyer", 190000, 004);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Will","Thompson", 001, NULL),
        ("Dan","McDonugh", 002, 001),
        ("Dylan","Hueltt", 003, NULL),
        ("Brett","Rositer", 004, 003),
        ("Tom","Conway", 005, NULL),
        ("Bill","Andrews", 006, 005),
        ("Brian","Myers", 007, NULL),
        ("Andrew","Smykowski", 008, 007);
