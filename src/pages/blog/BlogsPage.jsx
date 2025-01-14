import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AppCard from '../../components/AppCard';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {GlobalContext} from '../../contexts/GlobalContext';


function BlogsPage() {
  const urlApi = 'http://localhost:3000';

  // const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const {posts} = useContext(GlobalContext);

  const navigate = useNavigate();


  useEffect(() => {
    // getPosts();
    getTags();
  },
    []
  );


  // commentata perché aggiornava ad ogni modifica dei post e dei tag, quindi ho deciso di chiamare le funzioni solo dove necessario.

  // useEffect(() => {
  //   getPosts();
  //   getTags();
  // },
  //   [posts, tags]
  // );



  // get posts
  // const getPosts = () => {
  //   axios.get(`${urlApi}/posts/`).then((resp) => {
  //     console.log(resp.data.postsArray)
  //     setPosts(resp.data.postsArray);
  //   })
  // }


  // get tags
  const getTags = () => {
    axios.get(`${urlApi}/tags/`).then((resp) => {
      console.log("resp data tags: ", resp.data.tags)
      setTags(resp.data.tags);
    })
  }





  // Elimina post
  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
    axios.delete(`${urlApi}/posts/${id}`).then((resp) => {
      console.log(resp.data);
      // getPosts();
      getTags();
    }
    )
  }


  const handleRemovePostTag = (postId, tag) => {
    console.log("Rimuovi tag:", postId, tag);

    // Trova il post da aggiornare
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          tags: post.tags.filter((currentTag) => currentTag !== tag), // Filtra il tag
        };
      }
      return post;
    });

    // Aggiorna lo stato del frontend
    setPosts(updatedPosts);

    // Trova il post aggiornato per la chiamata API
    const updatedPost = updatedPosts.find((post) => post.id === postId);

    // Effettua la chiamata PUT per aggiornare il post sul backend
    axios
      .put(`${urlApi}/posts/${postId}`, updatedPost)
      .then((response) => {
        console.log("Post aggiornato:", response.data);
      })
      .catch((error) => {
        console.error("Errore durante l'aggiornamento del post:", error);
      });
  };


  // function capitalizeWords(str) {
  //   return str
  //     .split(' ')
  //     .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
  //     .join(' ');
  // }


  console.log("post:", posts);
  console.log("tags: ", tags);

  return (
    <>
      {/* <div className="container d-inline-block my-5">
        <ul>
          <h2 className='mb-3'>Lista tag:</h2>
          {tags.map((tag) => {
            return (
              <div className="container d-flex align-items-center my-2">
                <li className='me-5'>{tag}</li>
              </div>
            )
          })}
        </ul>
      </div> */}

      {/* Form posts */}


      {/* Lista posts */}

      <div className="w-100">

        <div className=' m-5 d-flex flex-column gap-3'>

          <h2>Elenco post</h2>

          <div className='d-flex'>
            <NavLink to={"/blogs/create"} className='btn btn-primary'>+ Aggiungi Post</NavLink>
          </div>

          {posts.length > 0 ?

            (posts.map((curPost) => (

              <AppCard
                key={curPost.id}
                post={curPost}
                onDelete={handleDelete}
                onDeleteTag={handleRemovePostTag}
              />
            )))
            :
            (
              <div className="card">
                <div className="card-body">Nessun post presente.</div>
              </div>
            )

          }


        </div>
      </div>
    </>
  )

}

export default BlogsPage;