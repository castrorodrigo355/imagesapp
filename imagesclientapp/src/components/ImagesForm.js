import React, { useState } from 'react';

function ImagesForm(props) {

    const [file, setFile] = useState(null)
    const [post, setPost] = useState({title: "", description: ""})

    const onChange = e => {
        setFile(e.target.files[0])
    }
    
    const onChange2 = e => {
        setPost({...post, [e.target.name]: e.target.value});
    }
    
    const addPost = e => {
        e.preventDefault();
        props.onAddPost(file, post)
        setPost({title: "", description: ""});
        setFile(null);
    }

    return (
        <div>
            <form className="formulario" onSubmit={addPost} encType="multipart/form-data">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" onChange={onChange2} value={post.title}
                            className="form-control" name="title" id="title"/>
                </div>
                <div className="form-group">
                    <label htmlFor="description">description</label>
                    <input type="text" onChange={onChange2} value={post.description}
                            className="form-control" name="description" id="description"/>
                </div>
                <div className="form-group">
                    <label htmlFor="image">File</label>
                    <input type="file" onChange={onChange}
                            className="form-control" name="image" id="image"/>
                </div>
                <button type="submit" className="btn btn-primary">Post</button>
            </form>
        </div>
    )
}

export default ImagesForm
