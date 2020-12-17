import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import axios from "axios"

const initialForm = {
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: []
}

const MovieUpdate = props => {
    const [ form, setForm ] = useState(initialForm)
    const { id } = useParams()
    const { push } = useHistory()

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                setForm(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [id])

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleUpdate = e => {
        e.preventDefault()
        axios.put(`http://localhost:5000/api/movies/${id}`, form)
            .then(res => {
                console.log(res)
                push(`/movies/${id}`)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className="movie-update">
            <h3>-Movie Update-</h3>
            <form onSubmit={handleUpdate}>
                <input type="text" name="title" placeholder="title" value={form.title} onChange={handleChange} />
                <input type="text" name="director" placeholder="director" value={form.director} onChange={handleChange} />
                <input type="text" name="metascore" placeholder="metascore" value={form.metascore} onChange={handleChange} />
                <button>update movie</button>
            </form>
        </div>
    )
}

export default MovieUpdate
