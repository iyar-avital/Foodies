const mongoose = require("mongoose");

const forumSchema = mongoose.Schema({
  name: {
    type: "String",
    index: true,
    required: [true, "can't be blank"],
  },
});
exports.ForumModel = mongoose.model("forums", forumSchema);
