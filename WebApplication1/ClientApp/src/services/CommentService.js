
const CommentService = {
    getComments: async function (postId) {
        const requestOptions = {
            method: 'GET',
        };

        var comments = await fetch('api/CommentController/getComments?postId=' + postId, requestOptions)
            .then(response => response.json());

        return comments;
    }
};

export default CommentService;