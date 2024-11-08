require("dotenv").config();
import Test from "./models/test";
import Course from "./models/courses";
import connectToMongo from "./dbConnection";

const dburl: string = process.env.dburl || "";

connectToMongo(dburl);
const sampleTests = [
  {
    testName: "Introduction To Roofs And Roofing Sytems",
    courseName: "Introduction To Roofs And Roofing Sytems",
    moduleName: "Module 1: Roof Basics",
    questions: [
      {
        questionText: "Who is the smartest boy in the world",
        options: ["seyi", "chris", "afayomide", "oluwaseyi"],
        correctAnswer: "seyi",
      },
      {
        questionText: "Who is the smartest boy in the world",
        options: ["seyi", "chris", "afayomide", "oluwaseyi"],
        correctAnswer: "seyi",
      },
      {
        questionText: "Who is the smartest boy in the world",
        options: ["seyi", "chris", "afayomide", "oluwaseyi"],
        correctAnswer: "seyi",
      },
    ],
  },
  {
    testName: "Introduction To Roofs And Roofing Sytems",
    courseName: "Introduction To Roofs And Roofing Sytems",
    moduleName: "Module 2: Roof Maintenance",
    questions: [
      {
        questionText: "Who is the smartest boy in the world",
        options: ["seyi", "chris", "afayomide", "oluwaseyi"],
        correctAnswer: "seyi",
      },
      {
        questionText: "Who is the smartest boy in the world",
        options: ["seyi", "chris", "afayomide", "oluwaseyi"],
        correctAnswer: "seyi",
      },
      {
        questionText: "Who is the smartest boy in the world",
        options: ["seyi", "chris", "afayomide", "oluwaseyi"],
        correctAnswer: "seyi",
      },
    ],
  },
  {
    testName: "Introduction To Roofs And Roofing Sytems",
    courseName: "Roof And Structural Waterproofing",
    moduleName: "Module 1: Roof Basics",
    questions: [
      {
        questionText: "Who is the smartest boy in the world",
        options: ["seyi", "chris", "afayomide", "oluwaseyi"],
        correctAnswer: "seyi",
      },
      {
        questionText: "Who is the smartest boy in the world",
        options: ["seyi", "chris", "afayomide", "oluwaseyi"],
        correctAnswer: "seyi",
      },
      {
        questionText: "Who is the smartest boy in the world",
        options: ["seyi", "chris", "afayomide", "oluwaseyi"],
        correctAnswer: "seyi",
      },
    ],
  },
  {
    testName: "Introduction To Roofs And Roofing Sytems",
    courseName: "Roof And Structural Waterproofing",
    moduleName: "Module 1: Roof Maintenance",
    questions: [
      {
        questionText: "Who is the smartest boy in the world",
        options: ["seyi", "chris", "afayomide", "oluwaseyi"],
        correctAnswer: "seyi",
      },
      {
        questionText: "Who is the smartest boy in the world",
        options: ["seyi", "chris", "afayomide", "oluwaseyi"],
        correctAnswer: "seyi",
      },
      {
        questionText: "Who is the smartest boy in the world",
        options: ["seyi", "chris", "afayomide", "oluwaseyi"],
        correctAnswer: "seyi",
      },
    ],
  },
];

// Test.insertMany(sampleTests)
//   .then(() => console.log("Sample test data inserted successfully!"))
//   .catch((error) => console.error("Error inserting sample test data:", error));

// Test.deleteMany();

async function addTestsToModules() {
    const tests = await Test.find()
    for (const testData of tests) {
      try {
  
        // Find the course by name
        const course = await Course.findOne({ courseName: testData.courseName });
  
        if (course) {
          // Find the module by name within the course
          const module = course.courseModules?.find(mod => mod.moduleName === testData.moduleName);
  
          if (module) {
            // Add the test ID to the module's tests list
            module.test = testData._id;
            
            // Save the updated course document
            await course.save();
            console.log(`Test "${testData.testName}" added to module "${testData.moduleName}" in course "${testData.courseName}".`);
          } else {
            console.log(`Module "${testData.moduleName}" not found in course "${testData.courseName}".`);
          }
        } else {
          console.log(`Course "${testData.courseName}" not found.`);
        }
      } catch (error) {
        console.error(`Error adding test "${testData.testName}" to module:`, error);
      }
    }
  }

  addTestsToModules()