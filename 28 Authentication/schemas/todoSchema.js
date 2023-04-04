const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//  Instant method 
todoSchema.methods = {
  findActive: function(){
    return mongoose.model("Todo").find({ status: "active"});
  },
  findActiveWithCallBack: function(cb){
    return mongoose.model("Todo").find({ status: "active"}, cb);
  }
}

// static methods
todoSchema.statics = {
  findByJS: function () {
    return this.find({ title: /js/i }); //this = mongoose.model("Todo")
  },
};

// query helpers
todoSchema.query = {
  byLanguage: function (language) {
    return this.find({ title: new RegExp(language, "i") }); // new RegExp()
  },
};

module.exports = todoSchema;
