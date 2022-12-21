// Imports
const express = require('express');
const app = express();
const path = require("path");


    // Used to view a html file
    app.use(express.static(path.join(__dirname,'views')))
    app.get('/',(req,res)=>{
        res.sendFile('index.html')
        
    })

    // Routing to other pages
    // Employee page
    app.get('/employees', (req, res) => {

        // Employees to be shown
        const employees = [
            { id: 1, name: 'John', role: 'Manager', salary: 50000 },    
            { id: 2, name: 'Jane', role: 'Developer', salary: 60000 },    
            { id: 3, name: 'Bob', role: 'Salesperson', salary: 40000 }  
        ];
      
        // Link to styles.css
        let table = '<table style="border: 2px solid black; width: 100%; background-color: lightblue; border-collapse: collapse">';
        table += '<tr><th style="border: 1px solid black;">ID</th><th style="border: 1px solid black;">Name</th><th style="border: 1px solid black;">Role</th><th style="border: 1px solid black;">Salary</th><th style="border: 1px solid black;">Update</th></tr>';
        
        employees.forEach(employee => {
            table += `<tr><td style="border: 1px solid black;">${employee.id}</td><td style="border: 1px solid black;">${employee.name}</td><td style="border: 1px solid black;">${employee.role}</td><td style="border: 1px solid black;">${employee.salary}</td><td style="border: 1px solid black;"><button onclick="updateEmployee(${employee.id})">Update</button></td></tr>`;
        });

        table += '</table>';
        
        res.send(table);
      });
    
    app.get('/departments', (req, res) => {
        res.send('This is the departments page.');
    });

    app.get('/employeesMDB', (req, res) => {
        res.send('This is the employees (MongoDB) page.');
    });




    app.listen(3000, () => {
    console.log('Application listening on port 3000');
    });



    function updateEmployee(id) {
        // Your code to update the employee with the given ID goes here

      }