import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import Header from "../components/Header"
import SideBar from "../components/SideBar"
import Card from "../ui/Card"
import CardContent from "../ui/CardContent"
import Textarea from "../ui/TextArea"
import Button from "../ui/Button"
import VoteButton from "../components/VoteButton"
import AnswerCard from "../ui/AnswerCard"
import { useNavigate } from "react-router-dom"

export default function Answer() {
  const { id } = useParams()
  const [answer, setAnswer] = useState("")
  const [questionData, setQuestionData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [catQuestion, setCatQuestion] = useState([])
  const userId = localStorage.getItem("userId")
  const [isSaved, setIsSaved] = useState(false);
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState("")
  const [editedBody, setEditedBody] = useState("")
  const [editingAnswerId, setEditingAnswerId] = useState(null)
  const [editingText, setEditingText] = useState("")
  const navigate = useNavigate();
  
  const fetchQuestionDetails = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get(`http://localhost:9090/stackoverflow/answer/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setQuestionData(response.data)
    } catch (err) {
      setError("Failed to load question.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuestionDetails()
  }, [id])

  const handlePostAnswer = async () => {
    try {
      const token = localStorage.getItem("token")
      await axios.post(
        `http://localhost:9090/stackoverflow/answer`,
        {  body: answer,                      
        user: { id: userId },              
        questions: { id: Number(id) } },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setAnswer("")
      fetchQuestionDetails()
    } catch (err) {
      console.error("Failed to post answer", err)
    }
  }

  useEffect(() => {
  const token = localStorage.getItem("token");
  const orgId = localStorage.getItem("orgId");
  
  if (questionData?.cat && token && orgId) {
    handleRelatedQuestions(token, parseInt(orgId, 10));
  } else if (!token || !orgId) {
    setError("Authentication failed. Please login again.");
  }
}, [questionData?.cat]);

const handleRelatedQuestions = async (token, orgId) => {
  try {
    const response = await axios.get(
      `http://localhost:9090/stackoverflow/categories/${questionData.cat}/org/${orgId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setCatQuestion(response.data);
  } catch (err) {
    console.error("Related question fetch failed", err);
    setError("Could not find related questions");
  }
};

  useEffect(() => {
  const checkSavedStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const orgId = localStorage.getItem("orgId")

      const response = await axios.get("http://localhost:9090/stackoverflow/saved", {
        headers: {
          Authorization: `Bearer ${token}`,
          userId,
          orgId
        },
      });

      const savedIds = response.data.map(q => q.id);
      setIsSaved(savedIds.includes(Number(id)));
    } catch (err) {
      console.error("Failed to check saved status", err);
    }
  };

  if (id) checkSavedStatus();
}, [id]);

  const handleToggleSave = async () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  try {
    if (!isSaved) {
      await axios.post(
        `http://localhost:9090/stackoverflow/saved/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            userId,
          },
        }
      );
      setIsSaved(true);
    } else {
      await axios.delete(`http://localhost:9090/stackoverflow/unsave/${Number(id)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          userId,
        },
      });
      setIsSaved(false);
    }
  } catch (err) {
    console.error("Failed to toggle saved status", err);
  }
};

    const handleEditClick = () => {
    setIsEditing(true)
    setEditedTitle(questionData.title)
    setEditedBody(questionData.body)
  }

  const handleUpdateQuestion = async () => {
    const token = localStorage.getItem("token")
    try {
      await axios.put(
        `http://localhost:9090/stackoverflow/questions/${id}`,
        {
          title: editedTitle,
          body: editedBody,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      setIsEditing(false)
      fetchQuestionDetails()
    } catch (err) {
      console.error("Failed to update question", err)
    }
  }

  const handleDeleteQuestion = async () => {
    const token = localStorage.getItem("token")
    const orgId = localStorage.getItem("orgId")
    try {
      await axios.delete(`http://localhost:9090/stackoverflow/questions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      navigate(`/${orgId}`) // Go to homepage or questions list after deletion
    } catch (err) {
      console.error("Failed to delete question", err)
    }
  }

  
  const handleEditAnswer = (ans) => {
    setEditingAnswerId(ans.id)
    setEditingText(ans.body)
  }

  const handleUpdateAnswer = async () => {
    try {
      const token = localStorage.getItem("token")
      await axios.put(
        `http://localhost:9090/stackoverflow/answer/${editingAnswerId}`,
        { body: editingText },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setEditingAnswerId(null)
      setEditingText("")
      fetchQuestionDetails()
    } catch (err) {
      console.error("Failed to update answer", err)
    }
  }

  const handleDeleteAnswer = async (answerId) => {
    try {
      const token = localStorage.getItem("token")
      await axios.delete(`http://localhost:9090/stackoverflow/answer/${answerId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchQuestionDetails()
    } catch (err) {
      console.error("Failed to delete answer", err)
    }
  }

  const handleQuestionVote = async (vote) => {
  try {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    await axios.put(
      `http://localhost:9090/stackoverflow/questions/${id}/vote?vote=${vote}&userId=${userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchQuestionDetails(); // refresh UI
  } catch (err) {
    if (err.response?.status === 409) {
      alert("You have already voted on this question.");
    } else if (err.response?.status === 401) {
      alert("Unauthorized. Please login again.");
    } else {
      alert("Vote failed.");
      console.error(err);
    }
  }
};



  if (loading) return <p className="text-gray-600">Loading...</p>
  if (error) return <p className="text-red-600">{error}</p>

  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto flex gap-6 p-4">
        <SideBar />
        <main className="flex-1">
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            {/* EDITING MODE */}
            {isEditing ? (
              <>
                <input
                  className="w-full border p-2 mb-2 text-xl font-semibold"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
                <Textarea
                  className="w-full h-40 mb-4 border p-2"
                  value={editedBody}
                  onChange={(e) => setEditedBody(e.target.value)}
                />
                <div className="flex gap-2 justify-end">
                  <Button variant="primary" onClick={handleUpdateQuestion}>
                    Save
                  </Button>
                  <Button variant="secondary" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <>
              <div className="flex justify-between">
                <h1 className="text-2xl font-semibold text-global-1 mb-1">{questionData.title}</h1>
                {questionData.user.id === Number(userId) && !isEditing && (
                    <div className="flex gap-2 ">
                        <Button variant="primary" onClick={handleEditClick}>
                        Update
                        </Button>
                        <Button variant="secondary" onClick={handleDeleteQuestion}>
                        Delete
                        </Button>
                    </div>
                  
                )}
                </div>
                <div className="text-xs text-gray-500 mb-4">
                  <span className="mr-4">
                    Asked on{" "}
                    {new Date(questionData.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <span className="mr-4">
                    Updated on{" "}
                    {new Date(questionData.updatedAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {questionData.questionTags?.map((qt, i) => (
                    <Button key={i} variant="primary" size="small">
                      {qt.tag.name}
                    </Button>
                  ))}
                </div>
                <p className="text-global-1 mb-4">{questionData.body}</p>
              </>
            )}

            <VoteButton 
              count={questionData.upvotes - questionData.downvotes}
              onUpvote={() => handleQuestionVote(1)}
              onDownvote={() => handleQuestionVote(-1)}
              
            />

            <div className="flex items-center gap-1 mt-4">
              <Button variant="primary" size="small">
                {questionData.cat.charAt(0).toUpperCase() + questionData.cat.slice(1).toLowerCase()}
              </Button>
            </div>

            <span className="flex justify-end text-xs">
              Asked by:
              <span className="text-global-4 font-bold ml-1">{questionData.user?.name}</span>
            </span>

            <div className="flex justify-end text-xs mt-2">
              <Button onClick={handleToggleSave} size="small">
                {isSaved ? "Unsave Question" : "Save Question"}
              </Button>
            </div>
            
          </div>

          {/* ANSWERS */}
          <>
                      {questionData.answers?.length > 0 ? (
              questionData.answers.map((ans) =>
                editingAnswerId === ans.id ? (
                  <div key={ans.id} className="border-b pb-4 mb-4">
                    <Textarea
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className="mb-2"
                    />
                    <div className="flex gap-2 justify-end">
                      <Button variant="primary" size="small" onClick={handleUpdateAnswer}>
                        Save
                      </Button>
                      <Button
                        variant="secondary"
                        size="small"
                        onClick={() => {
                          setEditingAnswerId(null)
                          setEditingText("")
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <AnswerCard
                    key={ans.id}
                    answer={ans}
                    onEdit={handleEditAnswer}
                    onDelete={handleDeleteAnswer}
                  />
                )
              )
            ) : (
              <p className="global-text-6">No answers yet.</p>
            )}
         
          </>

          {/* POST YOUR ANSWER */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Answer</h3>
            <Textarea
              placeholder="Write your answer here..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="h-64 mb-4 resize-none"
            />
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8" onClick={handlePostAnswer}>
              Post your Answer
            </Button>
          </div>
        </main>

        <aside className="w-80">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-800 mb-4 pt-5">Related Questions</h3>
              <div className="space-y-3 text-sm">
                {catQuestion.length > 0 ? (
                  catQuestion
                    .filter(q => q.id !== questionData.id) // exclude current question
                    .map((q, idx) => (
                      <div key={idx}>
                        <div
                          className="text-blue-600 hover:text-blue-700 cursor-pointer mb-1"
                          onClick={() => window.location.href = `/answer/${q.id}`}
                        >
                          {q.title}
                        </div>
                        <div className="text-gray-500 text-xs">{q.body?.slice(0, 60)}...</div>
                      </div>
                    ))
                ) : (
                  <p className="text-gray-500 text-sm">No related questions found.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  )
}
