const sequelize = require('../config/connection');
const seedUsers = require('./user-seeds');
const seedBlogPosts = require('./blogpost-seeds');
const {User, BlogPost} = require('../models');

const seedAll = async () => {

  console.log('\n----- DATABASE SYNCED -----\n');
  await sequelize.sync({ force: true });
  
  const users = await User.bulkCreate(seedUsers);
  console.log('\n----- USERS SEEDED -----\n');
  
  const kids = await BlogPost.bulkCreate(seedBlogPosts);
  console.log('\n----- BLOGPOSTS SEEDED -----\n');

  process.exit(0);
}

seedAll();