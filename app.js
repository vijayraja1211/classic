const express = require('express');
const app = express();
const cors = require('cors');
const usersRoutes = require('./routers/users.js');
const teacherRoutes = require('./routers/teacher.js');
const fieldsRoutes = require('./routers/fields.js');
const ordersRoutes = require('./routers/orders.js');

const port = 5000;
const bodyParser = require('body-parser');
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/api/orders', ordersRoutes);
app.use('/api/fields', fieldsRoutes);

app.use('/api/teacher', teacherRoutes);
app.use('/api', usersRoutes);


console.log("this is  working");

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
