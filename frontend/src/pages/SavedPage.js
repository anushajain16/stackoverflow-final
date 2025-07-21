import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import thumb from '../images/img_thumbs_up.svg'
import answer from "../images/img_speech_bubble.svg" 
import eye from "../images/img_eye.svg" 

const SavedPage = () => {
    const [questions, setQuestions] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
  const fetchSaved = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const orgId = localStorage.getItem("orgId");

      const response = await axios.get(
        "http://localhost:9090/stackoverflow/saved",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            userId,
            orgId
          }
        }
      );

      setQuestions(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchSaved();
}, []);

  return (
    <div  className="flex flex-col w-full bg-global-2">
         <Header />
        
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-4 px-4 sm:px-5 md:px-6 lg:px-8 py-4 lg:py-6">
         <Sidebar />

        <main className="flex-1 bg-global-2">
          {/* Questions Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 border-b border-primary sm:py-5 bg-global-2">
            <h1 className="text-lg sm:text-xl font-inter font-medium text-global-1">
              Saved Questions 
            </h1>
            </div>

          {/* Questions List */}
          <div className="flex flex-col gap-1 sm:gap-1.5">
            {questions.map((question) => (
              <article key={question.id} className="border-b border-primary sm:p-3 md:p-4 hover:bg-global-4"
                onClick={()=> navigate(`../answer/${question.id}`)}>
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
      </div>
      
    </div>
  )
}

export default SavedPage
