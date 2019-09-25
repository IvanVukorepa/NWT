import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Layout } from './Layout';
import { Link } from 'react-router-dom';
import PostService from '../services/PostService';


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
    }

    handleTextChange = (e) => {
        this.setState({
            post: e.target.value
        });
    }

    createPost = async (e, th) => {
        if (th.state.post == "") {
            alert("Empty post");
            return;
        }
        else if (th.state.post.length > 500) {
            alert("Max post size is 500 characters");
            return;
        }


        var newPost = await PostService.createPost(th.state.post);

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
            <div>
                <input placeholder="Search" id="search" onChange={this.filterChange}></input>
                <button onClick={this.filter}>Search</button>
                <RemoveFilter show={this.state.filtered} _this={this}/>
            </div>
            <div>
                <input id="input" className="newPost" onChange={e => this.handleTextChange(e)}></input>
                <button onClick={e => this.createPost(e, this)}>Create</button>
            </div>
            {this.state.postList.map(post => {
                return (
                    <Link key={post.postId} to={{ pathname: "/postDetails", state: { postId: post.postId } }}>
                        <div>
                            <p>OVO JE POST</p>
                            <p>{post.content}</p>
                        </div>
                    </Link>
                )
            })}
        </Layout>
    );
  }
}
