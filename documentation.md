## API Documentation for Course Management

### Overview

This API provides endpoints to manage course data. It supports operations to retrieve all courses and a specific course by its unique identifier.

### Base URL

```
http://localhost:3000/api/courses
```

### Endpoints

#### 1. Get All Courses

- **URL**: `/api/courses`
- **Method**: `GET`
- **Description**: Retrieve a list of all courses.
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**: JSON array of courses.
  - **Example**:
    `   json
    [
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
            "Module 1": "Roof Basics",
            "lessons": [
              {
                "lessonNo": "Lesson1",
                "mediaUrl": "https://plusworld.s3.amazonaws.com/coursefiles/introduction-to-roof-maintenance-and-repairs/Lesson+1.pptx"
              },
              {
                "lessonNo": "Lesson2",
                "mediaUrl": "https://plusworld.s3.amazonaws.com/coursefiles/introduction-to-roof-maintenance-and-repairs/Lesson+2.pptx"
              }
            ]
          },
          {
            "Module 2": "Roof Maintenance",
            "lessons": [
              {
                "lessonNo": "Lesson1",
                "mediaUrl": "https://plusworld.s3.amazonaws.com/coursefiles/introduction-to-roof-maintenance-and-repairs/Lesson+3.pptx"
              },
              {
                "lessonNo": "Lesson2",
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
    },,
      ...
    ]
  `
- **Error Responses**:
  - **Code**: `500 Internal Server Error`
  - **Content**: `{ "error": "An error occurred while retrieving courses." }`

#### 2. Get a Single Course

- **URL**: `/api/courses/:id`
- **Method**: `GET`
- **Description**: Retrieve details of a single course by its ID.
- **Path Parameter**: `:id` - The ID of the course.
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**: JSON object of the course.
  - **Example**:
    `   json
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
            "Module 1": "Roof Basics",
            "lessons": [
              {
                "lessonNo": "Lesson1",
                "mediaUrl": "https://plusworld.s3.amazonaws.com/coursefiles/introduction-to-roof-maintenance-and-repairs/Lesson+1.pptx"
              },
              {
                "lessonNo": "Lesson2",
                "mediaUrl": "https://plusworld.s3.amazonaws.com/coursefiles/introduction-to-roof-maintenance-and-repairs/Lesson+2.pptx"
              }
            ]
          },
          {
            "Module 2": "Roof Maintenance",
            "lessons": [
              {
                "lessonNo": "Lesson1",
                "mediaUrl": "https://plusworld.s3.amazonaws.com/coursefiles/introduction-to-roof-maintenance-and-repairs/Lesson+3.pptx"
              },
              {
                "lessonNo": "Lesson2",
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
  `
- **Error Responses**:
  - **Code**: `404 Not Found`
  - **Content**: `{ "error": "Course not found." }`
  - **Code**: `500 Internal Server Error`
  - **Content**: `{ "error": "An error occurred while retrieving the course." }`

#### 3. Search Courses

- **URL**: `/api/search`
- **Method**: `POST`
- **Description**: Search courses by searchterms which are of type of string.
- **Parameter**: `searchTerm` - The term you are trying to search for
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**: JSON object of items in the database that contain the search term.
  - **Example**:
    {
    "searchTerm": "Roof"
    }
