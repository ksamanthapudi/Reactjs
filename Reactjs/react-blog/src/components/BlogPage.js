import React, {useState, useEffect} from 'react';
import Header from './Header';
import Card from './Card';
import Footer from './Footer';
import PostList from './PostList';
import ViewBlog from './ViewBlog';

const xml2js = require('xml2js');



    export default function App() {
       var posts = [{}];
       const [postsArray, setPostsArray] = useState([]);
        useEffect(()=>{
            var rawFile = new XMLHttpRequest();
            rawFile.open("GET", "data.xml", false);
            rawFile.onreadystatechange = () => {
              if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                  var xmlasstring = rawFile.responseText;
          
                  xml2js.parseString(xmlasstring, (error, result) => {
                    if (error) {
                      console.error(error);
                      return;
                    }
          
                    // Convert the JavaScript object to a POJO
                    posts = JSON.parse(JSON.stringify(result)).blog;
                  
                    let postArr = [];
                    posts.post.forEach(item =>{
                        let postToView = {};
                        for (let prop in item) {
                         postToView[prop] = item[prop][0];
                     
                          }
                          postArr.push(postToView);
                     
                    }
                    )
                    console.log("PostArray ", postArr)
                    setPostsArray(postArr);
                  });
                }
              }
            };
            rawFile.send(null);
    
        },[])

      
        useEffect(() => {
          getNews()
         
        }, []);
      
        const [newsResponse, setResponse] = useState({});
        async function getNews() {
          var apiKey = process.env.REACT_APP_APIKEY;
          const url =
            "http://newsapi.org/v2/everything?" +
            "q=platformer&" +
            "apiKey="+apiKey;
          const response = await fetch(url);
          const data = await response.json();
          setResponse(data);
          console.log(data);
        }
        setInterval(() => {
          getNews();
        }, 600000);
      
        const [viewBlog, setView] = useState(false);
        const [currentPost, setCurrentPost] = useState({});
      
        return (
          <div className="App">
            <Header />
            <div className="container col-md-12 d-flex">
              <div className="col-md-8">
                {!viewBlog && (
                  <PostList
                    viewCallback={(author) => {
                      let currPost = postsArray.filter((item) => item.author === author);
                      console.log("CurrPostttt", currPost);
                      setCurrentPost(currPost[0]);
                      setView(true);
                    }
                }
                    posts={postsArray}
                  />
                )}
                {viewBlog && (
                  <div>
                    <ViewBlog posts={currentPost} />
                  </div>
                )}
              </div>
              <div className="col-md-4">
                {viewBlog && (
                  <a
                    href={"javascript:void(0)"}
                    onClick={() => {
                      setView(false);
                    }}
                  >
                    HOME
                  </a>
                )}
                <h2>NEWS FEED SECTION</h2>
                {newsResponse && (
                  <div
                    className="col-md-12 overflow-auto"
                    style={{ height: "600px" }}
                  >
                    {newsResponse &&
                      newsResponse.articles &&
                      newsResponse.articles.map((item) => {
                        console.log("ITEM", item);
                        return <Card item={item} key={item.title} />;
                      })}
                  </div>
                )}
              </div>
            </div>
            <Footer/>
          </div>
        );
      }