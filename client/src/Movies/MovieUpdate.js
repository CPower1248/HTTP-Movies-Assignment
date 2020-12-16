import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

const initialForm = {
    title: "",
    director: "",
    metascore: ""
}

const MovieUpdate = () => {
    const [ form, setForm ] = useState(initialForm)
    const { id } = useParams()

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                console.log("RES: ", res)
                setForm(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="movie-update">
            <h3>-Movie Update-</h3>
            <form>
                <input type="text" name="title" placeholder="title" value={form.title} onChange={handleChange} />
                <input type="text" name="director" placeholder="director" value={form.director} onChange={handleChange} />
                <input type="text" name="metascore" placeholder="metascore" value={form.metascore} onChange={handleChange} />
                <button>update movie</button>
            </form>
        </div>
    )
}

export default MovieUpdate
