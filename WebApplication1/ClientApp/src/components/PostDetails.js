import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
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
            comment: ""
        };
    }

    async componentDidMount() {
        console.log(this.props.location.state)
        var post = await PostService.getPost(this.props.location.state.postId);
        console.log(post);
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
            currentUserVoted: currentUserVoted
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
            comments: comments
        });
    }

    upvoteClick = async () => {
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
    }

    deleteClick = async () => {
        let success = await PostService.deletePost(this.state.post.postId, this.state.post.posterId);

        if (success) {
            this.props.history.push('/');
        }
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
                    <input type="text" placeholder="Komentiraj" onChange={e => this.handleNewCommentChange(e)}></input>
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
            </Layout>
        );
    }
}
