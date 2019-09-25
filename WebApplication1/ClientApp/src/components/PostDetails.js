import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Layout } from './Layout';
import PostService from '../services/PostService';
import VoteService from '../services/VoteService';
import UserService from '../services/UserService';
import CommentService from '../services/CommentService';


export class PostDetails extends Component {
    displayName = PostDetails.name

    constructor(props) {
        super(props);
        this.state = {
            post: [],
            user: {},
            comments: [],
            comment: "",
            edit: false
        };
    }

    async componentDidMount() {
        var post = await PostService.getPost(this.props.location.state.postId);
        var user = await UserService.getUser(post.posterId);
        var comments = await CommentService.getComments(post.postId);

        var currentUser = JSON.parse(localStorage.getItem('user'));

        let upvotes = 0;
        let downvotes = 0;
        let currentUserVoted = -1;
        post.votes.map(v => {
            if (currentUser && v.userId === currentUser.userId) {
                currentUserVoted = v.voteType;
            }
            if (v.voteType === 0)
                upvotes++;
            else if (v.voteType === 1)
                downvotes++;
        });

        this.setState({
            post: post,
            user: user,
            comments: comments,
            upvotes: upvotes,
            downvotes: downvotes,
            currentUserVoted: currentUserVoted,
            editedValue: post.content
        });
    }

    handleNewCommentChange = (e) => {
        var comment = e.target.value;
        this.setState({
            comment: comment
        });
    }

    addComment = async () => {
        await PostService.addComment(this.state.comment, this.state.post.postId);

        var comments = await CommentService.getComments(this.state.post.postId);

        this.setState({
            comments: comments,
            comment: ""
        });

        var comment = document.getElementById("comment");
        comment.value = '';
    }

    upvoteClick = async () => {
        if (JSON.parse(localStorage.getItem('user')) === null) {
            alert("You need to be logged in to perform this action");
            return;
        }
        let upvotes = this.state.upvotes;
        let downvotes = this.state.downvotes;
        if (this.state.currentUserVoted === 0) {
            return;
        }
        else if (this.state.currentUserVoted === -1) {
            await VoteService.addVote(this.state.post.postId, 0);
            ++upvotes;
        }
        else if (this.state.currentUserVoted === 1) {
            await VoteService.editVote(this.state.post.postId, 0);
            --downvotes;
            ++upvotes;
        }
        
        this.setState({
            upvotes: upvotes,
            downvotes: downvotes,
            currentUserVoted: 0
        });
    }

    downvoteClick = async () => {
        if (JSON.parse(localStorage.getItem('user')) === null) {
            alert("You need to be logged in to perform this action");
            return;
        }
        let upvotes = this.state.upvotes;
        let downvotes = this.state.downvotes;
        if (this.state.currentUserVoted === 1) {
            return;
        }
        else if (this.state.currentUserVoted === -1) {
            await VoteService.addVote(this.state.post.postId, 1);
            ++downvotes;
        }
        else if (this.state.currentUserVoted === 0) {
            await VoteService.editVote(this.state.post.postId, 1);
            ++downvotes;
            --upvotes;
        }

        this.setState({
            upvotes: upvotes,
            downvotes: downvotes,
            currentUserVoted: 1
        });
    }

    editClick = () => {
        var user = JSON.parse(localStorage.getItem("user"));
        if (user === null) {
            alert("you need to be logged in");
            return false;
        }
        else if (user.userId !== this.state.post.posterId) {
            alert("You can only delete your posts");
            return false;
        }
        this.setState({
            edit: true
        });
    }

    submitEdit = async () => {
        var success = await PostService.editPost(this.state.post.postId, this.state.post.posterId, this.state.editedValue);
        if (success) {
            var post = this.state.post;
            post.content = this.state.editedValue;
            this.setState({
                post: post,
                edit: false
            });
        }
    }
    cancelEdit = () => {
        this.setState({
            edit: false
        });
    }

    deleteClick = async () => {
        let success = await PostService.deletePost(this.state.post.postId, this.state.post.posterId);

        if (success) {
            this.props.history.push('/');
        }
    }

    changeEditValue = (e) => {
        this.setState({
            editedValue: e.target.value
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
                    <button onClick={this.editClick}>Edit</button>
                    <button onClick={this.deleteClick}>Delete</button>
                </div>
                <div>
                    Votes
                    <p>upvotes </p>
                    <p>{this.state.upvotes}</p>
                    <p>downvotes </p>
                    <p>{this.state.downvotes}</p>
                </div>
                <div>
                    <button onClick={this.upvoteClick}>upvote</button>
                    <button onClick={this.downvoteClick}>downvote</button>
                </div>
                <div>
                    <input type="text" id="comment" placeholder="Komentiraj" onChange={e => this.handleNewCommentChange(e)}></input>
                    <button onClick={this.addComment}>Submit</button>
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
                <Modal show={this.state.edit} onHide={this.submitEdit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input type="text" defaultValue={this.state.post.content} onChange={this.changeEditValue}></input>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.cancelEdit}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.submitEdit}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Layout>
        );
    }
}
