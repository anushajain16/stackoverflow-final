import Header from "../components/Header"
import Sidebar from "../components/SideBar"

const faq = [
    {
        "title":"How can I create an account on the website?",
        "body":"You can create an account by clicking the “Sign Up” button on the homepage. Fill in your name, email address, and password. Once registered, you can log in to ask and answer questions."
    },
    {
        "title":"Who can ask or answer questions?",
        "body":"Any registered user can ask or answer questions in the organization they have logged in into. If you’re logged in, you can start contributing immediately by clicking on the “Ask a Question” button or replying to existing questions."
    },
    {
        "title":"How do I search for existing questions?",
        "body":"Use the search bar at the top of the page to enter keywords, topics, or tags. The site will show a list of related questions to help you find answers quickly."
    },
    {
        "title":"Can I edit my question or answer after posting?",
        "body":"Yes, if you’re the author of a post, you can edit it at any time. Just go to your question or answer and click the “Update” button to make changes."
    },
    {
        "title":"What are tags and how do I use them?",
        "body":"Tags are keywords that describe the topic of your question. When posting a question, add relevant tags to help others find and answer it more easily. You can add multiple tags separated by commas."
    },
    {
        "title":"Can I pin or save important questions?",
        "body":"Yes, you can save questions by clicking the “Save” button. Saved questions will appear under the Saved section, so you can easily revisit them later."
    },
    {
        "title":"What happens when delete my question?",
        "body":"Deleting a question removes it from public view. You can only delete your own questions."
    }
]


const FAQ = () => {
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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6  border-b border-primary sm:py-5 bg-global-2">
            <h1 className="text-lg sm:text-xl font-inter font-bold text-global-1">
              Frequently Asked Questions
            </h1>
          </div>

          {/* FAQ List */}
          <div className="flex flex-col gap-1 sm:gap-1.5">
            {faq.map((question) => (
              <article className="border-b border-primary sm:p-3 md:p-4 hover:bg-global-4">
                <div className="flex flex-col gap-3 sm:gap-4">
                  {/* Question Title */}
                  <h3 className="text-xl sm:text-2xl font-inter font-medium  text-global-4">
                    {question.title}
                  </h3>

                  {/* Question Description */}
                  <p className="text-sm font-inter font-normal text-global-1 max-w-full sm:max-w-[96%]">
                    {question.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </main>  
      </div>
    </div>
  )
}

export default FAQ
