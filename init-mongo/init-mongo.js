// Create user
dbAdmin = db.getSiblingDB("admin");
dbAdmin.createUser({
  user: "dino",
  pwd: "dino",
  roles: [{ role: "userAdminAnyDatabase", db: "admin" }]
});

// Authenticate user
dbAdmin.auth({
  user: "dino",
  pwd: "dino",
});

// Create DB and collection
db = new Mongo().getDB("dinocommerce");