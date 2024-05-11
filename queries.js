// create DB
// use 'tamil-combined';

// Create Collection
db.createCollection("mentors");

db["mentors"].insertOne({ name: "Sanjay", role: "MERN Mentor" });

// Automatically creates a new Collection students
db.students.insertOne({ name: "Sanjay", batch: "FSD55WE-T" });

// 1. Select all the information about Users
db.users.find(); // Returns a cursor object
// on top of which we can call the basic methods

// 2. Select the user with id 4
db.users.find({ id: 4 }); // gives array like cursor object

db.users.findOne({ id: 4 }); // gives simple object of the user information

// 3. find the user with email Sincere@april.biz
db.users.findOne({ email: "Sincere@april.biz" });

// 4. with eq operator
db.users.findOne({ email: { $eq: "Sincere@april.biz" } });

// 5. Select all the users whose age is less than 50
// lt operator in query
db.users.find({ age: { $lt: 50 } });

// 6. Select all the user whose age is greater than 50
// gt operator in query
db.users.find({ age: { $gt: 50 } });

// 7. Select all the users who age is less than or equal to 35
// lte operator in query
db.users.find({ age: { $lte: 35 } });

// 8. Select all the users whose age is between 40 and 50 ( include 40 & 50 )
db.users.find({ age: { $lte: 50, $gte: 40 } });

// 9. First two users whose age is between 40 and 50 ( include 40 & 50 )
db.users.find({ age: { $lte: 50, $gte: 40 } }, {}, { limit: 2 });

// 10. First two users
db.users.find({}, {}, { limit: 2 });

// 11. 3, 4 users whose age is between 40 and 50 ( include 40 & 50 )
db.users.find({ age: { $lte: 50, $gte: 40 } }, {}, { skip: 2, limit: 2 });

// 12. Using the cursor from find method
db.users
  .find({ age: { $lte: 50, $gte: 40 } })
  .skip(2)
  .limit(2);

// $in
// 13. select all the users whose name is in the list
// ['Clementina DuBuque', 'Nicholas Runolfsdottir V', 'Mrs. Dennis Schulist']
db.users.find({
  name: {
    $in: [
      "Clementina DuBuque",
      "Nicholas Runolfsdottir V",
      "Mrs. Dennis Schulist",
    ],
  },
});

// $nin
// 14. select all the users expect whose name is in the list
// ['Clementina DuBuque', 'Nicholas Runolfsdottir V', 'Mrs. Dennis Schulist']
db.users.find({
  name: {
    $nin: [
      "Clementina DuBuque",
      "Nicholas Runolfsdottir V",
      "Mrs. Dennis Schulist",
    ],
  },
});

// $regex
// 15. select all the users whose name has charater D in it
db.users.find({ name: { $regex: "DuBuque" } });

// Projection
// 16. Select name, id, email, website from the users coollection
db.users.find({}, { name: 1, id: 1, email: 1, website: 1 });

// 17. Select all fields except company, hobbies, address from the users coollection
db.users.find({}, { company: 0, address: 0, hobbies: 0, _id: 0 });

// handling composite fields

// Objects
// 18. select all the users who live in this zipcode "92998-3874"
db.users.find({ "address.zipcode": "92998-3874" });

// 19. select all the users who live in this lat "-37.3159"
db.users.find({ "address.geo.lat": "-37.3159" });

// Array
// 20. Select all the users who has the hobby of "Coding" or "Sleep"
// in this or that
db.users.find({ hobbies: { $in: ["Coding", "Sleep"] } });

// 21. Select all the users who has the hobby of both "Jogging" & "Cycle"
db.users.find({ hobbies: { $all: ["Jogging", "Cycle"] } });

// Deletion
// 22. Delete All Users
db.users.deleteMany({}); // Deletes all the users
db.users.deleteMany({ name: { $regex: "D" } }); // Deletes all the users who has D in name

db.users.deleteOne({ name: "Sanjay" }); // Deletes one user with name 'Sanjay'
