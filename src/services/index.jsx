import { useQuery, } from '@tanstack/react-query'
import { gql, request, GraphQLClient } from "graphql-request";
import { hygraphApi } from '../config/api';

const client = new GraphQLClient(hygraphApi)

export const useGetPosts = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: async ({ signal }) => {
      const res = await client.request({
        document: gql`
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
        `, signal
      })
      return res
    },
    select: (res) => res.posts
  })
  return { data, isLoading }
}

export const useGetPostDetail = (slug) => {
  const { data, isLoading } = useQuery({
    queryKey: ['post', slug],
    queryFn: async ({ signal }) => {
      const res = client.request({
        document: gql`
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
        `, signal
      }, { slug })
      return res
    },
    select: (res) => res.post
  })
  return { data, isLoading }
}