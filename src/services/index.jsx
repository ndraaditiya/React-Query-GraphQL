import { useQuery, } from '@tanstack/react-query'
import { gql, request } from "graphql-request";
import { hygraphApi } from '../config/api';

export const useGetPosts = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await request(hygraphApi, gql`
        query getPosts {
          posts {
            title
            excerpt
            featuredImage {
              url
            }
            author {
              id
              name
              photo {
                url
              }
            }
            createdAt
            slug
          }
        }
      `)
      return res
    },
    select: (res) => res.posts
  })
  return { data, isLoading }
}

export const useGetPostDetail = (slug) => {
  const { data, isLoading } = useQuery({
    queryKey: ['post', slug],
    queryFn: async () => {
      const res = request(hygraphApi, gql`
        query getPostDetail($slug: String!) {
          post(where: {slug: $slug}) {
            createdAt
            title
            author {
              name
              photo {
                url
              }
            }
            featuredImage {
              url
            }
            content {
              raw
            }
          }
        }
      `, { slug: slug })
      return res
    },
    select: (res) => res.post
  })
  return { data, isLoading }
}