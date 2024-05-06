// import './App.css'
// import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import LoginForm from '../src/Components/LoginForm'

// function App() {

//   return (
//     <>
//       <LoginForm />
//     </>
//   )
// }

// export default App
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import Home from './Components/Home'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path='/' element={<Home />} />
    </Routes>
  </BrowserRouter>
);

export default App;
