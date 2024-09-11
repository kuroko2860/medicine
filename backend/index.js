const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// Import routes
const medicineRoutes = require('./routes/medicine');
const medicineGroupRoutes = require('./routes/medicineGroup');
const medicineBatchRoutes = require('./routes/medicineBatch');
const userRoutes = require('./routes/user');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Use routes
app.use('/api/medicines', medicineRoutes);
app.use('/api/medicine-groups', medicineGroupRoutes);
app.use('/api/medicine-batches', medicineBatchRoutes);
app.use('/api', userRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
