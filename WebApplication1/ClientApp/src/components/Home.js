import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Layout } from './Layout';
import { Link } from 'react-router-dom';
import PostService from '../services/PostService';
import '../style/home.css';


function RemoveFilter(props) {
    if (props.show) {
        return (
            <button onClick={props._this.removeFilter}>Remove filter</button>
        );
    }
    else
        return (<div></div>);
}

export class Home extends Component {
    displayName = Home.name

   constructor(props) {
        super(props);
        this.state = {
            user: "",
            post: "",
            postList: [],
            filter: "",
            filtered: false
        };
    }
    async componentDidMount() {
        if (this.state.user !== JSON.parse(localStorage.getItem('user'))) {
            this.setState({
                user: JSON.parse(localStorage.getItem('user'))
            });
        }
        var posts = await PostService.getPosts();
        if (this.state.postList !== posts) {
            this.setState({
                postList: posts
            });
        }
        console.log(posts);
    }

    handleTextChange = (e) => {
        this.setState({
            post: e.target.value
        });
    }

    createPost = async (e) => {
        if (this.state.post == "") {
            alert("Empty post");
            return;
        }
        else if (this.state.post.length > 500) {
            alert("Max post size is 500 characters");
            return;
        }


        var newPost = await PostService.createPost(this.state.post);
        if (newPost === null) {
            return;
        }
        newPost.poster = this.state.user;
        var posts = this.state.postList;
        posts.push(newPost);

        this.setState({
            postList: posts,
            post: ""
        });
        var input = document.getElementById("input");
        input.value = '';
    }

    filterChange = (e) => {
        this.setState({
            filter: e.target.value
        });
    }

    filter = async () => {
        if (this.state.filter.length < 3) {
            alert("min search string length is 3");
            return;
        }
        let posts = await PostService.getFilteredPosts(this.state.filter);
        this.setState({
            postList: posts,
            filtered: true
        });
    }

    removeFilter = async () => {
        var posts = await PostService.getPosts();
        this.setState({
            postList: posts,
            filtered: false,
            filter: ""
        });
        var input = document.getElementById("search");
        input.value = '';
    }

  render() {
    return (
        <Layout userName={this.state.user !== null ? this.state.user.firstName : ""}>
            <div className="homeContainer">
                <div className="postsContainer">
                    <div className="newPostContainer">
                        <textarea id="input" className="newPost" rows="4" onChange={e => this.handleTextChange(e)}></textarea>
                        <button className="createButton" onClick={e => this.createPost(e)}>Create</button>
                    </div>
                    {this.state.postList.map(post => {
                        return (
                            <Link key={post.postId} to={{ pathname: "/postDetails", state: { postId: post.postId } }}>
                                <div className="postContainer">
                                    <p>{post.poster.userName}</p>
                                    <p>{post.content.length > 30 ? post.content.substring(0,30) + "..." : post.content}</p>
                                </div>
                            </Link>
                        )
                        })}
                </div>
                <div className="searchContainer">
                    <input className="searchInput" placeholder="Search" id="search" onChange={this.filterChange}></input>
                    <button onClick={this.filter}>Search</button>
                    <RemoveFilter show={this.state.filtered} _this={this} />
                </div>
            </div>
        </Layout>
    );
  }
}
