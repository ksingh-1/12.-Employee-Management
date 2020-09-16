USE employeeDB;

INSERT INTO department (name) VALUES("Management");
INSERT INTO department (name) VALUES("Service");
INSERT INTO department (name) VALUES("Restaurant");
INSERT INTO department (name) VALUES("Maintenance");


INSERT INTO role (position, salary, department_id) VALUES("Manager", 90000.00, 1);
INSERT INTO role (position, salary, department_id) VALUES("Assistant Manager", 60000.00, 1);
INSERT INTO role (position, salary, department_id) VALUES("Front Desk", 44000.00, 2);
INSERT INTO role (position, salary, department_id) VALUES("Maintenance", 70000.00, 4);
INSERT INTO role (position, salary, department_id) VALUES("Housekeeper", 35000.00, 2);
INSERT INTO role (position, salary, department_id) VALUES("Technician", 40000.00, 4);
INSERT INTO role (position, salary, department_id) VALUES("Cashier", 30000.00, 3);
INSERT INTO role (position, salary, department_id) VALUES("Cook", 32000.00, 3);
INSERT INTO role (position, salary, department_id) VALUES("Pool Tech", 20000, 2);
INSERT INTO role (position, salary, department_id) VALUES("Landscaper", 25000.00, 2);
INSERT INTO role (position, salary, department_id) VALUES("Electrician", 39000.00, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES("KP", "Singh", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES("Shane", "Reynolds", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES("Allen", "Bradley", 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES("Michelle", "Stevenson", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES("Norman", "Cates", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES("James", "Preston", 7, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES("Robert", "DeMuro", 6, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES("Paul", "Wize", 9, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES("Jason", "Anders", 4, 3);