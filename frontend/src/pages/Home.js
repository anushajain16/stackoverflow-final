import React, { useState } from 'react';
import Header from '../components/Header'
import Sidebar from '../components/SideBar';
import Button from '../ui/Button';
import thumb from '../images/img_thumbs_up.svg'
import answer from "../images/img_speech_bubble.svg" 
import eye from "../images/img_eye.svg" 
import arrow from "../images/img_arrowright.svg"
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useEffect } from 'react';



const Home = () => {
  const [activeTab, setActiveTab] = useState('Newest');
  const tabs = ['Newest', 'Unanswered','Ask Question', 'My Questions',];
  const [questions, setQuestions] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const name = localStorage.getItem('name');
  
  const fetchQuestions = async () => {
    try {
      const token = localStorage.getItem('token');
      const org_id = localStorage.getItem('orgId');
      const response = await axios.get(`http://localhost:9090/stackoverflow/questions/${org_id}`,{
         headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAllQuestions(response.data);
      setQuestions(response.data);
    } catch (err) {
      setError("Failed to load questions.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchQuestions();
  }, []);
  
  useEffect(() => {
  if (activeTab === "Unanswered") {
    const filtered = allQuestions.filter(q => q.answers.length === 0);
    setQuestions(filtered);
  } else if (activeTab === "My Questions") {
    const userId = localStorage.getItem("userId");
    const filtered = allQuestions.filter(q => q.user.id == userId);
    setQuestions(filtered);
  } else if(activeTab==="Ask Question"){
    navigate("../ask")
  }
   else {
    setQuestions(allQuestions);
  }
}, [activeTab]);

  const questionClick=(id)=>{
    navigate(`../answer/${id}`);
    viewCount(id)
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };


  const viewCount = async(id) =>{
    try{
      const token = localStorage.getItem("token")
      await axios.put(`http://localhost:9090/stackoverflow/questions/${id}/view`,
      {},
      {headers: { Authorization: `Bearer ${token}` }})
    } catch(err){
      console.error("View could not be incremented")
    }
  }

  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-full bg-global-2">
      <Header /> {/* Navbar */}

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-4 px-4 sm:px-5 md:px-6 lg:px-8 py-4 lg:py-6 ">
        {/* Sidebar */}
        <Sidebar className="fixed top-0 left-0 h-screen w-64 bg-white shadow z-50"/>

        {/* Questions Content */}
        <main className="flex-1 bg-global-2">
          {/* Questions Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 border-b border-primary sm:py-5 bg-global-2">
            <h1 className="text-lg sm:text-xl font-inter font-medium text-global-1">
              All Questions
            </h1>
            
            {/* Tabs */}
            <div className="flex flex-wrap gap-3 sm:gap-5">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`text-sm sm:text-base font-inter font-medium transition-colors ${
                    activeTab === tab 
                      ? 'text-global-4' :'text-global-3 hover:text-global-4'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Questions List */}
          <div className="flex flex-col gap-1 sm:gap-1.5">
            {questions.map((question) => (
              <article key={question.id} className="border-b border-primary sm:p-3 md:p-4 hover:bg-global-4"
                onClick={()=>questionClick(question.id)} >
                <div className="flex flex-col gap-3 sm:gap-4">
                  {/* Question Header */}
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-4">
                    <h2 className="text-base sm:text-lg font-inter font-bold text-global-4">
                      {question.user.name}
                    </h2>
                    <span className="text-xs font-inter font-normal text-global-1 self-start sm:self-end">
                      Asked on {new Date(question.createdAt).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>

                  {/* Question Title */}
                  <h3 className="text-xl sm:text-2xl font-inter font-medium  text-global-1">
                    {question.title}
                  </h3>

                  {/* Question Description */}
                  <p className="text-sm font-inter font-normal text-global-1 max-w-full sm:max-w-[96%]">
                    {question.body}
                  </p>

                  {/* Tag */}
                  <div className="flex justify-start">
                    {question.questionTags?.map((qt, index) => (
                      <Button
                        key={index}
                        variant="primary"
                        size="small"
                        className="text-xs sm:text-sm px-2 sm:px-3 py-0.5 sm:py-0.5 rounded-md mr-1"
                      >
                        {qt.tag.name}
                      </Button>
                    ))}
                  </div>

                  {/* Question Actions */}
                  <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 items-center">
                    {/* Votes */}
                    <div className="flex items-center gap-1 sm:gap-1.5">
                      <img 
                        src={thumb}
                        alt="Votes" 
                        className="w-5 h-5 sm:w-6 sm:h-6"
                      />
                      {question.upvotes-question.downvotes}
                      <span className="text-sm sm:text-base font-inter font-medium text-global-1">
                        Votes
                      </span>
                    </div>

                    {/* Answers */}
                    <div className="flex items-center gap-1 sm:gap-1.5">
                      <img 
                        src={answer}
                        alt="Answers" 
                        className="w-5 h-5 sm:w-6 sm:h-6"
                      />
                      {question.answers.length}
                      <span className="text-sm sm:text-base font-inter font-medium text-global-1">
                        Answers
                      </span>
                    </div>

                    {/* Views */}
                    <div className="flex items-center gap-1 sm:gap-1.5">
                      <img 
                        src={eye}
                        alt="Views" 
                        className="w-5 h-5 sm:w-6 sm:h-6"
                      />
                      {question.views}
                      <span className="text-sm sm:text-base font-inter font-medium  text-global-1">
                        Views
                      </span>
                    </div>

                    {/* Category */}
                    <div className="flex items-center gap-1 sm:gap-1.5">
                      <Button
                      variant="primary"
                      size="small"
                      className="text-xs sm:text-sm px-2 sm:px-2 py-0.5 sm:py-1 rounded-md"
                    >
                      {question.cat.charAt(0).toUpperCase() + question.cat.slice(1).toLowerCase()}
                    </Button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-full lg:w-[20%] flex flex-col gap-6 lg:gap-8">
          {/* Welcome Card */}
          <div className="border border-primary rounded-md bg-global-2">
            <div className="p-2 sm:p-4">
              {localStorage.getItem("token") ? (
                <>
                <p className="text-sm sm:text-base font-inter font-normal text-global-2 mb-2 sm:mb-4">
                
                  Hello, <span className="font-semibold">{name.charAt(0).toUpperCase()+name.slice(1)}</span> 
                </p>
                <Button
                      variant="primary"
                      size="small"
                      className="text-m sm:text-sm pl-14 pr-14 ml-3"
                      onClick={() => navigate("../ask")}
                    >
                      Ask Question
                    </Button>
                  </>
              ) : (
                <>
                  <p className="text-sm sm:text-base font-inter font-normal text-global-2 mb-4 sm:mb-6">
                    Welcome!!<br />
                    To continue with the open-source Q&A platform software
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <Button
                      variant="primary"
                      size="small"
                      className="text-xs sm:text-sm"
                      onClick={() => navigate("/signup")}
                    >
                      Register
                    </Button>
                    <Button
                      variant="secondary"
                      size="small"
                      rightIcon={arrow}
                      className="text-xs sm:text-sm"
                      onClick={() => navigate("/login")}
                    >
                      Sign in
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>


          {/* FAQ Section */}
          <div className="border border-primary rounded-lg bg-global-2">
            <div className="p-4 sm:p-5">
              <h3 className="text-sm sm:text-base font-inter font-semibold  text-global-4 mb-4 sm:mb-6">
                Frequently Asked Questions
              </h3>
              <Button
                variant="primary"
                size="small"
                className="text-m sm:text-sm pl-14 pr-14 ml-3"
                onClick={()=>navigate("/FAQ")}
              >
                Have a Look
              </Button>
              
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Home;