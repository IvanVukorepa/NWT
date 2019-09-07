import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Layout } from './Layout';
import { Link } from 'react-router-dom';

async function getPosts() {
    const requestOptions = {
        method: 'GET',
    };

    var posts;
    await fetch('api/PostController/getAllPosts', requestOptions)
        .then(response => response.json())
        .then(data => {
            posts =  data;
            /*if (th.state.postList !== data) {
                th.setState({ postList: data });
            }*/
        });

    return posts;
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
        var posts = await getPosts();
        console.log(posts);
        if (this.state.postList !== posts) {
            this.setState({
                postList: posts
            });
        }
    }

    handleTextChange = (e, th) => {
        this.setState({
            post: e.target.value
        });
    }

    createPost = async (e, th) => {
        var formData = new FormData();

        formData.append('Content', th.state.post);
        formData.append('Poster', JSON.stringify(th.state.user));

        await fetch('api/PostController/Create', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "content": th.state.post, "poster": th.state.user })
        }).then(await handleResponse);

        var posts = await getPosts(th);
        console.log(posts);
        this.setState({
            postList: posts
        });
    }

  render() {
    return (
        <Layout userName={this.state.user !== null ? this.state.user.firstName : ""}>
            <div>
                <input className="newPost" onChange={e => this.handleTextChange(e, this)}></input>
                <button onClick={e => this.createPost(e, this)}>Create</button>
            </div>
            {this.state.postList.map(post => {
                return (
                    <Link key={post.postId} to={{ pathname: "/postDetails", state: { post: post}}}>
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
