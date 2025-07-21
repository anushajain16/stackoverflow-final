import VoteButton from "../components/VoteButton"
import Badge from "../ui/Badge"
import Button from "./Button"
import axios from "axios"
export default function AnswerCard({ answer, onEdit, onDelete }) {
  const currentUserId = localStorage.getItem("userId")

  const formattedName = answer.user?.name
    ? answer.user.name.charAt(0).toUpperCase() + answer.user.name.slice(1).toLowerCase()
    : ""

  const formattedModifiedDate = new Date(answer.updatedAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })

  const formattedAnsweredDate = new Date(answer.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })


  const handleQuestionVote = async (vote) => {
  try {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    await axios.put(
      `http://localhost:9090/stackoverflow/answer/${answer.id}/vote?vote=${vote}&userId=${userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    window.location.reload();
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

  return (
    <div className="border-b pb-6 mb-6">
      <div className="flex gap-4">
        <div className="flex-1">
          {answer.isAccepted && (
            <Badge className="bg-green-100 text-green-800 mb-3">Best Answer</Badge>
          )}

          <p className="text-global-1 mb-4">{answer.body}</p>

          {/* Grid layout for Vote | Modified | Answered */}
          <div className="grid grid-cols-3 items-center text-sm text-gray-500 mt-4">
            {/* Left: Vote Buttons */}
            <div className="flex justify-start">
              <VoteButton 
                count = {answer.upvotes-answer.downvotes}
                onUpvote= {()=> handleQuestionVote(1)}
                onDownvote={()=>handleQuestionVote(-1)}
              />
            </div>

            {/* Center: Modified */}
            <div className="text-center mt-6 text-xs">
              Modified {formattedModifiedDate}
            </div>

            {/* Right: Answered by + date */}
            <div className="text-right">
              <div className="text-global-4 font-medium">{formattedName}</div>
              <div className="text-xs">Answered {formattedAnsweredDate}</div>
            </div>
          </div>

          {/* Update/Delete Buttons */}
          {answer.user?.id === Number(currentUserId) && (
            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="primary"
                onClick={() => onEdit(answer)}
              >
                Update
              </Button>
              <Button
                variant="secondary"
                onClick={() => onDelete(answer.id)}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