- **Result**:
  {
  "result": [
  {
  "\_id": "667ace469922eb5517afc1e6",
  "courseName": "INTRODUCTION TO ROOFS AND ROOFING SYSTEMS",
  "tutorName": "Chinedu Eze",
  "courseCategory": "Construction",
  "courseMedia": "https://plusworld.s3.amazonaws.com/coursefiles/1.+INTRODUCTION+TO+ROOFS+AND+ROOFING+SYSTEMS.+Ebizi1.pptx",
  "mediaType": "pptx",
  "new": true,
  "price": 149.99,
  "duration": "6",
  "description": [
  "Explore different types of roofs and roofing systems.",
  "Understand the components and design of roofing systems.",
  "Learn about the materials used in various roofing applications."
  ]
  },
  {
  "\_id": "667ace469922eb5517afc1e4",
  "courseName": "ROOF AND STRUCTURAL WATERPROOFING",
  "tutorName": "Tunde Adebayo",
  "courseCategory": "Construction",
  "courseMedia": "https://plusworld.s3.amazonaws.com/coursefiles/3.+ROOF+AND+STRUCTURAL+WATERPROOFING.pptx",
  "mediaType": "pptx",
  "new": true,
  "price": 299.99,
  "duration": "10",
  "description": [
  "Understand the principles of roof and structural waterproofing.",
  "Learn about different waterproofing materials and their applications.",
  "Gain hands-on experience with waterproofing techniques."
  ]
  },
  {
  "\_id": "667ace469922eb5517afc1e9",
  "courseName": "ROOFING BUSINESS MGT",
  "tutorName": "Ifeoma Obi",
  "courseCategory": "Business",
  "courseMedia": "https://plusworld.s3.amazonaws.com/coursefiles/5.+ROOFING+BUSINESS+MGT.pptx",
  "mediaType": "pptx",
  "new": true,
  "price": 299.99,
  "duration": "12",
  "description": [
  "Learn the essentials of managing a roofing business.",
  "Understand financial management, customer relations, and marketing for roofing companies.",
  "Gain skills in project management and business development."
  ]
  },
  {
  "\_id": "667ace469922eb5517afc1e5",
  "courseName": "INTRODUCTION TO ROOF MAINTENANCE AND REPAIRS",
  "tutorName": "Ngozi Okeke",
  "courseCategory": "Maintenance",
  "courseMedia": "https://plusworld.s3.amazonaws.com/coursefiles/2.+INTRODUCTION+TO+ROOF+MAINTENANCE+AND+REPAIRS.pptx",
  "mediaType": "pptx",
  "new": false,
  "price": 199.99,
  "duration": "8",
  "description": [
  "Learn the basics of roof maintenance and repair strategies.",
  "Identify common roof issues and how to address them.",
  "Gain practical skills for performing routine roof inspections."
  ]
  },
  {
  "\_id": "667ace469922eb5517afc1e7",
  "courseName": "ROOF RESTORATION",
  "tutorName": "Aisha Bello",
  "courseCategory": "Renovation",
  "courseMedia": "https://plusworld.s3.amazonaws.com/coursefiles/4.+ROOF+RESTORATIONEbizi.pptx",
  "mediaType": "pptx",
  "new": false,
  "price": 249.99,
  "duration": "9",
  "description": [
  "Discover techniques for restoring old or damaged roofs.",
  "Learn about the tools and materials needed for roof restoration.",
  "Gain skills to assess roof conditions and plan restoration projects."
  ]
  }
  ]
  }

- **Error Responses**:
- **Code**: `400 Bad Request`
- **Content**: `{ "error": "Invalid search term." }`

- **Code**: `404 Not Found`
- **Content**: `{ "error": "We found nothing to match your search." }`
- **Code**: `500 Internal Server Error`
- **Content**: `{ "error": "Error retrieving your search results." }`

### 4. Update User Profile

- **URL**: `/api/user`
- **Method**: `PUT`
- **Description**: Update user profile information.
- **Headers**:
  - **`Authorization`**: Bearer token required to verify user.
- **Request Body**:
  - **`fullname`** (optional): User's full name.
  - **`profileImage`** (optional): URL of the user's profile image.
  - **`email`** (optional): User's email address.
  - **`phone`** (optional): User's phone number.
  - **`username`** (optional): User's username.
  - **`hobbies`** (optional): String of user's hobbies.
    - **`dob`** (optional): User's Date of birth.
  - **`location`** (optional): User's location.
  - **`language`** (optional): User's preferred language.
  - **`goal`** (optional): User's career goal.
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**: JSON object of the updated user profile.
  - **Example**:
    ```json
    {
      "_id": "60c72b1f9b1d4c3f241b5e36",
      "fullname": "John Doe",
      "profileImage": "https://example.com/profile/johndoe.jpg",
      "email": "johndoe@example.com",
      "phone": "+123456789",
      "username": "johndoe",
      "hobbies": ["reading", "gaming"],
      "location": "New York, USA",
      "language": "English",
      "careerGoal": "Software Engineer",
      "profileCompleted": true
    }
    ```
