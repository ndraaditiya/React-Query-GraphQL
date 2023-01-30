import * as dotenv from 'dotenv'

dotenv.config()

// export const hygraphApi = 'https://api-ap-northeast-1.hygraph.com/v2/cl8iofm8c014g01rt6l0t1sx3/master'
export const hygraphApi = process.env.hygraphApiUrl
