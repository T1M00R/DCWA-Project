// Imports
const express = require('express');
const app = express();
const path = require("path");
const mysql = require('mysql');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;



    //#region Database Connections

    // Database configuration
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',      // username root
        password: '',      // password blank
        // port: 3306,     // default port
        database: 'proj2022'
    });

    // Handles connecting to the database
    function connectToDatabase(){
        // Connect to database when home page is loaded
        connection.connect(function(err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }
            console.log('connected as id ' + connection.threadId);
            });
    }

    //#endregion

    // Use body-parser middleware to parse request bodies
    app.use(bodyParser.urlencoded({ extended: true }));

    // Used to view a html file
    app.use(express.static(path.join(__dirname,'views')));

    app.get('/',(req,res)=>{
        connectToDatabase();
        // Load index.html file


        res.sendFile('views/index.html');
    })

    //#region Employees SQL

    app.get('/employees', (req, res) => {

        //connectToDatabase();

        var queryString = "select * from employee";

        // Retrieve employees from database
        connection.query(queryString, (error, results) => {
            if (error) {
                console.error(error);
                res.send('Error retrieving employees from database.');
                return;
            } else {
                // If query successful => output to table
                
                // Create an HTML table from the query results
    
                // CSS
                let table = '<table style="border: 2px solid black; width: 100%; background-color: lightblue; border-collapse: separate"; >';

                table +=    "<head>" +
                            "<title>Employees</title>" +
                            "<h1>Employees</h1>"+
                            "</head>";
                table += '<tr style="border: 2px solid black;"><th style="border: 2px solid black;">EID</th><th style="border: 2px solid black;">Name</th><th style="border: 2px solid black;">Role</th><th style="border: 2px solid black;">Salary</th><th style="border: 2px solid black;">Update</th></tr>';

                // Create the table
                for (var i = 0; i < results.length; i++) {
                    table += '<tr style="border: 2px solid black;">';
                    table += '<td style="border: 2px solid black;">' + results[i].eid + '</td>';
                    table += '<td style="border: 2px solid black;">' + results[i].ename + '</td>';
                    table += '<td style="border: 2px solid black;">' + results[i].role + '</td>';
                    table += '<td style="border: 2px solid black;">' + results[i].salary + '</td>';
                    table += '<td style="border: 2px solid black;"><a href="http://localhost:3000/employee/edit/' + results[i].eid + '">Update</a></td>';
                    table += '</tr>';
                }
                table += '</table>';
                
                // Homepage link underneath table
                table += "<a href=\"http://localhost:3000/\">Home</a>"  
                // Send the table as a response to the client
                res.send(table);
            
            }
        });
    });
      
    // Open edit employee page 
    app.get('/employee/edit/:eid', (req, res)=>{

        //connectToDatabase();

        // Get value from url parameters
        var eid = req.params.eid;

        // sql query to get employee data
        var queryString = "select * from employee where eid = ?";

        // Query to fetch data
        connection.query(queryString, eid, (error, results) => {
           if (error) {
               console.error(error);
               res.status(500).send('Error retrieving employee from database.');
               return;
           } else {

            // console.log(results);

                // put results into a data array 
                var data = [results[0].ename, results[0].role, results[0].salary, results[0].eid];

                // Use results to get values
                var editEmployeeForm = "" + 
                        "<head>" +
                        "<title>Employee edit</title>" +
                        "</head>" +
                        "<body>" + 
                        "        <h1>Edit Employee</h1>" + 
                        "    <div>" + 
                        "        <form action=\"/update-record-sql\" method=\"post\">" + 
                        "            <h3>EID</h3>" + 
                        "            <input type=\"text\" id=\"eidInput\" name=\"eid\" value="+data[3]+" readonly=true required=true><br>" + 
                        "            <h3>Name</h3><p>Name should be a minimum of 5 characters.</p>" + 
                        "            <input type=\"text\" id=\"nameInput\" name=\"ename\" value="+data[0]+" minlength=5 required=true><br>" + 
                        "            <h3>Role</h3><p>Role should be Manager or Employee.</p>" + 
                        "            <input type=\"text\" id=\"roleInput\" name=\"role\" value="+data[1]+" required=true pattern='Employee|Manager' title='Enter Employee or Manager '><br>" + 
                        "            <h3>Salary</h3><p>Salary should be > 0.</p>" + 
                        "            <input type=\"text\" id=\"salaryInput\" name=\"salary\" value="+data[2]+" required=true min=1><br>" + 
                        "            <br>" + 
                        "            <button onclick=\"updateEmployee("+data+")\">Update</button>" + 
                        "            <br>" + 
                        "            " + 
                        "        </form>" + 
                        "        " + 
                        "        <a href=\"http://localhost:3000/\">Home</a>" + 
                        "    </div>" + 
                        "    " + 
                        "  </body>" + 
                        "";

            // Send the form to the web page
            res.send(editEmployeeForm);
           }
       });
    });

    // Route to handle form submission
    app.post('/update-record-sql', (req, res) => {

        // Get the values from the form's text boxes
        var eid = req.body.eid;

        var ename = req.body.ename;

        var role = req.body.role;

        var salary = req.body.salary;
        

        // Update the record in the database using the values from the form
        updateEmployee(eid, ename, role, salary);

        // Send back to employees page
        res.redirect('/employees');
    }); 


    // Update employee function
    function updateEmployee(eid, ename, role, salary){

        console.log("Updating: " + eid);

        // test
        // console.log(data);
        // return;

        var queryString = "UPDATE employee SET ename = ?, role = ?, salary = ? WHERE eid = ?";

        // Update with new data
         connection.query(queryString, [ename, role, salary, eid],(error, results) => {
            if (error) {
                console.error(error);
                res.status(500).send('Error updating employee in database.');
                // return;
            } else {
                console.log("Succesfully updated employee");
                console.log(results);
            }
        });
        
    }
    //#endregion


    //#region Departments

    app.get('/departments', (req, res) => {
        

        var queryString = "select * from dept";

        // Retrieve employees from database
        connection.query(queryString, (error, results) => {
            if (error) {
                console.error(error);
                res.send('Error retrieving employees from database.');
                return;
            } else {
                // If query successful => output to table
                
                // Create an HTML table from the query results
    
                // CSS
                let table = '<table style="border: 2px solid black; width: 100%; background-color: lightblue; border-collapse: separate"; >';

                table +=    "<head>" +
                            "<title>Departments</title>" +
                            "<h1>Departments</h1>"+
                            "</head>";
                table += '<tr style="border: 2px solid black;"><th style="border: 2px solid black;">DID</th><th style="border: 2px solid black;">Name</th><th style="border: 2px solid black;">Budget</th><th style="border: 2px solid black;">Location</th><th style="border: 2px solid black;">Delete</th></tr>';

                // Create the table
                for (var i = 0; i < results.length; i++) {
                    table += '<tr style="border: 2px solid black;">';
                    table += '<td style="border: 2px solid black;">' + results[i].did + '</td>';
                    table += '<td style="border: 2px solid black;">' + results[i].dname + '</td>';
                    table += '<td style="border: 2px solid black;">' + results[i].budget + '</td>';
                    table += '<td style="border: 2px solid black;">' + results[i].lid + '</td>';
                    table += '<td style="border: 2px solid black;"><a href="http://localhost:3000/departments/delete/' + results[i].did + '">Delete</a></td>';
                    table += '</tr>';
                }
                
                table += '</table>';

                // Link to homepage
                table += "<a href=\"http://localhost:3000/\">Home</a>"  

                // Send the table as a response to the client
                res.send(table);
            
            }
        });

    });

    // Open department delete page 
    app.get('/departments/delete/:did', (req, res)=>{

        // If no associated employees then delete department

        // Get the values from the form's text boxes
        var did = req.params.did;

        // show error when there is an association
        var errorMessage = "<h1>Error Message</h1> <br>" + "<h3>"+did+" has employees and cannot be deleted<h3/><br>";
        errorMessage += "<a href=\"http://localhost:3000/\">Home</a>";

        // if no association then delete
        var deleteMessage = "<h1>Success</h1> <br>" + "<h3>"+did+" has been deleted safely<h3/><br>";
        deleteMessage += "<a href=\"http://localhost:3000/\">Home</a>";

        try {
            var queryString = "DELETE FROM dept WHERE did = ?";

        // Query to delete department
        connection.query(queryString, did),(error, results) => {
            if (error) {
                
                res.send(errorMessage);
                
            } else {
                res.send(deleteMessage);
                
            }
        // console.log(did);
        }
        } catch (error) {
            res.status(500).send('Error deleting department from database.');
        }

        
    });

    //#endregion


    //#region Employees MongoDB

    const uri = 'mongodb+srv://admin:admin@cluster0.bjoyv2i.mongodb.net/?retryWrites=true&w=majority';

    // Function to connect to the database
    function connectToMDB (){
        try{
            // wait for mongoose to connect to database
            mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
            console.log("Connected to MongoDB");
        } catch (error){
            console.error(error);
        }
    }

    app.get('/employeesMDB', (req, res) => {

        // connectToMDB();

        MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
            if (err) {
              console.error(err);
              res.send(err);
              return;
            }

            const db = client.db("employees");
            const collection = db.collection('employees');
            collection.find({}).toArray((err, employees) => {
            if (err) {
                console.error(err);
                res.send(err);
                client.close();
                
                return;
            }
            
            // CSS
            let table = '<table style="border: 2px solid black; width: 100%; background-color: lightblue; border-collapse: separate; width: 100%">';

            table +=    "<head>" +
                        "<title>Employees</title>" +
                        "<h1>Employees (MongoDB)</h1>"+
                        "</head>";

            // `` these quote marks allow you to have code on multiple lines without the +'s
            table += `<tr style="border: 2px solid black;">
            <th style="border: 2px solid black;">EID</th>
            <th style="border: 2px solid black;">Phone</th>
            <th style="border: 2px solid black;">Email</th></tr>`;

            table += '<br><a href="/employeesMongoDB/add">Add Employee (MongoDB)</a>';

            // Table contents
            employees.forEach(employee => {
                table += `<tr style="border: 2px solid black;">
                <td style="border: 2px solid black;">${employee._id}</td>
                <td style="border: 2px solid black;"> ${employee.phone}</td>
                <td style="border: 2px solid black;">${employee.email}</td></tr>`;
            });

            table += '</table>';
            table += "<a href=\"http://localhost:3000/\">Home</a>"  

            // Send the form 
            res.send(table);
            });
        });
    });

    // Add employee page
    app.get('/employeesMongoDB/add', (req, res) => {

        var eid, phone, email;

        var data = {eid, phone, email};

        


        // Use results to get values
        var addEmployeeForm = "" + 
        "<head>" +
        "<title>Add Employee (MongoDB)</title>" +
        "</head>" +
        "<body>" + 
        "        <h1>Add Employee (MongoDB)</h1>" + 
        "    <div>" + 
        "        <form action=\"/update-record-mdb\" method=\"post\">" +    // update record post method run on form submit 
        "            <h3>EID</h3><p>ID must be 4 characters.</p>" + 
        "            <input type=\"text\" id=\"eidInput\" name=\"eid\" required=true minlength = 4 maxlength = 4 title='EID must be 4 characters'><br>" + // 4 minimum characters
        "            <h3>Phone</h3><p>Phone should be at least 6 characters.</p>" + 
        "            <input type=\"text\" id=\"phoneInput\" name=\"phone\" minlength= 6 type=number required=true title='Enter a valid phone number, at least 6 characters'><br>" + 
        "            <h3>Email</h3><p>Email must be a valid email address.</p>" +             
        "            <input type=\"text\" id=\"emailInput\" name=\"email\" required=true pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$' title='Enter a valid email'><br>" + // email validation using pattern 
        "            <button onclick=\"addEmployee("+data+")\">Add</button>" +   // send data array 
        "            <br>" + 
        "            " + 
        "        </form>" + 
        "        " + 
        "        <a href=\"http://localhost:3000/\">Home</a>" + 
        "    </div>" + 
        "    " + 
        "  </body>" + 
        "";

        // Send the form to the web page
        res.send(addEmployeeForm);

    });

     // Route to handle form submission
     app.post('/update-record-mdb', (req, res) => {

        // Get the values from the form's text boxes
        var eid = req.body.eid;

        var phone = req.body.phone;

        var email = req.body.email;   

        var errorMessage = `
        <h1>Error Message</h1>
        <br><br><br>
        <h2>Error: EID `+eid+` already exists in MongoDB</h2>
        <br>
        <a href=\"http://localhost:3000/\">Home</a>
        `;
        var successMessage = `
        <h1>Success</h1>
        <br><br><br>
        <h2>Employee: EID `+eid+` added successfully</h2>
        <br>
        <a href=\"http://localhost:3000/\">Home</a>
        `; 

        var sqlErrorMessage = `
        <h1>Success</h1>
        <br><br><br>
        <h2>Employee: EID `+eid+` does not exist in MySQL database</h2>
        <br>
        <a href=\"http://localhost:3000/\">Home</a>
        `; 

        try {
            // Retrieves either error or success message after adding employee
            var message = addEmployee(eid, phone, email);

            // based on the returned message, send back unique message
            switch (message) {
                case 1:
                    res.send(sqlErrorMessage);  
                    break;
            
                case 2:
                    res.send(errorMessage);  
                    break; 

                case 3:
                    res.send(successMessage);
                    break;
                default:
                     res.redirect('/employeesMDB/')
                     break;
            }

            
            

        } catch (error) {
            console.error(error);
            // res.status(1100).send(error);
            //res.send(message);
            //setTimeout(res.send('/'));
            // res.redirect('/employeesMDB/')
            // res.send(message);
        }
        // res.send(message);   
        // res.send(message);
        
        // Send back to employees page
        // res.redirect('/employeesMongoDB/');
    }); 


    function addEmployee(eid, phone, email){

        // var message;    // message to be sent back

        // var errorMessage = `
        // <h1>Error Message</h1>
        // <br><br><br>
        // <h2>Error: EID `+eid+` already exists in MongoDB</h2>
        // <br>
        // <a href=\"http://localhost:3000/\">Home</a>"
        // `;
        // var successMessage = `
        // <h1>Success</h1>
        // <br><br><br>
        // <h2>Employee: EID `+eid+` added successfully</h2>
        // <br>
        // <a href=\"http://localhost:3000/\">Home</a>"
        // `; 

        // var sqlErrorMessage = `
        // <h1>Success</h1>
        // <br><br><br>
        // <h2>Employee: EID `+eid+` does not exist in MySQL database</h2>
        // <br>
        // <a href=\"http://localhost:3000/\">Home</a>"
        // `; 

        
            // var queryString = "SELECT * FROM employee WHERE eid = ?";

            // // Check if eid exists in sql database and if not then don't allow user to be created
            // connection.query(queryString, eid), (error, results) => {
            //     if (error) 
            //     {
            //         console.error(error);
            //         // results.status(500).send(sqlErrorMessage);
            //         return 1; // Return sql error message if employee doesnt exist in sql db
            //     } 
            //     if (results != null){
                    // connect to MDB client
                    MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => 
                    {
                        // Connection error handling
                        if (err) {
                        console.error(err);
                        // res.send(err);
                        return 2;
                        }

                        const db = client.db("employees");
                        const collection = db.collection('employees');

                        
                            // Insert into database
                            collection.insertOne({
                                _id: eid,
                                phone: phone,
                                email: email
                            })
                            .catch(() =>  // stops program from breaking
                            {
                                // return 2;
                            });

                            
                            // Find the created user and log to console
                            collection.find({_id: eid}).toArray((err, addedEmployee) => 
                            {
                                if (err) {
                                    console.error(err);
                                    client.close();
                                    return 2;
                                } else {
                                    console.log(addedEmployee);
                                    return 1;
                                }
                            })
                        
                            
                        return 1; // If all went well then return success message
                        
                    });
                // }
                // else // If id does not exist in sql database then create employee
                // {
                    
                // }
            }
        


        
    //}

    // mongoimport --uri mongodb+srv://admin:admin@cluster0.bjoyv2i.mongodb.net/DCWA --collection employees --type JSON --file employeesDB.json

    //#endregion





    // Close MySQL connection when the application is closed
    process.on('SIGINT', () => {
        connection.end();
    });

    app.listen(3000, () => {
        console.log('Application listening on port 3000');
    });



    