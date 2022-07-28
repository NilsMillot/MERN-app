exports.sequelize = require("./db");
exports.User = require("./User");
exports.Post = require("./Post");
const { Post: PostMongo } = require("../mongo");
exports.Friend = require("./Friend");
exports.Invitation = require("./Invitation");

// START TABLE ASSOCIATIONS
exports.User.hasMany(exports.Post);
exports.Post.belongsTo(exports.User);

exports.User.hasMany(exports.Friend,{as: "user", foreignKey: "userId"});
exports.Friend.belongsTo(exports.User, {as: "user", foreignKey: "userId"});

exports.User.hasMany(exports.Friend,{as: "userFriend", foreignKey: "friendId"});
exports.Friend.belongsTo(exports.User, {as: "userFriend", foreignKey: "friendId"});

exports.User.hasMany(exports.Invitation, {
  foreignKey: 'senderId',
  as: 'sendedInvitations'
});
exports.Invitation.belongsTo(exports.User, {
  foreignKey: 'senderId',
  as: 'sender'
});

exports.User.hasMany(exports.Invitation, {
  foreignKey: 'receiverId',
  as: 'receivedInvitations'
});
exports.Invitation.belongsTo(exports.User, {
  foreignKey: 'receiverId',
  as: 'receiver'
});
// END TABLE ASSOCIATIONS

async function denormalizePost(post) {
  await PostMongo.deleteOne({ _id: post.id });
  await PostMongo.create(
    await exports.Post.findByPk(post.id, {
      include: [{ model: exports.User, as: "user" }],
    })
  );
}

exports.Post.addHook("afterCreate", denormalizePost);
exports.Post.addHook("afterUpdate", denormalizePost);
exports.Post.addHook("afterDestroy", async (post) => {
  await PostMongo.deleteOne({ _id: post.id });
});

exports.User.addHook("afterUpdate", async (user) => {
  if (user.posts) {
    Promise.all(user.posts.map((post) => denormalizePost(post)));
  }
});
exports.User.addHook("afterDestroy", async (post) => {
  if (user.posts) {
    return Promise.all(
      user.posts.map((post) => PostMongo.deleteOne({ _id: post.id }))
    );
  }
});
