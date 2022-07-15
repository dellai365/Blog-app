import { useState } from "react";
import { useHistory } from "react-router";

const Create = () => {
    

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [author, setAuthor] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        const blog = { title, body, author }
        setIsLoading(true)
        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: { "content-type": "application/json" },
            body: JSON.stringify(blog)
        }).then(() => {
            setIsLoading(false)
            history.push('/')
        })

    }

    return (
        <div className="create" >
            <h2> Add new Blog </h2>
             <form onSubmit={handleSubmit}>
                <label htmlFor=""> Blog Title :  </label>
                <input type="text" required value={title} onChange={(e)=>setTitle(e.target.value)} />
                <label htmlFor=""> Blog Body : </label>
                <textarea required value={body} onChange={(e)=>setBody(e.target.value)} ></textarea>
                <label htmlFor=""> Blog Author :  </label>
                <input type="text" required value={author} onChange={(e)=>setAuthor(e.target.value)} />
                { !isLoading && <button> Add Blog </button>}
                {  isLoading && <button disabled > Adding Blog... </button>}
               
            </form> 
            
        </div>
    );
}

export default Create;