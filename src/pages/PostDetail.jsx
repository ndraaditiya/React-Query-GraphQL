import { useNavigate, useParams } from 'react-router-dom'
import { Fragment } from 'react'
import { useGetPostDetail } from '../services'

const PostDetail = () => {
  const navigate = useNavigate()
  const { slug } = useParams()
  const { data: post, isLoading, isError, error } = useGetPostDetail(slug)

  if (isLoading) return 'Loading..'

  if (isError) return <p>{error}</p>

  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text

    if (obj) {
      if (obj?.bold) {
        modifiedText = (<b key={index}>{text}</b>)
      }

      if (obj?.italic) {
        modifiedText = (<em key={index}>{text}</em>)
      }

      if (obj?.underline) {
        modifiedText = (<u key={index}>{text}</u>)
      }
    }

    switch (type) {
      case 'heading-three':
        return (
          <h3 key={index}>
            {modifiedText.map((item, i) => <Fragment key={i}>{item}</Fragment>)}
          </h3>
        )
      case 'paragraph':
        return (
          <p key={index}>
            {modifiedText.map((item, i) => <Fragment key={i}>{item}</Fragment>)}
          </p>
        )
      case 'heading-four':
        return (
          <h4 key={index}>
            {modifiedText.map((item, i) => <Fragment key={i}>{item}</Fragment>)}
          </h4>
        )
      default:
        return modifiedText;
    }
  }

  return (
    <div className='post-detail'>
      <h2>
        <span className='back-icon' onClick={() => navigate('/')}>
          <i className="fa-solid fa-circle-chevron-left"></i>
        </span>
        {post?.title}
      </h2>
      <div className='thumb-detail-container'>
        <img src={post?.featuredImage?.url} className='thumb-detail' />
      </div>
      <div className='author'>
        <img src={post?.author?.photo?.url} className='author-photo' />
        <span>{post?.author?.name}</span>
        <span className='date-posted'>
          {new Date(post?.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
      </div>
      {post?.content?.raw.children.map((typeObj, index) => {
        const children = typeObj.children.map((item, itemIndex) => getContentFragment(itemIndex, item?.text, item))
        return getContentFragment(index, children, typeObj, typeObj.type)
      })}
    </div>
  )
}

export default PostDetail