import axios from "axios"
import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"

const initialMovie = {
    title: "",
    director: "",
    metascore: ""
}

const UpdateMovie = () => {
    const [ movie, setMovie ] = useState(initialMovie)
    const { push } = useHistory();
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3000/api/movies/${id}`)
            .then(res => {
                console.log(res)
                setMovie(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    })

    const onChange = e => {
        const { name, value } = e.target
        setMovie({...movie, [name]: value})
    }

    const onSubmit = e => {
        e.preventDefault()
        axios.put(`http://localhost:3000/api/movies/${id}`)
    }

    return (
        <div className="updatemovie-container">
            <h3>Update Movie Form</h3>
            <form className="updatemovie-form">
                <input type="text" name="title" placeholder="title" value={movie.title} onChange={onChange} />
                <input type="text" name="director" placeholder="director" value={movie.director} onChange={onChange} />
                <input type="text" name="metascore" placeholder="metascore" value={movie.metascore} onChange={onChange} />
            </form>
        </div>
    )
}

export default UpdateMovie;
