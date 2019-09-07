import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Layout } from './Layout';
//import axios from 'axios';

async function getUser(id) {
    const requestOptions = {
        method: 'GET',
        /*headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },*/
        //body: JSON.stringify({ "UserId": id })
    };

    var user;
    await fetch('api/UserController/getUser?id='+id, requestOptions)
        .then(response => response.json())
        .then(data => {
            user = data;
        });

    return user;
}
async function getComments(postId) {
    const requestOptions = {
        method: 'GET',
        /*headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },*/
        //body: JSON.stringify({ "UserId": id })
    };

    var comments;
    await fetch('api/CommentController/getComments?postId=' + postId, requestOptions)
        .then(response => response.json())
        .then(data => {
            comments = data;
        });

    return comments;
}

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

        return data;
    });
}

export class PostDetails extends Component {
    displayName = PostDetails.name

    constructor(props) {
        super(props);
        this.state = {
            post: [],
            user: {},
            comments: [],
            comment: ""
        };
    }

    async componentDidMount() {
        console.log(this.props.location.state)
        var user = await getUser(this.props.location.state.post.posterId);
        var comments = await getComments(this.props.location.state.post.postId);
        console.log(comments);
        this.setState({
            post: this.props.location.state.post,
            user: user,
            comments: comments
        });
    }

    handleNewCommentChange = (e, th) => {
        var comment = e.target.value;
        console.log(comment);
        this.setState({
            comment: comment
        });
    }

    addComment = async (th) => {
        var user = JSON.parse(localStorage.getItem('user'));

        await fetch('api/CommentController/Create', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "comment": th.state.comment, "postId": th.state.post.postId, "userId": user.userId })
        }).then(await handleResponse);

        var comments = await getComments(this.state.post.postId);
        this.setState({
            comments: comments
        });
    }

    render() {
        return (
            <Layout>
                <p>
                    POST DETAILS
                </p>
                <div>
                    Author: {this.state.user.lastName}
                </div>
                <div>
                    Content
                    <p>{this.state.post.content}</p>
                </div>
                <div>
                    <input type="text" placeholder="Komentiraj" onChange={e => this.handleNewCommentChange(e, this)}></input>
                    <button onClick={e => this.addComment(this)}>Submit</button>
                    <p>Komentari:</p>
                    {this.state.comments.map(comment => {
                        return (
                            <div key={comment.commentId}>
                                <p>Komentar:</p>
                                <p>{comment.user.lastName}: {comment.content}</p>
                            </div>
                        )
                    })}
                </div>
            </Layout>
        );
    }
}
