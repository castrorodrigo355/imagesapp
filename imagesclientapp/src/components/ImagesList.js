import React from 'react';

function ImagesList(props) {

    const getPost = id => {
        props.onGetPost(id)
    }
    
    const deletePost = id => {
        props.onDeletePost(id)
    }

    return (
        <div className="grid">
            {
                props.posts.length !== 0 ?
                (
                props.posts.map((post, i) => {
                    return(
                    <div key={i} className="card bg-transparent" style={{margin:"10px"}}>
                        <div className="card-header">
                            <h2 className="card-title">{post.title}</h2>
                            <h5 className="card-title">{post.description}</h5>
                        </div>
                        <div className="card-body" style={{padding:"2px"}}>
                            <img src={post.url} alt="..." style={{height: "10vw", width: "20vw", margin: "10px"}}/>
                        </div>
                        <div className="card-footer">
                            <div className="row">
                                <div className="col">
                                    <button type="button" className="btn btn-danger" onClick={() => deletePost(post._id)}>Delete</button>
                                </div>
                                <div className="col">
                                    <button type="button" className="btn btn-info" onClick={() => getPost(post._id)}>Info</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    )
                })
                )
                :
                (
                <div>
                    Sin posteos
                </div>
                )
            }
      </div>
    )
}

export default ImagesList