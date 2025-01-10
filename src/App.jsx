

// NOTES: potrei gestire oltre al salvataggio dei post anche i tag con una nuova API, ma tenendo in considerazione che i dati in futuro verranno da una sorgente dinamica come un db, 
//        non sarà necessario farlo in quanto l'api index dei tag restituisce tutti i tag che trova nei post caricati, ora non funziona perché fa riferimento ad un file statico

import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import HomePage from "./pages/HomePage";
import BlogsPage from "./pages/blog/BlogsPage";
import FormPage from "./pages/blog/FormPage";
import AboutUsPage from "./pages/AboutUsPage";
import PostDetailsPage from "./pages/blog/PostDetailsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<AppLayout />}>

          <Route path="/" element={<HomePage />} />

          <Route path="/blogs" >
            <Route index element={<BlogsPage />} />
            <Route path="create" element={<FormPage />} />
            <Route path="details/:id" element={<PostDetailsPage />} />
          </Route>

          <Route path="/about-us" element={<AboutUsPage />} />

        </Route>

      </Routes>
    </BrowserRouter>
  )

}

export default App;
