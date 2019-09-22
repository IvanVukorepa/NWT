import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Layout } from './Layout';
import { Link } from 'react-router-dom';
import PostService from '../services/PostService';

export class Home extends Component {
    displayName = Home.name

   constructor(props) {
        super(props);
        this.state = {
            user: "",
            post: "",
            postList: []
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

        var newPost = await PostService.createPost(th.state.post);

        var posts = this.state.postList;
        posts.push(newPost);

        this.setState({
            postList: posts
        });
    }

  render() {
    return (
        <Layout userName={this.state.user !== null ? this.state.user.firstName : ""}>
            <div>
                <input className="newPost" onChange={e => this.handleTextChange(e)}></input>
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
