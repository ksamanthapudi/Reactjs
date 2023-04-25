import React from 'react';
function ViewBlog({posts}) {
    console.log(posts)
   return (
      <article key={posts.id}>
        <h2>{posts.title}</h2>
        <h4>By</h4>
        <h2>{posts.author}</h2>
          <h2>{posts.date}</h2>
          <h3>Summary</h3>
          <img src={posts.summary.image_path} alt="My Image" />
          <p>{posts.summary.text}</p>
          <p>{posts.body}</p>
        </article>
   )
 
  }

  export default ViewBlog;