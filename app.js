const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./db/index');
const dotenv = require('dotenv');
const app = express();
const {userRouter} = require('./routes/user');
const { fileRouter} = require('./routes/file');
const path = require('path');

dotenv.config();


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.use(cookieParser());
app.use('/api/users',userRouter);
app.use('/api/files',fileRouter);
const viewRoutes = require('./routes/view');
app.use("/", viewRoutes);


connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch((error) => {
    console.log(`MongoDB connection failed! Error: ${error}`);
  });

