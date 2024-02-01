import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import ShowDetail from './ShowDetail';

const App = () => {
  return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/post/:id' element={<ShowDetail />} />
      </Routes>
  )
}

export default App