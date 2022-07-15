import { useHistory, useParams } from "react-router";
import useFetch from "./useFetch";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const BlogDetail = () => {
    const { id } = useParams();

    const { data: blog, isLoading, error } = useFetch(`http://localhost:8000/blogs/${id}`)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [author, setAuthor] = useState("")

    const history = useHistory()

    const handleSubmit = () => {
        const blog = { title, body, author }
        fetch(`http://localhost:8000/blogs/${id}`, {
            method: 'PUT',
            headers: { "Content-type": "application/json", "Accept": "application/json" },
            body: JSON.stringify(blog)
        }).then(() => {
            history.push('/')

        })

    }

    const handleDelete = () => {
        fetch(`http://localhost:8000/blogs/${id}`, {
            method: 'DELETE'
        }).then(() => {
            history.push('/')

        })
    }

    return (

        <div className="blog-details">

            {isLoading && <div> Loading... </div>}
            {error && <div> {error} </div>}
            {blog && (
                <article>
                    <h2> {blog.title} </h2>
                    <p> written by {blog.author} </p>
                    <div> {blog.body} </div>
                    <button onClick={handleDelete} > Delete </button>
                    <>
                        <button onClick={handleShow}>
                            Edit
                        </button>

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form.Group>
                                    <label> Blog Title : </label>
                                    <Form.Control placeholder="Blog Title" defaultValue={blog.title} onChange={(e) => setTitle(e.target.value)} />
                                </Form.Group>
                                <br />
                                <Form.Group>
                                    <label> Blog Body : </label>
                                    <Form.Control placeholder="Blog Body" defaultValue={blog.body} onChange={(e) => setBody(e.target.value)} />
                                </Form.Group>
                                <br />
                                <Form.Group>
                                    <label> Blog Author : </label>
                                    <Form.Control placeholder="Blog Author" defaultValue={blog.author} onChange={(e) => setAuthor(e.target.value)} />
                                </Form.Group>
                                <br />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={() => { handleClose(); handleSubmit() }}>
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </>
                </article>
            )}
        </div>
    );
}

export default BlogDetail;