- **Error Responses**:
  - **Code**: `500 Internal Server Error`
  - **Content**: `{ "message": "Error updating user" }`

### 5. Add Course to Cart

- **URL**: `/user/cart/add`
- **Method**: `POST`
- **Description**: Add a course to the user's cart.
- **Headers**:
  - **`Authorization`**: Bearer token required to verify user.
- **Request Body**:
  - **`courseId`** (required): The ID of the course to add to the cart.
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**: JSON object with a success message.
  - **Example**:
    ```json
    {
      "message": "Product added to cart successfully"
    }
    ```
- **Error Responses**:
  - **Code**: `400 Bad Request`
  - **Content**: `{ "message": "Missing product ID" }`
  - **Code**: `404 Not Found`
  - **Content**: `{ "message": "Product not found" }`
  - **Code**: `400 Bad Request`
  - **Content**: `{ "message": "Product already in cart" }`
  - **Code**: `500 Internal Server Error`
  - **Content**: `{ "message": "Internal server error" }`

### 6. Get User Cart Items

- **URL**: `/user/cart/list`
- **Method**: `GET`
- **Description**: Retrieve the list of courses in the user's cart.
- **Headers**:
  - **`Authorization`**: Bearer token required to verify user.
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**: JSON object with the list of cart items.
  - **Example**:
    ```json
    {
      "cartItems": [
        {
          "_id": "60c72b1f9b1d4c3f241b5e36",
          "courseName": "ROOF AND STRUCTURAL WATERPROOFING",
          "tutorName": "Tunde Adebayo",
          "courseCategory": "Construction",
          "courseMedia": "https://plusworld.s3.amazonaws.com/coursefiles/3.+ROOF+AND+STRUCTURAL+WATERPROOFING.pptx",
          "mediaType": ["pptx"],
          "new": true,
          "price": 299.99,
          "duration": 10,
          "description": [
            "Understand the principles of roof and structural waterproofing.",
            "Learn about different waterproofing materials and their applications.",
            "Gain hands-on experience with waterproofing techniques."
          ]
        },
        {
          "_id": "60c72b1f9b1d4c3f241b5e37",
          "courseName": "INTRODUCTION TO ROOFS AND ROOFING SYSTEMS",
          "tutorName": "Chinedu Eze",
          "courseCategory": "Construction",
          "courseMedia": "https://plusworld.s3.amazonaws.com/coursefiles/1.+INTRODUCTION+TO+ROOFS+AND+ROOFING+SYSTEMS.+Ebizi1.pptx",
          "mediaType": ["pptx"],
          "new": true,
          "price": 149.99,
          "duration": 6,
          "description": [
            "Explore different types of roofs and roofing systems.",
            "Understand the components and design of roofing systems.",
            "Learn about the materials used in various roofing applications."
          ]
        }
      ]
    }
    ```
- **Error Responses**:

  - **Code**: `404 Not Found`
  - **Content**: `{ "message": "User not found" }`
  - **Code**: `500 Internal Server Error`
  - **Content**: `{ "message": "Internal server error" }`

  ### 7. Get User Course Progress

- **URL**: `/user/courseprogress/:courseId`
- **Method**: `GET`
- **Description**: Retrieve the progress of a specific course for the authenticated user.
- **Headers**:
  - **`Authorization`**: Bearer token required to verify user.
- **URL Parameters**:
  - **`courseId`**: The ID of the course for which the progress is being retrieved.
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**: JSON object with course progress details.
  - **Example**:
    `json
{
    "courseProgress": {
        "courseId": "667ace469922eb5517afc1e4",
        "lessons": [
            {
                "lessonId": "66d8510b73256448439dc973",
                "progress": 0,
                "completed": false,
                "isOpened": true,
                "_id": "66d868f02ee059457d810e0a"
            }
        ],
        "courseProgress": 0,
        "completed": false,
        "_id": "66d860de2bc3f3fd9f3e3ad7"
    }
}
    `
