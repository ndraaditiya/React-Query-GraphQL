import { useQuery, } from '@tanstack/react-query'
import { gql, request } from "graphql-request";
import { hygraphApi } from '../config/api';

export const useGetPosts = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await request(hygraphApi, gql`
        query MyQuery {
          posts {
            title
            featuredImage {
              url
            }
            categories {
              id
              name
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