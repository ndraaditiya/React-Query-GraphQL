import './App.css'
import { useGetPosts } from './services'

function App() {

  const { data, isLoading } = useGetPosts()

  if (isLoading) return 'Loading..'

  console.log(data)

  return (
    <div className="App">
      LAnding
    </div>
  )
}

export default App
