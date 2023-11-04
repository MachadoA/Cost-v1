import {  Routes, Route, BrowserRouter} from 'react-router-dom';
import Home from './components/pages/Home';
import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import Projects from './components/pages/Projects';
import NewProject from './components/pages/NewProject';
import Container from './components/layout/Container';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import Project from './components/pages/Project';


function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Container customClass="min-height">
        <Routes>
            <Route exact path= "/" element={<Home/>}/> 
            <Route path= "/Company" element={<Company/>}/> 
            <Route path= "/Projects" element={<Projects/>}/> 
            <Route path= "/Contact" element={<Contact/>}/> 
            <Route path= "/NewProject" element={<NewProject/>}/>  
            <Route path= "/project/:id" element={<Project/>}/>  
        </Routes>
      </Container>

      <Footer />

    </BrowserRouter>
  );
}

export default App;
