import React from 'react'
import PostCard from '../components/PostCard'
import { useGetPosts } from '../services'

const Posts = () => {
  const { data, isLoading, isError, error } = useGetPosts()

  if (isLoading) return 'Loading..'

  if (isError) return <p>{error}</p>

  return (
    <>
      <h2>Blog App</h2>
      {data && data.map(({
        title,
        slug,
        createdAt,
        excerpt,
        author: { name: authorName, photo: { url: authorPhoto } },
        featuredImage: { url: thumb }
      }, i) => (
        <PostCard
          key={i}
          title={title}
          slug={slug}
          createdAt={createdAt}
          authorName={authorName}
          authorPhoto={authorPhoto}
          thumbnail={thumb}
          excerpt={excerpt}
        />
      ))}
    </>
  )
}

export default Posts
