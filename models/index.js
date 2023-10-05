const User = require('./User');
const BlogPost = require('./BlogPost');
const Comment = require('./Comment');

User.hasMany(BlogPost, {
  foreignKey: 'user_id',
  onDelete:'CASCADE'
});

BlogPost.belongsTo(User);

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete:'CASCADE'
});

Comment.belongsTo(User);

BlogPost.hasMany(Comment, {
  foreignKey: 'blogpost_id',
  onDelete:'CASCADE'
});

Comment.belongsTo(BlogPost);

module.exports = { User, BlogPost, Comment };