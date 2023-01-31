import { useQuery, } from '@tanstack/react-query'
import { gql, GraphQLClient } from "graphql-request";
import { hygraphApi } from '../config/api';

const client = new GraphQLClient(hygraphApi, {
  method: 'GET',
  jsonSerializer: {
    parse: JSON.parse,
    stringify: JSON.stringify,
  },
  // headers: {
  //   authorization: 'Bearer YOUR_TOKEN'
  // }
})

export const useGetPosts = () => {
  const query = gql`
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
  `
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['posts'],
    queryFn: async ({ signal }) => {
      const res = await client.request({
        document: query, signal
      })
      return res
    },
    select: (res) => res.posts
  })

  return { data, isLoading, isError, error }
}

export const useGetPostDetail = (slug) => {
  const query = gql`
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
  `
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['post', slug],
    queryFn: async ({ signal }) => {
      const res = client.request({
        document: query, signal, variables: { slug }
      })
      return res
    },
    select: (res) => res.post
  })

  return { data, isLoading, isError, error }
}