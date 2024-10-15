import Courses from './models/courses';
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const mongoose = require('mongoose');
const dburl: string = process.env.dburl || '';


async function connectToMongo(dburl: string) {
    const retryAttempts = 3;
    const connectTimeoutMS = 20000;
  
    for (let attempt = 1; attempt <= retryAttempts; attempt++) {
      try {
        await mongoose.connect(dburl, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          connectTimeoutMS,
        });
        console.log('Connected to Database');
        return;
      } catch (error: any) {
        console.error(`Connection attempt ${attempt} failed:`, error.message);
  
        await new Promise((resolve) =>
          setTimeout(resolve, Math.min(attempt * 2000, 10000))
        );
      }
    }
}  

connectToMongo(dburl)
.then(async () => {
  console.log('Connected to MongoDB');

  const courses = [
    {
      "_id": "667ace469922eb5517afc1e6",
      "courseName": "Introduction To Roofs And Roofing Sytems",
      "courseImage": "https://plusworld.s3.amazonaws.com/course-images/plusworld+mockup4.png",
      "tutors": [
            {
                name: "Chinedu Eze",
                about: "Expert in Roofing Systems with over 15 years of experience.",
                profileImage: "https://example.com/chinedu_eze.jpg",
                socialMedia: {
                    twitter: "https://twitter.com/chinedueze",
                    linkedin: "https://linkedin.com/in/chinedueze",
                }
            }
        ],   
      "courseCategory": "Construction",
      "courseMedia": "https://plusworld.s3.amazonaws.com/coursefiles/1.+INTRODUCTION+TO+ROOFS+AND+ROOFING+SYSTEMS.+Ebizi1.pptx",
      "courseModules": [
          {
            "moduleName": "Module 1: Roof Basics",
            "moduleIndex": 1,
            "lessons": [
              {
                "lessonNo": "Lesson1",
                "lessonIndex": 1,
                "mediaUrl": "https://plusworld.s3.amazonaws.com/coursefiles/introduction-to-roof-maintenance-and-repairs/Lesson+1.pptx"
              },
              {
                "lessonNo": "Lesson2",
                "lessonIndex": 2,
                "mediaUrl": "https://plusworld.s3.amazonaws.com/coursefiles/introduction-to-roof-maintenance-and-repairs/Lesson+2.pptx"
              }
            ]
          },
          {
            "moduleName": "Module 2: Roof Maintenance",
            "moduleIndex" : 2,
            "lessons": [
              {
                "lessonNo": "Lesson1",
                "lessonIndex": 1,
                "mediaUrl": "https://plusworld.s3.amazonaws.com/coursefiles/introduction-to-roof-maintenance-and-repairs/Lesson+3.pptx"
              },
              {
                "lessonNo": "Lesson2",
                "lessonIndex": 2,
                "mediaUrl": "https://plusworld.s3.amazonaws.com/coursefiles/introduction-to-roof-maintenance-and-repairs/Lesson+1.pptx"
              }
            ]
          }
        ],
      "mediaType": "pptx",
      "new": true,
      "price": 149.99,
      "level": "Beginner",               
      "duration": "6 weeks",
      "lessons": 10,                   
      "quizzes": 2,                    
      "certification": true,           
      "graduation": "Certificate of Completion", 
      "description": "This course is intended to introduce the trainee to different types of Roofing Systems, their basic functions in relation to other building elements and the major criteria for selecting a roofing system. The trainees will be equipped with knowledge that will enable them specify roofing systems and incorporate building details and other related requirements into working drawings on a wide variety of projects.",
      "modules": [
        "Introduction to Roofing Systems",
"Selection criteria for Roofing Systems",
"Introduction to Roof Metrics & Measurements",
"Environmental Factors",
      ],
      "learningOutcome":  [
        "Know the different functions and fundamental requirements of a roof.",
        "Understand the different roofing systems (steep-slope/ low-slope roofs).",
        "Differentiate between the different types of roofs and roofing systems.",
        "Describe the basic roof shapes.",
        "Identify various roof coverings and trusses.",
        "Know how to take roofing measurements.",
        "Read, understand and interpret drawings and specifications.",
        "Estimate quantities of materials.",
        "Know how to select roofing systems based on building design, function, position and location.",
        "Know the environmental consideration when specifying roofing systems.",
        "Know how to specify roofing systems and incorporate building details and other related requirements into working drawings on a wide variety of projects."
      ],
      "students": 0,                   
      "dateCreated": new Date('2024-03-01')
    },


    {
      "_id": "667ace469922eb5517afc1e4",
      "courseName": "Roof And Structural Waterproofing",
            "courseImage": "https://plusworld.s3.amazonaws.com/course-images/plusworld+mockup2.png",
      "tutors": [
        {
            name: "Tunde Adebayo",
            about: "Specialist in Structural Waterproofing with extensive industry experience.",
            profileImage: "https://example.com/tunde_adebayo.jpg",
            socialMedia: {
                linkedin: "https://linkedin.com/in/tundeadebayo",
            }
        }
    ],
      "courseCategory": "Construction",
      "courseMedia": "https://plusworld.s3.amazonaws.com/coursefiles/3.+ROOF+AND+STRUCTURAL+WATERPROOFING.pptx",
      "courseModules": [
          {
            "moduleName": "Module 1: Roof Basics",
            "moduleIndex": 1,
            "lessons": [
              {
                "lessonNo": "Lesson1",
                "lessonIndex": 1,
                "mediaUrl": "https://plusworld.s3.amazonaws.com/coursefiles/introduction-to-roof-maintenance-and-repairs/Lesson+1.pptx"
              },
              {
                "lessonNo": "Lesson2",
                "lessonIndex": 2,
                "mediaUrl": "https://plusworld.s3.amazonaws.com/coursefiles/introduction-to-roof-maintenance-and-repairs/Lesson+2.pptx"
              }
            ]
          },
          {
            "moduleName": "Module 2: Roof Maintenance",
            "moduleIndex" : 2,
            "lessons": [
              {
                "lessonNo": "Lesson1",
                "lessonIndex": 1,
                "mediaUrl": "https://plusworld.s3.amazonaws.com/coursefiles/introduction-to-roof-maintenance-and-repairs/Lesson+3.pptx"
              },
              {
                "lessonNo": "Lesson2",
                "lessonIndex": 2,
                "mediaUrl": "https://plusworld.s3.amazonaws.com/coursefiles/introduction-to-roof-maintenance-and-repairs/Lesson+1.pptx"
              }
            ]
          }
        ],
      "mediaType": "pptx",
      "new": true,
      "price": 299.99,
      "level": "Intermediate",         
      "duration": "10 weeks",
      "lessons": 15,                   
      "quizzes": 3,                    
      "certification": true,           
      "graduation": "Professional Certificate",         
      "description": "Waterproofing is the process of making an object or structure waterproof or water-resistant so that it remains relatively unaffected by water or resists the ingress of water under specified conditions. Such items may be used in wet environment or underwater as specified. It is important to know that a high-performance roof is a highly insulated roof. This course will offer the trainees the skills required to design and plan the installation of roof and structural waterproofing for projects. It would provide them with a thorough understanding of all forms of waterproofing in both new and existing structure.",
      "modules": [
        "Principle of structural waterproofing",
        "Waterproofing design considerations",
        "Waterproofing material profiles",
        "Waterproofing system component profiles - forms of waterproofing",
        "Surveying existing structures and preparation for installing waterproofing",
        "Maintenance of waterproofing and aftercare"
      ],
      "learningOutcome": [
        "Demonstrate a good understanding of waterproofing/damp-proofing",
        "Understand the causes of water ingress and possible solutions",
        "Understand the principle of waterproofing design",
        "Select the right products",
        "Undertake correct product installation",
        "Become a certified professional applicator"
      ],
      "students": 0,                   
      "dateCreated": new Date('2024-03-01')
    },


    {
      "_id": "667ace469922eb5517afc1e9",
      "courseName": "Roofing Business MGT",
            "courseImage": "https://plusworld.s3.amazonaws.com/course-images/plusworld+mockup5.png",
      "tutors": [
        {
            name: "Ifeoma Obi",
            about: "Business Management expert with a focus on the Roofing industry.",
            profileImage: "https://example.com/ifeoma_obi.jpg",
            socialMedia: {
                twitter: "https://twitter.com/ifeomaobi",
                linkedin: "https://linkedin.com/in/ifeomaobi",
            }
        }
    ],
      "courseCategory": "Business",
      "courseMedia": "https://plusworld.s3.amazonaws.com/coursefiles/5.+ROOFING+BUSINESS+MGT.pptx",
      "courseModules": [
          {
            "moduleName": "Module 1: Roof Basics",
            "moduleIndex": 1,
            "lessons": [
              {
                "lessonNo": "Lesson1",
                "lessonIndex": 1,
                "mediaUrl": "https://plusworld.s3.amazonaws.com/coursefiles/introduction-to-roof-maintenance-and-repairs/Lesson+1.pptx"
              },
              {
                "lessonNo": "Lesson2",
                "lessonIndex": 2,
                "mediaUrl": "https://plusworld.s3.amazonaws.com/coursefiles/introduction-to-roof-maintenance-and-repairs/Lesson+2.pptx"
              }
            ]
          },
          {
            "moduleName": "Module 2: Roof Maintenance",
            "moduleIndex" : 2,
            "lessons": [
              {
                "lessonNo": "Lesson1",
                "lessonIndex": 1,
                "mediaUrl": "https://plusworld.s3.amazonaws.com/coursefiles/introduction-to-roof-maintenance-and-repairs/Lesson+3.pptx"
              },
              {
                "lessonNo": "Lesson2",
                "lessonIndex": 2,
                "mediaUrl": "https://plusworld.s3.amazonaws.com/coursefiles/introduction-to-roof-maintenance-and-repairs/Lesson+1.pptx"
              }
            ]
          }
        ],
      "mediaType": "pptx",
      "new": true,
      "price": 299.99,
      "level": "Advanced",             
      "duration": "12 weeks",
      "lessons": 20,                   
      "quizzes": 4,                    
      "certification": true,           
      "graduation": "Professional Certificate", 
      "description": "This course would teach you everything you need to know about the roofing business and how to create a sturdy company. It will address the major issues and problems that contractors face in operating a roofing business.",
      "modules" : [
        "Leadership and Man management",
"Procurement and Contract management",
"Operations and Project management",
"Financial management",
"Risk management",
"Sales and Marketing",
"Customer Service",
"Technology and Innovation",
"Corporate Governance",
"Inventory management",
"Insurance and Warranty"
      ],
      "learningOutcome" : [
        "Identify the underlying concepts and principles associated with procurement and contract management, operations and project management, and risk management.",
        "Evaluate the effectiveness of various financial and resource management methods in meeting defined objectives and corporate goals.",
        "Apply and articulate knowledge, theories and skills to a range of practical situations.",
        "Demonstrate a good understanding of leading and managing a (SME) roofing company.",
        "Apply essential sales, marketing, and customer service skills.",
        "Apply new roofing technology and software to roofline works."
      ],
      "students": 0,                   
      "dateCreated": new Date('2024-03-01')
    },


    {
      "_id": "667ace469922eb5517afc1e5",
      "courseName": "Introduction To Roof Maintenance And Repairs",
            "courseImage": "https://plusworld.s3.amazonaws.com/course-images/plusworld+mockup6.png",
      "tutors": [
        {
            name: "Ngozi Okeke",
            about: "Roof Maintenance expert with a focus on sustainability.",
            profileImage: "https://example.com/ngozi_okeke.jpg",
            socialMedia: {
                linkedin: "https://linkedin.com/in/ngozzokeke",
            }
        }
    ],      
    "courseCategory": "Maintenance",
      "courseMedia": "https://plusworld.s3.amazonaws.com/coursefiles/2.+INTRODUCTION+TO+ROOF+MAINTENANCE+AND+REPAIRS.pptx",
      "courseModules": [
          {
            "moduleName": "Module 1: Roof Basics",
            "moduleIndex": 1,
            "lessons": [
              {
                "lessonNo": "Lesson1",
                "lessonIndex": 1,
                "mediaUrl": "https://plusworld.s3.amazonaws.com/coursefiles/introduction-to-roof-maintenance-and-repairs/Lesson+1.pptx"
              },
              {
                "lessonNo": "Lesson2",
                "lessonIndex": 2,
                "mediaUrl": "https://plusworld.s3.amazonaws.com/coursefiles/introduction-to-roof-maintenance-and-repairs/Lesson+2.pptx"
              }
            ]
          },
          {
            "moduleName": "Module 2: Roof Maintenance",
            "moduleIndex" : 2,
            "lessons": [
              {
                "lessonNo": "Lesson1",
                "lessonIndex": 1,
                "mediaUrl": "https://plusworld.s3.amazonaws.com/coursefiles/introduction-to-roof-maintenance-and-repairs/Lesson+3.pptx"
              },
              {
                "lessonNo": "Lesson2",
                "lessonIndex": 2,
                "mediaUrl": "https://plusworld.s3.amazonaws.com/coursefiles/introduction-to-roof-maintenance-and-repairs/Lesson+1.pptx"
              }
            ]
          }
        ],
      "mediaType": "pptx",
      "new": false,
      "price": 199.99,
      "level": "Beginner",             
      "duration": "8 weeks",
      "lessons": 12,                   
      "quizzes": 2,                    
      "certification": true,           
      "graduation": "Professional Certificate", 
      "description": "This course will discuss the causes and effects of roof damage and the practical skills required to make proper roof inspections and identify solutions. It will also explain types of maintenance, how to plan maintenance and how to select the proper materials to use.",
      "modules": [
        "Introduction to roof defects",
        "Types of common roof defects",
        "Causes of common roof defects",
        "Roof inspection procedures and reporting",
        "Preventive and corrective maintenance and repairs",
        "Methods of roof repairs"
      ],
      "learningOutcome": [
"Identify and understand the defects in roof and roofing systems",
  "Understand deterioration and effects of aging in roofing materials",
  "Know the various weathering agents that cause deterioration",
  "Understand the concept of maintenance and its application in various roofing systems",
  "Understand the importance of roof inspection and be able to prepare and present a roof standard inspection report",
  "Know the various types of roof repair materials and their application",
  "Identify actions that would void a typical roof warranty and explain why it is important to keep the warranty in effect"
      ],
      "students": 0,                   
      "dateCreated": new Date('2024-03-01')
    },

    {
      "_id": "667ace469922eb5517afc1e7",
      "courseName": "Roof Restoration",
            "courseImage": "https://plusworld.s3.amazonaws.com/course-images/plusworld+mockup.png",
      "tutors": [
        {
            name: "Aisha Bello",
            about: "Roof Restoration specialist with hands-on experience in various roof substrates.",
            profileImage: "https://example.com/aisha_bello.jpg",
            socialMedia: {
                instagram: "https://instagram.com/aishabello",
            }
        }
    ],      
    "courseCategory": "Renovation",
      "courseMedia": "https://plusworld.s3.amazonaws.com/coursefiles/4.+ROOF+RESTORATIONEbizi.pptx",
      "courseModules": [
          {
            "moduleName": "Module 1: Roof Basics",
            "moduleIndex": 1,
            "lessons": [
              {
                "lessonNo": "Lesson1",
                "lessonIndex": 1,
                "mediaUrl": "https://plusworld.s3.amazonaws.com/coursefiles/introduction-to-roof-maintenance-and-repairs/Lesson+1.pptx"
              },
              {
                "lessonNo": "Lesson2",
                "lessonIndex": 2,
                "mediaUrl": "https://plusworld.s3.amazonaws.com/coursefiles/introduction-to-roof-maintenance-and-repairs/Lesson+2.pptx"
              }
            ]
          },
          {
            "moduleName": "Module 2: Roof Maintenance",
            "moduleIndex" : 2,
            "lessons": [
              {
                "lessonNo": "Lesson1",
                "lessonIndex": 1,
                "mediaUrl": "https://plusworld.s3.amazonaws.com/coursefiles/introduction-to-roof-maintenance-and-repairs/Lesson+3.pptx"
              },
              {
                "lessonNo": "Lesson2",
                "lessonIndex": 2,
                "mediaUrl": "https://plusworld.s3.amazonaws.com/coursefiles/introduction-to-roof-maintenance-and-repairs/Lesson+1.pptx"
              }
            ]
          }
        ],
      "mediaType": "pptx",
      "new": false,
      "price": 249.99,
      "level": "Intermediate",         
      "duration": "9 weeks",
      "lessons": 14,                   
      "quizzes": 3,                    
      "certification": true,           
      "graduation": "Professional Certificate",         
      "description": "The roof restoration professional training course is to prepare the trainees for employment in the Contractor Trade Industry. Throughout the theory-based lectures and hands-on application practical, trainees will gain knowledge necessary for roof applications. Included are in-depth overviews of necessary processes for identifying, analyzing and diagnosing roof problems and recommending solutions for roof restoration.",
      "modules": [
        "Roofing basics",
        "Roofing substrates",
        "Required tools and equipment for roof restoration",
        "Inspection, assessment and reports",
        "Roof restoration process",
        "Roof painting techniques",
        "Finishing and housekeeping"
      ],
      "learningOutcome":[
        "Recognize and interpret roof substrates better.",
        "Develop the skills to inspect, assess and diagnose a roof for solutions.",
        "Build on existing experience in the roofing industry.",
        "Gain skills to confidently repair, maintain and re-coat a variety of roofing substrates and conditions.",
        "Acquire skills to use the variety of tools and equipment for roof restoration.",
        "Train to become a registered roof applicator."
      ],
      "students": 0,                   
      "dateCreated": new Date('2024-03-01')
    },


    {
      "_id": "667ace469922eb5517afc1e8",
      "courseName": "HSE - Safety At Height & Workplace",
            "courseImage": "https://plusworld.s3.amazonaws.com/course-images/plusworld+mockup3.png",
      "tutors": [
        {
            name: "Femi Ogunleye",
            about: "HSE expert with a focus on safety protocols for working at heights.",
            profileImage: "https://example.com/femi_ogunleye.jpg",
            socialMedia: {
                facebook: "https://facebook.com/femiogunleye",
            }
        }
    ],
      "courseCategory": "Safety",
      "courseMedia": "https://plusworld.s3.amazonaws.com/coursefiles/6.+HSE-+SAFETY+AT+HEIGHT+%26+WORKPLACE+(1).pptx",
      "courseModules": [
          {
            "moduleName": "Module 1: Roof Basics",
            "moduleIndex": 1,
            "lessons": [
              {
                "lessonNo": "Lesson1",
                "lessonIndex": 1,
                "mediaUrl": "https://plusworld.s3.amazonaws.com/coursefiles/introduction-to-roof-maintenance-and-repairs/Lesson+1.pptx"
              },
              {
                "lessonNo": "Lesson2",
                "lessonIndex": 2,
                "mediaUrl": "https://plusworld.s3.amazonaws.com/coursefiles/introduction-to-roof-maintenance-and-repairs/Lesson+2.pptx"
              }
            ]
          },
          {
            "moduleName": "Module 2: Roof Maintenance",
            "moduleIndex" : 2,
            "lessons": [
              {
                "lessonNo": "Lesson1",
                "lessonIndex": 1,
                "mediaUrl": "https://plusworld.s3.amazonaws.com/coursefiles/introduction-to-roof-maintenance-and-repairs/Lesson+3.pptx"
              },
              {
                "lessonNo": "Lesson2",
                "lessonIndex": 2,
                "mediaUrl": "https://plusworld.s3.amazonaws.com/coursefiles/introduction-to-roof-maintenance-and-repairs/Lesson+1.pptx"
              }
            ]
          }
        ],
      "mediaType": "pptx",
      "new": true,
      "price": 179.99,
      "level": "Beginner",             
      "duration": "7 weeks",
      "lessons": 10,                   
      "quizzes": 2,                    
      "certification": true,           
      "graduation": "Certificate of Completion", 
      "description": "This course will expose the trainees to areas of present and potential hazards when working at height and workplace with emphasis on the roofs and roofing systems. Learners would be well equipped with safety rules, procedures and safety signs for work at heights and general work environment.",
      "module": [
        "Identification of hazards of working at height",
        "Eliminating and controlling the hazards of working at heights",
        "Use of ladder and similar equipment",
        "Personal fall Protection Equipment (PFPE)",
        "Personal Protection Equipment",
        "Safety signs and their meanings",
        "Workplace Housekeeping",
        "First-Aid",
        "Incident Reporting",
        "Emergency and rescue planning",
        "Rights and responsibilities",
        "General safety and health regulations"
      ],
      "learningOutcome": [
        "Describe workplace hazards",
        "Identify hazards related to work at heights",
        "Explain causes of hazards and falls from heights",
        "Interpret the occupational health and safety regulations",
        "Use personal protective equipment",
        "Practice safety procedures",
        "Master good housekeeping practices",
        "Know how to administer First Aid",
        "Know how to carry out incident reporting"
      ],
      "students": 0,                   
      "dateCreated": new Date('2024-03-01')
    }
  ];
  
  for (const courseData of courses) {
    await Courses.updateOne(
      { _id: new mongoose.Types.ObjectId(courseData._id) },
      { $set: courseData },
      { upsert: true } 
    );
  }

  console.log('Courses updated successfully');
  mongoose.connection.close();
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});


