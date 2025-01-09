import { useState, useEffect } from "react";
import axios from "axios";
import AppForm from "../components/AppForm";
import { useNavigate } from "react-router-dom";

function FormPage() {

  const urlApi = 'http://localhost:3000';

  const navigateTo = useNavigate();
  
  useEffect(() => {
    getPosts();
    getTags();
  },
    []
  );

  const initialPost = {
    title: "",
    content: "",
    image: "",
    tags: [],
  }

  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [formData, setFormData] = useState(initialPost); // object


  // get tags
  const getTags = () => {
    axios.get(`${urlApi}/tags/`).then((resp) => {
      console.log("resp data tags: ", resp.data.tags)
      setTags(resp.data.tags);
    })
  }

  // get posts
  const getPosts = () => {
    axios.get(`${urlApi}/posts/`).then((resp) => {
      console.log(resp.data.postsArray)
      setPosts(resp.data.postsArray);
    })
  }



  // Salva post
  const handleNewPostSubmit = (event) => {
    event.preventDefault();


    const newPost = {
      ...formData,
    };

    const newArray = [...posts, newPost];

    setPosts(newArray);

    setFormData(initialPost);

    console.log("newArray:", newArray);

    axios.post(`${urlApi}/posts/`, {
      ...newPost
    }).then((resp) => {
      console.log(resp.status, resp.data);
      alert("Nuovo post salvato con successo!");
      navigateTo("/blogs");
    });
  };

  const handleNewTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]); // Aggiungi il nuovo tag all'elenco
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag], // Aggiungi al formData
      });
      setNewTag(""); // Resetta l'input dopo l'aggiunta
    } else {
      alert("Tag già esistente o non valido.");
    }
  };

  // gestisce dinamicamente i valori degli input
  const handleInputChange = (event) => {
    const keyToChange = event.target.name;

    let newValue;
    newValue = event.target.value;

    const newData = {
      ...formData,
      [keyToChange]: newValue,
    };

    setFormData(newData);
  };

  // gestisce la selezione della checkbox ne aggiunge il valore all'array tags
  const handleTagChange = (tag) => {
    console.log("actual tag ", tag);
    const updatedTags = formData.tags.includes(tag)
      ? formData.tags.filter((curTag) => curTag !== tag)
      : [...formData.tags, tag];

    setFormData({
      ...formData,
      tags: updatedTags,
    });
    console.log("formData", formData);
  }

  // Elimina i tag tramite l'API
  // Temporaneamente inserita, andrà gestita la rimozione singolarmente per card per lo stesso discorso del salvataggio
  const handleDeleteTag = (tag) => {
    setTags(tags.filter((curTag) => curTag !== tag));
    axios.delete(`${urlApi}/tags/?tag=${tag}`).then((resp) => {
      console.log(resp.data);
      getPosts();
      getTags();
    });
  }



  return (
    <AppForm
      formData={formData}
      tags={tags}
      newTag={newTag}
      setNewTag={setNewTag}
      onSubmit={handleNewPostSubmit}
      onInputChange={handleInputChange}
      tagDelete={handleDeleteTag}
      tagChange={handleTagChange}
      onAddTag={handleNewTag}
    />
  )
}

export default FormPage;