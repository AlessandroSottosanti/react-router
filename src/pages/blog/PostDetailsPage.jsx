import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

function PostDetailsPage() {

    const [post, setPost] = useState(null);
    const {id} = useParams();

    useEffect(() => {
        axios.get(`${apiUrl}/blogs/${id}`).then((req, resp) => {
            console.log(req.request.responseURL);
            setPost(resp.data);
            console.log(resp.data);
            console.log(id);
        })
    }, []);


    return (
        <>
            {post && (
                <div>
                    <h1>{post.title}</h1>
                    <img src={post.image} alt="" />
                </div>
            )}
        </>
    )
}

export default PostDetailsPage;