import React from 'react';
function PostList({ posts, viewCallback }) {
    function toggelBlog(post) {
        viewCallback(post.author);
       
      }
      console.log("POSTLIST", posts);
      return (
        <main>
          {posts.map((post, index) => (
            <article key={index}>
                 <h2 className='linkPage' onClick={()=>{
                toggelBlog(post)}}>{post.title}</h2>
                  <h6>By</h6>
                  <p>{post.author} on {post.date}</p>
        
              <p className = "fw-bold">Summary</p>
          <img src={post.summary.image_path} alt="My Image" />
              <p className = "mt-2">{post.summary.text}</p>
            </article>
          ))}
        </main>
      );
    }

    export default PostList;