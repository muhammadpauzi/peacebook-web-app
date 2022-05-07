const ALLOWED_SORTS = require("../../constants/configs.js");
const {
    buildValidationMessages,
} = require("../../helpers/buildValidationMessages.js");
const {
    errorResponse,
    successResponse,
} = require("../../helpers/responses.js");
const Post = require("../../models/Post.js");
const {
    isDevelopment,
    getBaseURL,
    getNextPaginationNumber,
    getPreviousPaginationNumber,
    buildAndGetSort,
} = require("../../utils/index.js");
const postSchema = require("../../validations/postSchema.js");

const findAllPosts = async (req, res) => {
    try {
        let { skip = 0, limit = 10, q = "", sort = "ASC" } = req.query;
        limit = Number(limit);
        skip = Number(skip);
        const filters = q ? { $text: { $search: q } } : {};
        sort = buildAndGetSort(sort, ALLOWED_SORTS);
        filters.author = req.user.id;

        const posts = await Post.find()
            .sort({ createdAt: sort })
            .limit(limit)
            .skip(skip)
            .populate("author");

        return successResponse(res, {
            url: getBaseURL(req),
            total: posts.length,
            previous: getPreviousPaginationNumber({ limit, skip }),
            next: getNextPaginationNumber({
                length: posts.length,
                limit,
                skip,
            }),
            data: posts,
        });
    } catch (error) {
        return errorResponse(res, error);
    }
};

const createPost = async (req, res) => {
    try {
        const data = postSchema.validate({ content: req.body.content });

        // if request not valid
        if (data.error) {
            const errors = buildValidationMessages(data.error);
            return errorResponse(res, { errors }, 422);
        }

        // create new post document
        const post = await Post.create({
            content: data.value.content,
            author: req.user.id,
        });

        return successResponse(res, { data: post }, 201);
    } catch (error) {
        return errorResponse(res, error);
    }
};

module.exports = {
    findAllPosts,
    createPost,
};