- **Error Responses**:
  - **Code**: `404 Not Found`
    - **Content**: `{ "message": "User not found" }`
    - **Description**: User with the specified ID does not exist.
  - **Code**: `404 Not Found`
    - **Content**: `{ "message": "Course not found in user's course list" }`
    - **Description**: Course with the specified ID is not found in the user's list of courses.
  - **Code**: `500 Internal Server Error`
    - **Content**: `{ "message": "Server error" }`
    - **Description**: An unexpected error occurred on the server.

### 8. Initialize Payment

- **URL**: `/pay`
- **Method**: `POST`
- **Description**: Initializes a payment request for the user via Paystack. The endpoint takes in user details like email, amount, and course IDs, and returns a Paystack payment link.
- **Headers**:
  - **`Authorization`**: Bearer token required to verify the user.
- **Request Body**:
  - **`email`** (required): The user's email address for payment.
  - **`amount`** (required): The total amount to be paid for the courses (in currency units, multiplied by 100 to convert to Paystack format).
  - **`courseIds`** (required): An array of course IDs or a single course ID representing the courses being paid for.
  - **`redirectUrl`** (required): The URL to redirect the user after payment completion.
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**: JSON object containing the Paystack payment initialization data.
  - **Example**:
    ```json
    {
      "status": "success",
      "message": "Payment initialized successfully",
      "data": {
        "authorization_url": "https://checkout.paystack.com/abc123",
        "access_code": "abc123",
        "reference": "xyz123"
      }
    }
    ```
- **Error Responses**:
  - **Code**: `500 Internal Server Error`
    - **Content**:
      ```json
      {
        "status": "error",
        "message": "An error occurred while initializing payment",
        "error": "Error message here"
      }
      ```

### Flow:

1. The endpoint takes the user's email, amount, course IDs, and a redirect URL to Paystack.
2. If `courseIds` is not an array, it converts it into an array.
3. A request is sent to Paystack's API to initialize the transaction, with the `courseIds` passed as metadata.
4. If successful, Paystack returns a payment URL and other relevant data, which is sent back to the user.
5. If an error occurs during the request, an appropriate error message is returned.

### 9. Verify Payment and Add Courses to User

- **URL**: `/verify/:reference`
- **Method**: `GET`
- **Description**: Verifies the payment reference using Paystack, and if successful, adds the purchased courses to the user's profile.
- **Headers**:
  - **`Authorization`**: Bearer token required to verify the user.
- **Request Parameters**:
  - **`reference`** (required): The payment reference from Paystack.
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**: JSON object confirming that payment was verified and courses were added to the user's profile.
  - **Example**:
    ```json
    {
      "status": "success",
      "message": "Payment verified and courses added to user",
      "data": {
        "reference": "abc123",
        "amount": 5000,
        "currency": "NGN",
        "status": "success",
        "metadata": {
          "courseIds": ["courseId1", "courseId2"]
        }
      }
    }
    ```
- **Error Responses**:
  - **Code**: `400 Bad Request` – Payment verification failed.
    - **Content**:
      ```json
      {
        "status": "error",
        "message": "Payment verification failed",
        "data": {}
      }
      ```
  - **Code**: `404 Not Found` – User not found.
    - **Content**:
      ```json
      {
        "status": "error",
        "message": "User not found"
      }
      ```
  - **Code**: `409 Conflict` – All selected courses are already owned by the user.
    - **Content**:
      ```json
      {
        "message": "All selected courses are already owned by user"
      }
      ```
  - **Code**: `500 Internal Server Error` – Server error occurred during verification.
    - **Content**:
      ```json
      {
        "status": "error",
        "message": "An error occurred while verifying payment",
        "error": "Error message here"
      }
      ```

### Flow:

1. The endpoint takes the payment `reference` and verifies it with Paystack's API.
2. If the payment is successful, it retrieves the `courseIds` from the metadata and checks if they are already in the user's profile.
3. For each course that the user doesn't own, it fetches the course data, including its modules and lessons.
4. It adds the course and lessons to the user's profile, enabling the first lesson in the first module.
5. If no new courses are added, it returns a conflict response indicating that the user already owns the courses.
6. In case of errors during verification or processing, appropriate error messages are returned.

