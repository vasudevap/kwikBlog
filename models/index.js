const User = require('./User');
const BlogPost = require('./BlogPost');

User.hasMany(BlogPost, {
  foreignKey: 'user_id',
  onDelete:'CASCADE'
});

BlogPost.belongsTo(User);


module.exports = { User, BlogPost };