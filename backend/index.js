const express = require("express");
const cors =require("cors");
const { connection } = require("./config/db.js");
const { userRouter } = require("./routes/user.routes.js");
const { projectRouter } = require("./routes/project.routes.js");
const { tagRouter } = require("./routes/tag.routes.js");
const taskRouter = require("./routes/task.routes.js");
const cookieSession = require("cookie-session");
const passport = require("passport");
const {pass} = require("./routes/passport.routes.js")
const {passportConfig} = require("./config/google_oauth.js");
const { checkUserAuth } = require("./middleware/authMiddleware.js");

require('dotenv').config()
const port = process.env.PORT || 8040;
const app = express();
app.use(express.json());

// app.use(cors());

app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET, POST, PUT, PATCH, DELETE",
  credentials: true,
}));
app.use(
  cookieSession({
    name: "session",
    keys: ["deepak"],
    maxAge: 24*60*60*100,
  })
)
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", pass)
app.use("/app/projects", projectRouter);
app.use("/app/tags",tagRouter);
app.use("/tasks",taskRouter);

app.use("/",userRouter);
app.use(checkUserAuth)
app.use("/app/projects", projectRouter);
app.use("/app/tags",tagRouter);
app.use("/tasks",taskRouter);


app.get("/",( req,res)=>{
  res.send("Welcome to backend server home page");
});


app.listen(port, async () => {
  try {
    await connection;
    console.log(`app is listening on port ${port}`)
    console.log("conneted to DB");
  } catch (error) {
    console.log(error);
  }
});
