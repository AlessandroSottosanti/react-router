import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

function PostDetailsPage() {

    const [post, setPost] = useState(null);
    const [countPosts, setCountPosts] = useState(0);
    const { id } = useParams();
    const pagesArray = [];

    const navigate = useNavigate();


    useEffect(() => {
        axios.get(`${apiUrl}/posts/${id}`).then((resp) => {
            console.log("post con id", id);
            setPost(resp.data);
        }).catch((resp) => {
            console.log(resp.data);
            navigate('/post-not-found');
        } )

        axios.get(`${apiUrl}/posts/`).then((resp) => {
            setCountPosts(resp.data.count);
            console.log("posts count", countPosts);
        })
    }, [id]);

    const nextPost = () => {
        const nextId = parseInt(id) + 1;
        if (nextId <= countPosts) {
            navigate(`/blogs/details/${nextId}`);
        }
    } 

    const previousPost = () => {
        const prevId = parseInt(id) - 1;
        if (prevId >= 1) {
            navigate(`/blogs/details/${prevId}`);
        }
    }

    const changePage = (page) => {
        console.log(`cambio a pagina ${page}`);
        navigate(`/blogs/details/${page}`);
    }

    for (let i = 1; i <= countPosts; i++) {
        pagesArray.push(i);
        console.log(pagesArray);
    }

    return (
        <>
        {/* Commentato perché torna alla pagina precedente, quindi se mi trovavo in un altro post resto nella pagina di dettagli */}
        {/* <button  onClick={() => navigate(-1)} className="btn btn-secondary m-2">{`<`}</button> */}
        <button  onClick={() => navigate('/blogs')} className="btn btn-secondary m-2">{`<`}</button>
            <div className="container d-flex justify-content-center my-5 gap-3">
                <button onClick={() => previousPost(id)} className={`btn btn-primary ${parseInt(id) === 1 && 'disabled'}`} to={``}>Precedente</button>
                <div className="d-flex gap-1">
                    {pagesArray.map((page, index) => (
                        <button key={index} onClick={() => changePage(page)} className="btn btn-secondary">{page}</button>
                    ))}
                </div>
                <button onClick={() => nextPost(id)} className={`btn btn-primary ${parseInt(id) === countPosts && 'disabled'}`} to={``}>Successivo</button>
            </div>

            <div className="container d-flex flex-column my-5">


                {post && (
                    <div className="d-flex flex-column gap-3">
                        <img src={post.image} alt="" />                        
                        <h1>{post.title}</h1>
                        <p>{post.content}</p>
                    </div>
                )}

            </div>

        </>
    )
}

export default PostDetailsPage;