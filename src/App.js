import React, { Component } from 'react';
import "./App.css"


class App extends Component {
    state = {
        'posts': [],
        'message': "Click to post"
    }

    componentDidMount() {
        fetch('http://localhost:8000/api/posts/', {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            }
            })
            .then(res => res.json())
            .then(data => this.setState({'posts': data}))
        return this.state
    }

    options = (event, endpoint='') => {
        event.preventDefault()
        fetch(`http://localhost:8000/api/posts/${endpoint}`, {
            method: "GET",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            }}
            )
            .then(res => res.json())
            .then(data => this.setState({'posts': data}))
        return this.state
    }
    recent = (event) => {
        event.preventDefault()
        fetch('http://localhost:8000/api/posts/', {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            }
            })
            .then(res => res.json())
            .then(data => this.setState({'posts': data}))
        return this.state
    }
    renderType = (type='Roast') => {
        if (type==='Roast'){
            return "🔥"
        } else if (type==='Boast'){
            return "❤️"
        }
    }
    upvoteRequest = (post) => {
        // e.preventDefault()
        let url = 'http://localhost:8000/api/posts/'
        fetch(url + post.id + "/", {
            method: "PUT",
            mode: "cors",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                id: post.id,
                post_type: post.post_type,
                content: post.content,
                upvotes: post.upvotes+1,
                total_votes: post.total_votes+1
            })
        }).then(() => {
            fetch(url)
                .then(res => res.json())
                .then(result => {this.setState({ 'posts': result})})
        })
    }
    downvoteRequest = (post) => {
        // e.preventDefault()
        let url = 'http://localhost:8000/api/posts/'
        fetch(url + post.id + "/", {
            method: "PUT",
            mode: "cors",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                id: post.id,
                post_type: post.post_type,
                content: post.content,
                downvotes: post.downvotes+1,
                total_votes: post.total_votes-1
            })
        }).then(() => {
            fetch(url)
                .then(res => res.json())
                .then(result => {this.setState({ 'posts': result})})
        })
    }

    newPost = (e, post_type, content) => {
        e.preventDefault()
        let postInfo = {
            id: null,
            post_type:this.refs.post_type.value,
            content: this.refs.content.value
        }
        fetch('http://localhost:8000/api/posts/', {
            method: "POST",
            mode: "cors",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(postInfo)
        }).then((res)=> res.json()).then(res=>{
        if (res){
        this.setState({message:'New Post Created Successfully'})
        }
        })
        return this.recent()
    }




    render() {
        return ( 
            <div>
                <h2 id={'title2'}>Welcome to</h2>
                <h1 id={"title"}>§hos†¶os†</h1>
                <menu className={"menu"}>
                    <p id={'sideways'}>Filter By:</p>
                    <button onClick={(event) => this.options(event,'boasts/')}>Just Boasts</button>
                    <button onClick={(e) => this.options(e, 'roasts/')}>Just Roasts</button>
                    <button onClick={(e) => this.options(e, 'popular/')}>Most Popular</button>
                    <button onClick={(e) => this.recent(e)}>Most Recent</button>
                    {/*<button onClick={(e) => this.onOpenClick(e)}>New GhostPost</button>*/}
                </menu>

                    <div className={"form"}>
                    <h2>Post Anonymous GhostPost:</h2>
                    <p>
                        <label>Post_Type : <select ref="post_type" name="post_type" id="post_type"><option value="Roast">Roast</option><option value="Boast">Boast</option></select>
                        </label>
                    </p>
                    <p>
                        <label>Content : <input type="text" ref="content"/></label>
                    </p>
                    <button onClick={(e, post_type, content) => this.newPost(e, post_type, content)}>Post</button>
                    <p>{this.state.message}</p>
                </div>
                <table>
                    <thead>
                        <tr id={'headerColumn'}>
                            <th className={'topRow'}>Id</th>
                            <th className={'topRow'}>
                                {/*<span role={'img'} aria-label={'boast'}>❤️</span>*/}
                                Type
                                {/*<span role={'img'} aria-label={'roast'}>🔥</span>*/}

                            </th>
                            <th className={'topRow'}>Content</th>
                            <th className={'topRow'}>
                                <span role='img' aria-label='upvote'>👍</span>Upvotes</th>
                            <th className={'topRow'}>
                                <span role={'img'} aria-label={'downvote'}>👎</span>Downvotes</th>
                            <th className={'topRow'}>Date</th>
                            <th className={'topRow'}>Total Votes</th>
                        </tr>
                    </thead>
                    {this.state.posts.map((post) =>
                        <tbody key={post.id} className={'post'}>
                            <tr>
                                <td className={'field'}>{post.id}</td>
                                <td className={'field'}>
                                    <span role={'img'} aria-label={'type'}>{this.renderType(post.post_type)}</span>
                                    {post.post_type}
                                </td>
                                <td className={'field'}>{post.content}</td>
                                <td className={'field'}><button onClick={this.upvoteRequest.bind(this, post)}>
                                    <span role='field' aria-label='upvote'> 👍</span>
                                    </button>
                                    <hr/>{post.upvotes}
                                </td>
                                <td className={'field'}>
                                    <button onClick={this.downvoteRequest.bind(this, post)}>
                                        <span role='img' aria-label='downvote'> 👎</span>
                                    </button>
                                    <hr/>{post.downvotes}
                                </td>
                                <td className={'field'}>{post.date}</td>
                                <td className={'field totalVotes'}>{post.total_votes}</td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
        );
    }
}

export default App;