const ALLOWED_SORTS = require("../../constants/configs.js");
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

const findAllPosts = async (req, res) => {
    try {
        let { skip = 0, limit = 10, q = "", sort = "ASC" } = req.query;
        limit = Number(limit);
        skip = Number(skip);
        const filters = q ? { $text: { $search: q } } : {};
        sort = buildAndGetSort(sort, ALLOWED_SORTS);

        const posts = await Post.find(filters)
            .sort({ createdAt: sort })
            .limit(limit)
            .skip(skip);

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

module.exports = {
    findAllPosts,
};
