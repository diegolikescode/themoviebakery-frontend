import React, { useState } from 'react'
import styles from '../../styles/Movie.module.scss'
// import Rating from '../rating'
import { Rating } from 'react-simple-star-rating'
import axios from 'axios'

export default function Movie({ movieData, userId, movieRating, ...context }) {
  const [rating, setRating] = useState(movieRating)

  const handleRating = async (ratingValue) => {
    setRating(ratingValue)

    const body = {
      userId: userId,
      movieId: movieData.kaggleId.toString(),
      ratingValue,
    }

    await axios.post(`${process.env.TS_CRUD}/api/v1/rating/create`, body)
  }

  return (
    <div className={styles.fullMovie}>
      <img src={`${process.env.TMDB_POSTER_HOST}${movieData.poster_path}`} />
      <strong>
        {movieData.title} ({movieData.release_date.substr(0, 4)})
      </strong>
      <Rating
        onClick={handleRating}
        allowFraction={true}
        size={24}
        initialValue={movieRating}
      />
    </div>
  )
}
