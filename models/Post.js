const mongoose = require("mongoose");
const { JSDOM } = require("jsdom");
const createDomPurify = require("dompurify");
const window = new JSDOM("").window;
const dompurify = createDomPurify(window);

const PostSchema = mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
    },
    { timestamps: true }
);

PostSchema.pre("validate", async function (next) {
    this.content = dompurify.sanitize(this.content);
    next();
});

module.exports = mongoose.model("Post", PostSchema);
