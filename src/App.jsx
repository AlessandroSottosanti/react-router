

// NOTES: potrei gestire oltre al salvataggio dei post anche i tag con una nuova API, ma tenendo in considerazione che i dati in futuro verranno da una sorgente dinamica come un db, 
//        non sarà necessario farlo in quanto l'api index dei tag restituisce tutti i tag che trova nei post caricati, ora non funziona perché fa riferimento ad un file statico

import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import HomePage from "./pages/HomePage";
import BlogsPage from "./pages/blog/BlogsPage";
import FormPage from "./pages/blog/FormPage";
import AboutUsPage from "./pages/AboutUsPage";
import PostDetailsPage from "./pages/blog/PostDetailsPage";
import PageNotFound from "./pages/errorPages/PageNotFound";
import PostNotFound from "./pages/errorPages/PostNotFound";
import { AlertProvider, GlobalContext } from "./contexts/GlobalContext";
import { useContext, useEffect, useState } from "react";
import AppAlert from "./components/AppAlert";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;


function App() {



  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    getPosts();

  }, []);


  // get posts
  const getPosts = () => {
    axios.get(`${apiUrl}/posts/`).then((resp) => {
      console.log(resp.data.postsArray)
      setPosts(resp.data.postsArray);
    }).catch(() => {
      setErr("Errore nel caricamento dei post");
      showAlert("Errore nel caricamento dei post");
    });
  }

  const globalContextData = { posts };

  return (
    <AlertProvider>

      <GlobalContext.Provider value={globalContextData}>
        <BrowserRouter>
          <AppAlert />
          <Routes>
            <Route element={<AppLayout />}>

              <Route path="/" element={<HomePage />} />

              <Route path="/blogs" >
                <Route index element={<BlogsPage />} />
                <Route path="create" element={<FormPage />} />
                <Route path="details/:id" element={<PostDetailsPage />} />
                <Route path="*" element={<PageNotFound />} />
              </Route>

              <Route path="/about-us" element={<AboutUsPage />} />

              <Route path="/post-not-found" element={<PostNotFound />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>

          </Routes>
        </BrowserRouter>
      </GlobalContext.Provider>
    </AlertProvider>

  )

}

export default App;
