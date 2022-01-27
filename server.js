const express = require('express');
const cors = require('cors');

var mongoose = require("mongoose"); 
mongoose.connect('mongodb://localhost/locatesy-db', { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

const studentSchema = new mongoose.Schema({
  roll_no: Number,
  name: String,
  year: Number,
  subjects: [String]
});

const Student = mongoose.model('Student', studentSchema);

const stud = new Student({
  roll_no: 1001,
  name: 'Madison Hyde',
  year: 3,
  subjects: ['DBMS', 'OS', 'Graph Theory', 'Internet Programming']
});
stud.save().then(() => console.log("One entry added"));

// app.get('/api/customers', cors(), (req, res) => {
//   const customers = [
//     {id: 1, firstName: 'John', lastName: 'Doe'},
//     {id: 2, firstName: 'Brad', lastName: 'Traversy'},
//     {id: 3, firstName: 'Mary', lastName: 'Swanson'},
//   ];

//   res.json(customers);
// });

app.get("/db")

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);