### 10. Get User's Paid Courses

- **URL**: `/user/paidcourses`
- **Method**: `GET`
- **Description**: Retrieve a list of courses that the user has paid for.
- **Headers**:
  - **`Authorization`**: Bearer token required to authenticate the request.
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**: JSON array with details of the paid courses.
  - **Example**:
    ```json
    [
      {
        "_id": "60c72b1f9b1d4c3f241b5e36",
        "courseName": "ROOF AND STRUCTURAL WATERPROOFING",
        "tutorName": "Tunde Adebayo",
        "courseCategory": "Construction",
        "courseMedia": "https://plusworld.s3.amazonaws.com/coursefiles/3.+ROOF+AND+STRUCTURAL+WATERPROOFING.pptx",
        "mediaType": ["pptx"],
        "new": true,
        "price": 299.99,
        "duration": 10,
        "description": [
          "Understand the principles of roof and structural waterproofing.",
          "Learn about different waterproofing materials and their applications.",
          "Gain hands-on experience with waterproofing techniques."
        ]
      },
      {
        "_id": "60c72b1f9b1d4c3f241b5e37",
        "courseName": "INTRODUCTION TO ROOFS AND ROOFING SYSTEMS",
        "tutorName": "Chinedu Eze",
        "courseCategory": "Construction",
        "courseMedia": "https://plusworld.s3.amazonaws.com/coursefiles/1.+INTRODUCTION+TO+ROOFS+AND+ROOFING+SYSTEMS.+Ebizi1.pptx",
        "mediaType": ["pptx"],
        "new": true,
        "price": 149.99,
        "duration": 6,
        "description": [
          "Explore different types of roofs and roofing systems.",
          "Understand the components and design of roofing systems.",
          "Learn about the materials used in various roofing applications."
        ]
      }
    ]
    ```
- **Error Responses**:

  - **Code**: `404 Not Found`
    - **Content**: `{ "message": "User not found" }`
    - **Description**: The user could not be found in the database.
  - **Code**: `404 Not Found`
    - **Content**: `{ "message": "No paid courses found" }`
    - **Description**: No courses have been found that the user has paid for.
  - **Code**: `500 Internal Server Error`
    - **Content**: `{ "message": "Error fetching users or courses", "error": "Error details" }`
    - **Description**: An unexpected error occurred while trying to fetch the user's paid courses.

- **Notes**:

  - The `userId` is obtained from the authentication token and used to find the user in the database.
  - `paidCoursesIds` is an array of course IDs extracted from the user's courses list.
  - Each course ID is used to fetch the corresponding course details from the `Course` collection.
  - Courses that could not be found are filtered out of the final response.

    ### 11. Get Specific Lesson and Track User Progress

- **URL**: `/courses/:courseId/lesson/:lessonId`
- **Method**: `GET`
- **Description**: Retrieves a specific lesson from a course and updates the user's progress for that lesson.
- **Headers**:
  - **`Authorization`**: Bearer token required to verify user.
- **URL Parameters**:
  - **`courseId`** (required): The ID of the course containing the lesson.
  - **`lessonId`** (required): The ID of the lesson to retrieve.
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**: JSON object with the lesson and user progress information.
  - **Example**:
    ```json
    {
      "lesson": {
        "_id": "lessonId",
        "lessonNo": "Lesson1",
        "mediaUrl": "https://example.com"
      },
      "userLesson": {
        "lessonId": "lessonId",
        "isOpened": true,
        "progress": 0,
        "completed": false
      }
    }
    ```
- **Error Responses**:
  - **Code**: `404 Not Found`
    - **Content**:
      ```json
      {
        "message": "User not found"
      }
      ```
    - **Content**:
      ```json
      {
        "message": "Course not found in user's courses"
      }
      ```
    - **Content**:
      ```json
      {
        "message": "Course not found"
      }
      ```
    - **Content**:
      ```json
      {
        "message": "Module not found"
      }
      ```
    - **Content**:
      ```json
      {
        "message": "Lesson not found"
      }
      ```
  - **Code**: `500 Internal Server Error`
    - **Content**:
      ```json
      {
        "message": "An error occurred while retrieving the lesson",
        "error": "Error message here"
      }
      ```

