import React from 'react'
import { Link } from 'react-router-dom'

const PostCard = ({
  title,
  slug,
  createdAt,
  authorName,
  authorPhoto,
  thumbnail,
  excerpt
}) => {
  return (
    <>
      <div className='container'>
        <img src={thumbnail} className='thumb' />
        <h2>{title}</h2>
        <div className='author'>
          <img src={authorPhoto} className='author-photo' />
          <span>{authorName}</span>
          <span className='date-posted'>
            {new Date(createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>
        <div className='excerpt'>
          <p>{excerpt}</p>
        </div>
        <div className='action'>
          <Link to={`/${slug}`}>
            <button>Read More</button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default PostCard
