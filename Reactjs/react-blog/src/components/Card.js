import React from 'react';
function Card({item}) {
    console.log("Data in News card ",item)
        return (
            <main>
                {item &&
                <article>
                     <h5>{item.title}</h5>
                     <img width= "200" src={item.urlToImage} alt="My Image" />
                     <h5> By </h5>
                     <h5>{item.author} on {item.publishedAt}</h5>
                
                    <p className = "fw-bold"> Description:  {item.description}</p>  
                  <p>{item.content}</p>
                  <a href= {item.url} target = "_blank">More Details </a>
    
                </article>
    }
            </main>
          );
    
       
        }

export default Card;