### 12. Add Multiple Courses to Cart

- **URL**: `/user/multiplecart/add`
- **Method**: `POST`
- **Description**: Add multiple courses to the user's cart.
- **Headers**:
  - **`Authorization`**: Bearer token required to verify user.
- **Request Body**:
  - **`courseIds`** (required): An array of course IDs to add to the cart.
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**: JSON object with a success message.
  - **Example**:
    ```json
    {
      "message": "Courses added to cart successfully"
    }
    ```
- **Error Responses**:

  - **Code**: `400 Bad Request`
    - **Content**: `{ "message": "Invalid or missing course IDs" }`
    - **Description**: The request body does not include valid course IDs or is not an array.
  - **Code**: `404 Not Found`
    - **Content**: `{ "message": "Course with ID {courseId} not found" }`
    - **Description**: A course with one of the provided IDs was not found.
  - **Code**: `400 Bad Request`
    - **Content**: `{ "message": "All courses are already in the cart" }`
    - **Description**: All provided courses are already present in the user's cart.
  - **Code**: `500 Internal Server Error`

    - **Content**: `{ "message": "Internal server error" }`
    - **Description**: An unexpected error occurred while processing the request.

    ### 13. Remove Item from Cart

- **URL**: `/user/cart/remove`
- **Method**: `DELETE`
- **Description**: Remove an item from the user's cart.
- **Headers**:
  - **`Authorization`**: Bearer token required to verify user.
- **Request Body**:
  - **`productId`** (required): The ID of the product to remove from the cart.
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**: JSON object with a success message.
  - **Example**:
    ```json
    {
      "message": "Item deleted from cart successfully"
    }
    ```
- **Error Responses**:

  - **Code**: `401 Unauthorized`
    - **Content**: `{ "message": "Unauthorized" }`
    - **Description**: The user is not authenticated or the token is missing.
  - **Code**: `404 Not Found`
    - **Content**: `{ "message": "User not found" }`
    - **Description**: The user with the specified ID was not found.
  - **Code**: `500 Internal Server Error`

    - **Content**: `{ "message": "Internal server error" }`
    - **Description**: An unexpected error occurred while processing the request.

    ### 14. Get Paid Course with Lesson Progress

- **URL**: `/user/paidcourses/:courseId`
- **Method**: `GET`
- **Description**: Retrieves a specific paid course for the authenticated user, including detailed lesson progress.
- **Headers**:
  - **`Authorization`**: Bearer token required to verify user.
- **URL Parameters**:
  - **`courseId`** (required): The ID of the course to retrieve.
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**: JSON object containing the course details along with lesson progress for the user.
  - **Example**:
    ```json
    {
      "course": {
        "_id": "courseId",
        "title": "Course Title",
        "description": "Course description here",
        "courseModules": [
          {
            "moduleName": "Module 1",
            "lessons": [
              {
                "_id": "lessonId1",
                "lessonNo": 1,
                "mediaUrl": "https://example.com/media1",
                "progress": 50,
                "completed": false,
                "isOpened": true,
                "isEnabled": false
              },
              {
                "_id": "lessonId2",
                "lessonNo": 2,
                "mediaUrl": "https://example.com/media2",
                "progress": 100,
                "completed": true,
                "isOpened": true,
                "isEnabled": false
              }
            ]
          }
        ]
      },
      "completed": false
    }
    ```
- **Error Responses**:
  - **Code**: `404 Not Found`
    - **Content**:
      ```json
      {
        "message": "User not found"
      }
      ```
    - **Content**:
      ```json
      {
        "message": "Course not found in user's paid courses"
      }
      ```
    - **Content**:
      ```json
      {
        "message": "Course not found"
      }
      ```
  - **Code**: `500 Internal Server Error`
    - **Content**:
      ```json
      {
        "message": "An error occurred",
        "error": "Error message here"
      }
      ```

### 15. Mark Lesson as Completed and Enable Next Lesson

