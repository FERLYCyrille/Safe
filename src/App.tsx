import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NiveauQuiz from './components/level';
import QuizPlay from './components/quiz';
import DefaultPage from './pages/DefaultPage'

function App() {
  return (
    <div className='border-amber-500'>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz/:domain" element={<NiveauQuiz />} />
          <Route path="/quiz/:domain/play" element={<QuizPlay />} /> {/* ← route quiz */}
          <Route path="/default" element={<DefaultPage />} />

        </Routes>
      </Router>
    </div>

  );
}


export default App
