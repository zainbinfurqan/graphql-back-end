const mongoose = require("mongoose");

// const keys = require("./keys");
mongoose
    .connect('mongodb+srv://zain:zainahmed@cluster0.b9hvt.mongodb.net/graphql?retryWrites=true&w=majority', {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(() => console.log("Database connected!"))
    .catch(err => console.log("error connecting database =>", err));

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);