- **URL**: `/user/courses/:courseId/lesson/:lessonId/complete`
- **Method**: `POST`
- **Description**: Marks a specific lesson as completed for the authenticated user and enables the next lesson in sequence, either within the same module or in the next module.
- **Headers**:
  - **`Authorization`**: Bearer token required to verify the user.
- **URL Parameters**:
  - **`courseId`** (required): The ID of the course containing the lesson.
  - **`lessonId`** (required): The ID of the lesson to be marked as completed.
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**: JSON object with a success message.
  - **Example**:
    ```json
    {
      "message": "Lesson marked as completed and next lesson enabled"
    }
    ```
- **Error Responses**:
  - **Code**: `404 Not Found`
    - **Content**:
      ```json
      {
        "message": "User not found"
      }
      ```
    - **Content**:
      ```json
      {
        "message": "Course not found in user's courses"
      }
      ```
    - **Content**:
      ```json
      {
        "message": "Course not found"
      }
      ```
    - **Content**:
      ```json
      {
        "message": "Modules not found in course"
      }
      ```
    - **Content**:
      ```json
      {
        "message": "Lesson not found"
      }
      ```
    - **Content**:
      ```json
      {
        "message": "Lesson not found in user's course progress"
      }
      ```
  - **Code**: `500 Internal Server Error`
    - **Content**:
      ```json
      {
        "message": "An error occurred while completing the lesson",
        "error": "Error message here"
      }
      ```

### Flow:

1. The user's course progress is retrieved, and the lesson is marked as completed by setting `completed: true` and `progress: 100`.
2. The next lesson in the same module or the first lesson in the next module is found and enabled by setting `isEnabled: true`.
3. The user’s progress is saved.
4. If the lesson or course is not found, appropriate error messages are returned.

# Password Reset Functionality

## 16. Request Password Reset

- **URL**: `/auth/forgot-password`
- **Method**: `POST`
- **Description**: Initiates the password reset process by generating a reset token and sending a reset link to the user's email.
- **Request Body**:
  - **`email`** (required): The email address associated with the account for which the password reset is requested.
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**: JSON object confirming that the password reset link has been sent to the user's email.
  - **Example**:
    ```json
    {
      "message": "Password reset link sent to your email address."
    }
    ```
- **Error Responses**:
  - **Code**: `404 Not Found` – No account found with that email address.
    - **Content**:
      ```json
      {
        "message": "No account found with that email address."
      }
      ```
  - **Code**: `500 Internal Server Error` – Server error occurred while processing the request.
    - **Content**:
      ```json
      {
        "message": "Server error"
      }
      ```

### Flow:

**Request Password Reset**:

1.  The user provides their email address to request a password reset.
2.  A reset token is generated and stored in the user document along with an expiration date (5 minutes from the current time).
3.  An email containing a reset link with the token is sent to the user.

## 17. Reset Password

- **URL**: `/auth/reset-password`
- **Method**: `POST`
- **Description**: Resets the password for the user associated with the provided reset token.
- **Request Body**:
  - **`token`** (required): The reset token sent to the user's email.
  - **`password`** (required): The new password to be set for the user.
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**: JSON object confirming that the password has been successfully updated.
  - **Example**:
    ```json
    {
      "message": "Password has been successfully updated."
    }
    ```
- **Error Responses**:
  - **Code**: `400 Bad Request` – The reset token is invalid or has expired.
    - **Content**:
      ```json
      {
        "message": "Password reset token is invalid or has expired."
      }
      ```
  - **Code**: `500 Internal Server Error` – Server error occurred while processing the request.
    - **Content**:
      ```json
      {
        "message": "Server error"
      }
      ```

### Flow:

**Reset Password**:

1.  The user submits the reset token(automatically after clicking on the link) and their new password.
2.  The token is validated against the stored token and checked for expiration.
3.  If valid, the new password is hashed and saved, and the reset token and expiration are cleared from the user document.
4.  A success message is returned to the user.

## 18. Initiate Signup

