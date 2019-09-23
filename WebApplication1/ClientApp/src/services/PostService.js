import React, { Component } from 'react';


async function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                //logout();
                //location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        console.log(data);
        return data;
    });
}

const PostService = {
    createPost: async function (content) {
        var user = localStorage.getItem("user");
        if (user === null) {
            alert("you need to be logged in");
            return;
        }
        var post = await fetch('api/PostController/Create', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "content": content, "poster": JSON.parse(user) })
        }).then(await handleResponse)

        return post;
    },

    getPost: async function (id) {
        const requestOptions = {
            method: 'GET',
        };

        var post = await fetch('api/PostController/getPost?id=' + id, requestOptions)
            .then(response => response.json())

        return post;
    },

    deletePost: async function (postId, posterId) {
        var user = JSON.parse(localStorage.getItem("user"));
        if (user === null) {
            alert("you need to be logged in");
            return false;
        }
        if (user.userId !== posterId) {
            alert("You can only delete your posts");
            return false;
        }

        const requestOptions = {
            method: 'DELETE'
        };

        var success = await fetch('api/PostController/delete?postId=' + postId, requestOptions)
            .then(response => response.json())

        return success;

    },

    getPosts: async function () {
        const requestOptions = {
            method: 'GET',
        };

        var posts = await fetch('api/PostController/getAllPosts', requestOptions)
                            .then(response => response.json())

        return posts;
    },

    addComment: async function (comment, postId) {
        var user = JSON.parse(localStorage.getItem('user'));
        if (user === null) {
            alert("You need to be logged for this action");
            return;
        }
        var comment = await fetch('api/CommentController/Create', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "comment": comment, "postId": postId, "userId": user.userId })
        }).then(await handleResponse);

        return comment;
    }
};

export default PostService;