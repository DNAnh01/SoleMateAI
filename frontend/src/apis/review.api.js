import http from '~/utils/http';

const { default: configs } = require('~/configs');

const reviewApi = {
    async createReview({ shoeId, rating, comment, heartCount = 0 }) {
        return await http.post(`${configs.baseUrl.review.create}`, {
            shoe_id: shoeId,
            rating: rating,
            comment: comment,
            heart_count: heartCount,
        });
    },
    async likeReview(reviewId) {
        return await http.patch(`${configs.baseUrl.review.like_review}${reviewId}`);
    },
};
export default reviewApi;
