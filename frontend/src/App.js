import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage'
import Answer from './pages/Answer';
import Categories from './pages/Categories';
import QuestionsPage from './pages/QuestionsPage';
import SavedPage from './pages/SavedPage'
import AskQuestion from './pages/AskQuestion';
import MyAccount from './pages/MyAccount';
import FAQ from './pages/FAQ';
import SearchPage from './pages/SearchPage';
import AdminHome from './pages/AdminHome';
import { AdminQuestions } from './pages/AdminQuestions';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const orgId = localStorage.getItem('orgId');
  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
          <Route path={`/${orgId}`} element={<Home/>}></Route> 
          <Route path={'/'} element={<Home/>}></Route>
          <Route path={'/login'} element={<LoginPage/>}></Route>
          <Route path={'/signup'} element={<SignupPage/>}></Route>
          <Route path={'/answer/:id'} element={<Answer/>}></Route>
          <Route path={'/categories'} element={<Categories/>}></Route>
          <Route path={'/questions'} element={<QuestionsPage/>}></Route>
          <Route path = {'/saved'} element={<SavedPage/>}></Route>
          <Route path = {'/ask'} element={<AskQuestion/>}></Route>
          <Route path = {'/myaccount'} element={<MyAccount/>}></Route>
          <Route path = {'/FAQ'} element={<FAQ/>}></Route>
          <Route path = {'/search'} element={<SearchPage/>}></Route>
          <Route path = {'/admin-home'} element={<AdminHome/>}></Route>
          <Route path = {'/admin/questions'} element={<AdminQuestions/>}></Route>
          <Route path = {'/admin/stats'} element={<AdminDashboard/>}></Route>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
