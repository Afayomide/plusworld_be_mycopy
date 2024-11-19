const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
import Courses from "./models/courses";
import Test from "./models/test";
import UserProgress from "./models/userProgress";
import verifyToken from "./verifyToken";
import User from "./models/user";
import connectToMongo from "./dbConnection";
const nodemailer = require("nodemailer");
const userRouter = require("./routes/user");
const courseRouter = require("./routes/course");
const paymentRouter = require("./routes/payments");
const authRouter = require("./routes/auth");
const testRouter = require("./routes/test");

const port = 4000;
const dburl: string = process.env.dburl || "";

const corsOption = {
  origin: [
    "http://localhost:5173",
    "https://plusworld-fe.vercel.app",
    "http://localhost:3000",
    "https://plusworld.vercel.app",
  ],
};

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded());
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());
app.use(bodyParser.text());
app.use("/api/user", verifyToken, userRouter);
app.use("/api/courses", courseRouter);
app.use("/api/auth", authRouter);
app.use("/api/test", testRouter);

app.use("/api", paymentRouter);

declare global {
  namespace Express {
    interface Request {
      user?: any; // or you can specify a type for `user`, e.g., `User`
      file?: any;
    }
  }
}

connectToMongo(dburl)
  .then(() => {
    console.log("connection succesful");
  })
  .catch((error) => {
    console.error("Fatal error:", error.message);
  });

app.get("/", (req: any, res: any) => {
  res.send("Dandys Server");
});

app.get("/api/search", async (req: any, res: any) => {
  const { searchTerm } = req.query;

  if (typeof searchTerm !== "string" || searchTerm.trim() === "") {
    return res.status(400).json({ error: "Invalid search term" });
  }

  try {
    console.log(`this is ${searchTerm}`);
    const searchOptions = {
      $or: [
        { courseName: { $regex: searchTerm, $options: "i" } },
        { courseTitle: { $regex: searchTerm, $options: "i" } },
        { tutors: { $regex: searchTerm, $options: "i" } },
        { courseCategory: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } },
      ],
    };

    const result = await Courses.find(searchOptions);

    if (result.length === 0) {
      return res
        .status(404)
        .json({ error: "No courses found matching your search." });
    }

    res.json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving your search results" });
  }
});

app.post("/api/submit-form", (req: any, res: any) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your_email@gmail.com",
      pass: "your_password",
    },
  });

  // Define email options
  const mailOptions = {
    from: "your_email@gmail.com",
    to: "recipient_email@example.com",
    subject: "New Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error: any, info: any) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.send("Email sent successfully");
    }
  });
});

app.post("/api/start-course", async (req: any, res: any) => {
  const { userId, courseId } = req.body;
  try {
    const progress = new UserProgress({
      userId,
      courseId,
      startTime: new Date(),
      sectionsCompleted: 0,
      status: "in progress",
    });
    await progress.save();
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: "Error starting course" });
  }
});

app.post("/api/complete-course", async (req: any, res: any) => {
  const { userId, courseId } = req.body;
  try {
    const progress = await UserProgress.findOne({ userId, courseId });
    if (!progress) {
      return res.status(404).json({ error: "Progress not found" });
    }
    progress.status = "finished";
    progress.sectionsCompleted = 100;
    await progress.save();
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: "Error completing course" });
  }
});

app.post("/api/users", async (req: any, res: any) => {
  const emails = [
    "roycode73@gmail.com",
    "ridwanmakinde63@gmail.com",
    "makinderidwan73@gmail.com",
    "daramolaseyi12@gmail.com",
    "daraseyi086@gmail.com",
    "jibrilali2122@gmail.com",
    "davidmiller4504@gmail.com"
  ];

  try {
    const collection = User.collection;
    console.log(collection)

    // Drop the unique index on profileImage if it exists
    const indexes = await collection.indexes();
    const profileImageIndex = indexes.find(index => index.name === "profileImage_1");

    if (profileImageIndex) {
      await collection.dropIndex("profileImage_1");
      console.log("Dropped unique index on profileImage.");
    }
    for (var val of emails) {
      await User.deleteOne({ email: val });
      console.log(`Deleted user with email: ${val}`);
    }

    const updateResult = await User.updateMany(
      { profileImage: null },
      { $set: { profileImage: '' } }
    );
    console.log(`Updated ${updateResult.modifiedCount} users with empty profileImage.`);

    // Fetch and return all users
    await collection.createIndex({ profileImage: 1 }, { unique: false });

    const users = await User.find();
    return res.json(users);

  } catch (error) {
    console.error("Error during database operations:", error);
    return res.status(500).json({ message: "An error occurred", error });
  }
});

// function monitorMemory() {
//   const memoryUsage = process.memoryUsage();
//   console.log(`Memory Usage: ${memoryUsage.heapUsed / 1024 / 1024} MB`);
// }

// setInterval(monitorMemory, 5000);  // Check every 5 secondscd

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
