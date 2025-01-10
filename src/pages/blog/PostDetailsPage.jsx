import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

function PostDetailsPage() {

    const [post, setPost] = useState(null);
    const [countPosts, setCountPosts] = useState(0);
    const { id } = useParams();
    const [curId, setCurId] = useState(parseInt(id));
    const pagesArray = [];

    const navigate = useNavigate();

    let apiUrl = 'http://localhost:3000';

    useEffect(() => {
        axios.get(`${apiUrl}/posts/${id}`).then((resp) => {
            console.log("post con id", id);
            setPost(resp.data);
        })

        axios.get(`${apiUrl}/posts/`).then((resp) => {
            setCountPosts(resp.data.count);
            console.log("posts count", countPosts);
        })
    }, [curId]);

    const nextPost = (curId) => {
        console.log("carica post successivo a", curId);
        setCurId(curId + 1);
        navigate(`../../blogs/details/${curId + 1}`)
    } 

    const previousPost = (curId) => {
        console.log("carica post precedente a", curId);
        setCurId(curId - 1);
        navigate(`../../blogs/details/${curId - 1}`);
    }

    const changePage = (page) => {
        console.log(`cambio a pagina ${page}`);
        setCurId(page);
        navigate(`../../blogs/details/${page}`);
    }

    for (let i = 1; i <= countPosts; i++) {
        pagesArray.push(i);
        console.log(pagesArray);
    }

    return (
        <>
        {/* <button  onClick={() => navigate(-1)} className="btn btn-secondary m-2">{`<`}</button> */}
        <button  onClick={() => navigate('/blogs')} className="btn btn-secondary m-2">{`<`}</button>
            <div className="container d-flex my-5 gap-3">
                <button onClick={() => previousPost(curId)} className={`btn btn-primary ${parseInt(id) === 1 && 'disabled'}`} to={``}>Precedente</button>
                <div className="d-flex gap-1">
                    {pagesArray.map((page, index) => (
                        <button key={index} onClick={() => changePage(page)} className="btn btn-secondary">{page}</button>
                    ))}
                </div>
                <button onClick={() => nextPost(curId)} className={`btn btn-primary ${parseInt(id) === countPosts && 'disabled'}`} to={``}>Successivo</button>
            </div>

            <div className="container d-flex flex-column my-5">


                {post && (
                    <div>
                        <h1>{post.title}</h1>
                        <p>{post.content}</p>
                        <img src={post.image} alt="" />
                    </div>
                )}

            </div>

        </>
    )
}

export default PostDetailsPage;