- **URL**: `/auth/signup`
- **Method**: `POST`
- **Description**: Initiates the signup process by generating a signup token and sending a confirmation link to the user's email.
- **Request Body**:
  - **`fullname`** (required): The full name of the user.
  - **`username`** (required): The desired username for the account.
  - **`email`** (required): The email address for the account.
  - **`password`** (required): The password for the account.
  - **`phone`** (required): The phone number of the user.
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**: JSON object confirming that the signup email has been sent.
  - **Example**:
    ```json
    {
      "success": true,
      "message": "Email sent, signup incomplete"
    }
    ```
- **Error Responses**:
  - **Code**: `400 Bad Request` – One or more required fields are missing.
    - **Content**:
      ```json
      {
        "success": false,
        "message": "All fields are required"
      }
      ```
  - **Code**: `400 Bad Request` – Username already exists.
    - **Content**:
      ```json
      {
        "success": false,
        "message": "Username already exists"
      }
      ```
  - **Code**: `500 Internal Server Error` – Server error occurred while processing the request.
    - **Content**:
      ```json
      {
        "success": false,
        "message": "Internal server error"
      }
      ```

### Flow:

**Initiate Signup**:

- The user provides their full name, username, email, password, and phone number to initiate the signup process.
- A unique signup token is generated, and the user data is stored with a status of "incomplete signup".
- An email containing a confirmation link with the signup token is sent to the user.

## 19. Complete Signup

- **URL**: `/auth/complete-signup`
- **Method**: `POST`
- **Description**: Completes the signup process by validating the signup token and setting the user's status to completed.
- **Request Body**:
  - **`token`** (required): The token sent to the user's email to verify their signup.
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**: JSON object confirming that the signup has been completed.
  - **Example**:
    ```json
    {
      "message": "signup completed."
    }
    ```
- **Error Responses**:
  - **Code**: `400 Bad Request` – The signup token is invalid or has expired.
    - **Content**:
      ```json
      {
        "message": "Password reset token is invalid or has expired."
      }
      ```
  - **Code**: `500 Internal Server Error` – Server error occurred while processing the request.
    - **Content**:
      ```json
      {
        "message": "Server Error"
      }
      ```

### Flow:

**Complete Signup**:

- The user submits the signup token received in their email.
- The token is validated against the stored token and checked for expiration.
- If valid, the user's status is updated to "completed".
- A success message is returned to the user.

# Login Functionality

## 20 .Login User

- **URL**: `/auth/login`
- **Method**: `POST`
- **Description**: Authenticates a user by verifying their email and password, and returns a JWT token if successful.
- **Request Body**:
  - **`email`** (required): The email address of the user.
  - **`password`** (required): The password for the user's account.
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**: JSON object containing a success message, JWT token, and user details.
  - **Example**:
    ```json
    {
      "success": true,
      "token": "your_jwt_token_here",
      "user": {
        "_id": "user_id",
        "fullname": "User Full Name",
        "username": "username",
        "email": "user@example.com",
        "phone": "123-456-7890",
        "status": "completed"
      }
    }
    ```
- **Error Responses**:
  - **Code**: `401 Unauthorized` – Invalid email or password.
    - **Content**:
      ```json
      {
        "success": false,
        "message": "Invalid username or password"
      }
      ```
  - **Code**: `200 OK` – User signup is not completed.
    - **Content**:
      ```json
      {
        "message": "user sign up not completed"
      }
      ```
  - **Code**: `500 Internal Server Error` – Server error occurred while processing the request.
    - **Content**:
      ```json
      {
        "success": false,
        "message": "Internal server error"
      }
      ```

### Flow:

1. **Login User**:
   - The user provides their email and password.
   - The application searches for a user with the provided email.
   - If no user is found or the password does not match, an error response is returned indicating invalid credentials.
   - If the user exists but has an "incomplete signup" status, a message is returned indicating that the signup process is not complete.
   - If the login is successful and the user’s status is "completed", a JWT token is generated and returned to the user along with their details.

### Flow:

**Login User**:

- The user provides their email and password.
- The application searches for a user with the provided email.
- If no user is found or the password does not match, an error response is returned indicating invalid credentials.
- If the user exists but has an "incomplete signup" status, a message is returned indicating that the signup process is not complete.
- If the login is successful and the user’s status is "completed", a JWT token is generated and returned to the user along with their details.
