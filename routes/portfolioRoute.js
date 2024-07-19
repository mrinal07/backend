const router = require("express").Router();

const {
  Intro,
  About,
  Project,
  Contact,
  Experience,
  Course,
} = require("../models/portfolioModel");

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = process.env.mongo_url;
const url = process.env.BASE_URL;

function mongoStableApi() {
  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  return client;
}

// Get All Portfolio Data
router.get("/get-portfolio-data", async (req, res) => {
  try {
    client = mongoStableApi();
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = await client.db("mern-portfolio");

    const introCollection = await database.collection("intros");
    const aboutCollection = await database.collection("abouts");
    const projectCollection = await database.collection("projects");
    const contactCollection = await database.collection("contacts");
    const experienceCollection = await database.collection("experiences");
    const courseCollection = await database.collection("courses");

    const intros = await introCollection.find().toArray();
    const abouts = await aboutCollection.find().toArray();
    const projects = await projectCollection.find().toArray();
    const contacts = await contactCollection.find().toArray();
    const experiences = await experienceCollection.find().toArray();
    const courses = await courseCollection.find().toArray();

    res.status(200).send({
      intro: intros,
      about: abouts,
      projects: projects,
      contact: contacts[0],
      experiences: experiences,
      courses: courses,
    });
  } catch (error) {
    res.status(500).send(error);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
});

// Update Intro
router.post("/update-intro", async (req, res) => {
  debugger;
  try {
    // console.log("mrinal=> "+req.body.welcomeText);
    // console.log("mrinal=> "+req.body._id);
    client = mongoStableApi();

    await client.connect();

    const database = await client.db("mern-portfolio");
    const collection = await database.collection("intros");

    // const intro = await collection.findOneAndUpdate(
    //   { _id: req.body._id },
    //   req.body,
    //   {new: true}
    // );

    const filter = { _id: req.body._id };
    const update = {
      $set: {
        _id: req.body._id,
        welcomeText: req.body.welcomeText,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        caption: req.body.caption,
        description: req.body.description,
      },
    };
    // const update = { $set: req.body };

    /* Set the upsert option to insert a document if no documents match
    the filter */
    const options = { upsert: true };

    const result = await collection.updateOne(filter, update, options);

    // console.log(result);

    res.status(200).send({
      data: result,
      success: true,
      message: "Intro Updated Successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
});

// Update About
router.post("/update-about", async (req, res) => {
  debugger;
  try {
    client = mongoStableApi();

    await client.connect();

    const database = await client.db("mern-portfolio");
    const collection = await database.collection("abouts");

    const filter = { _id: req.body._id };
    const update = {
      $set: {
        _id: req.body._id,
        lottieURL: req.body.lottieURL,
        description1: req.body.description1,
        description2: req.body.description2,
        skills: req.body.skills,
      },
    };

    /* Set the upsert option to insert a document if no documents match
    the filter */
    const options = { upsert: true };

    const result = await collection.updateOne(filter, update, options);

    // console.log(result);

    res.status(200).send({
      data: result,
      success: true,
      message: "About Updated Successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
});

// Update Contact
router.post("/update-contact", async (req, res) => {
  debugger;
  try {
    client = mongoStableApi();

    await client.connect();

    const database = await client.db("mern-portfolio");
    const collection = await database.collection("contacts");

    const filter = { _id: req.body._id };
    const update = {
      $set: {
        _id: req.body._id,
        name: req.body.name,
        gender: req.body.gender,
        email: req.body.email,
        mobile: req.body.mobile,
        age: req.body.age,
        address: req.body.address,
      },
    };
    console.log(update);

    /* Set the upsert option to insert a document if no documents match
    the filter */
    const options = { upsert: true };

    const result = await collection.updateOne(filter, update, options);

    console.log(result);

    res.status(200).send({
      data: result,
      success: true,
      message: "About Updated Successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
});

// Add Experience
router.post("/add-experience", async (req, res) => {
  debugger;
  try {
    client = mongoStableApi();

    await client.connect();

    console.log(req.body);
    console.log(req.body._id);

    const database = await client.db("mern-portfolio");
    const collection = await database.collection("experiences");

    // const filter = { _id: req.body._id };

    const addExperience = {
      // _id: req.body._id,
      title: req.body.title,
      period: req.body.period,
      company: req.body.company,
      description: req.body.description,
    };

    // const options = { upsert: true };

    const result = await collection.insertOne(addExperience);
    console.log("result", result);

    res.status(200).send({
      data: result,
      success: true,
      message: "Experience Added Successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
});

// Update Experience
router.post("/update-experience", async (req, res) => {
  debugger;
  try {
    client = mongoStableApi();

    await client.connect();

    const database = await client.db("mern-portfolio");
    const collection = await database.collection("experiences");
    console.log("req=>", req.body);
    console.log("req=>", req.body._id);

    // to update the document having this structure we use ObjectId
    // "_id": { "$oid": "668cc903b6e413bf015cd9a9" }

    const filter = { _id: new ObjectId(req.body._id) };

    console.log("filter=>", filter);

    const update = {
      $set: {
        // _id: req.body._id,
        title: req.body.title,
        period: req.body.period,
        company: req.body.company,
        description: req.body.description,
      },
    };
    console.log(update);

    /* Set the upsert option to insert a document if no documents match
    the filter */
    const options = { upsert: false };

    const result = await collection.updateOne(filter, update, options);
    console.log("result", result);

    res.status(200).send({
      data: result,
      success: true,
      message: "Experiences Updated Successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
});

// Delete Experience
router.post("/delete-experience", async (req, res) => {
  debugger;
  try {
    client = mongoStableApi();

    await client.connect();

    const database = await client.db("mern-portfolio");
    const collection = await database.collection("experiences");

    const filter = { _id: new ObjectId(req.body._id) };
    console.log(filter);

    const result = await collection.deleteOne(filter);
    console.log(result);

    result.deletedCount === 1
      ? res.status(200).send({
          data: result,
          success: true,
          message: "Experiences Updated Successfully",
        })
      : res.status(200).send({
          data: result,
          success: false,
          message: "Experiences Not Deleted Server issue",
        });
  } catch (error) {
    res.status(500).send(error);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
});

// Add Project
router.post("/add-project", async (req, res) => {
  debugger;
  try {
    client = mongoStableApi();

    await client.connect();

    console.log(req.body);
    console.log(req.body._id);

    const database = await client.db("mern-portfolio");
    const collection = await database.collection("projects");

    // const filter = { _id: req.body._id };

    const addProject = {
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      link: req.body.link,
      technologies: req.body.technologies,
    };

    // const options = { upsert: true };

    const result = await collection.insertOne(addProject);
    console.log("result", result);

    res.status(200).send({
      data: result,
      success: true,
      message: "Project Added Successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
});

// Update Project
router.post("/update-project", async (req, res) => {
  debugger;
  try {
    client = mongoStableApi();

    await client.connect();

    const database = await client.db("mern-portfolio");
    const collection = await database.collection("projects");

    const filter = { _id: new ObjectId(req.body._id) };

    const update = {
      $set: {
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        link: req.body.link,
        technologies: req.body.technologies,
      },
    };

    const options = { upsert: false };

    const result = await collection.updateOne(filter, update, options);

    res.status(200).send({
      data: result,
      success: true,
      message: "Project Updated Successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  } finally {
    await client.close();
  }
});

// Delete Project
router.post("/delete-project", async (req, res) => {
  debugger;
  try {
    client = mongoStableApi();

    await client.connect();

    const database = await client.db("mern-portfolio");
    const collection = await database.collection("projects");

    const filter = { _id: new ObjectId(req.body._id) };

    const result = await collection.deleteOne(filter);

    result.deletedCount === 1
      ? res.status(200).send({
          data: result,
          success: true,
          message: "Project Deleted Successfully",
        })
      : res.status(200).send({
          data: result,
          success: false,
          message: "Project Not Deleted Server issue",
        });
  } catch (error) {
    res.status(500).send(error);
  } finally {
    await client.close();
  }
});

// Add Course
router.post("/add-course", async (req, res) => {
  debugger;
  try {
    client = mongoStableApi();

    await client.connect();

    console.log(req.body);
    console.log(req.body._id);

    const database = await client.db("mern-portfolio");
    const collection = await database.collection("courses");

    // const filter = { _id: req.body._id };

    const addCourse = {
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      link: req.body.link,
    };

    // const options = { upsert: true };

    const result = await collection.insertOne(addCourse);
    console.log("result", result);

    res.status(200).send({
      data: result,
      success: true,
      message: "Course Added Successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  } finally {
    await client.close();
  }
});

// Update Course
router.post("/update-course", async (req, res) => {
  debugger;
  try {
    client = mongoStableApi();

    await client.connect();

    const database = await client.db("mern-portfolio");
    const collection = await database.collection("courses");

    const filter = { _id: new ObjectId(req.body._id) };

    const update = {
      $set: {
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        link: req.body.link,
      },
    };

    const options = { upsert: false };

    const result = await collection.updateOne(filter, update, options);

    res.status(200).send({
      data: result,
      success: true,
      message: "Course Updated Successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  } finally {
    await client.close();
  }
});

// Delete Course
router.post("/delete-course", async (req, res) => {
  debugger;
  try {
    client = mongoStableApi();

    await client.connect();

    const database = await client.db("mern-portfolio");
    const collection = await database.collection("courses");

    const filter = { _id: new ObjectId(req.body._id) };

    const result = await collection.deleteOne(filter);

    result.deletedCount === 1
      ? res.status(200).send({
          data: result,
          success: true,
          message: "Course Deleted Successfully",
        })
      : res.status(200).send({
          data: result,
          success: false,
          message: "Course Not Deleted Server issue",
        });
  } catch (error) {
    res.status(500).send(error);
  } finally {
    await client.close();
  }
});

// Admin Login
router.post("/admin-login", async (req, res) => {
  debugger;
  try {
    client = mongoStableApi();

    await client.connect();

    const database = await client.db("mern-portfolio");
    const collection = await database.collection("users");

    const filter = { username: req.body.username, password: req.body.password };

    const result = await collection.findOne(filter);
    result.password = "#";
    if (result) {
      res.status(200).send({
        data: result,
        success: true,
        message: "Login Successfully",
      });
    } else {
      res.status(200).send({
        data: result,
        success: false,
        message: "Login Failed",
      });
    }
  } catch (error) {
    res.status(500).send(error);
  } finally {
    await client.close();
  }
});

// Add Contact Us
router.post("/contact-us", async (req, res) => {
  debugger;
  try {
    client = mongoStableApi();

    await client.connect();

    const database = await client.db("mern-portfolio");
    const collection = await database.collection("queries");

    const addQuery = {
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    };

    const result = await collection.insertOne(addQuery);

    if (result.acknowledged) {
      
      res.status(200).send({
        data: result,
        success: true,
        message: "Contact Added Successfully",
      });

      console.log("Document inserted successfully!");
      console.log(`Inserted document ID: ${result.insertedId}`);
    } else {
      console.log("Document insertion failed.");
    }

    
  } catch (error) {
    res.status(500).send(error);
  } finally {
    await client.close();
  }
});

module.exports = router;
