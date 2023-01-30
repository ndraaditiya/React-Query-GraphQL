import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

const Posts = lazy(() => import('./pages/Posts'))
const PostDetail = lazy(() => import('./pages/PostDetail'))

function App() {

  return (
    <div className="App">
      <Suspense fallback={'Loading..'}>
        <Routes>
          <Route path='/' element={<Posts />} />
          <Route path='/:slug' element={<PostDetail />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
