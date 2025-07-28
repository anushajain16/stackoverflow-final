import { useState } from "react"
import axios from "axios"
import { X } from "lucide-react"

import Button from "../ui/Button"
import { Input } from "../ui/Input"
import Textarea from "../ui/TextArea"

import Badge from "../ui/Badge"
import Header from "../components/Header"
import SideBar from "../components/SideBar"

export default function AskQuestion() {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [category, setCategory] = useState("General")
  const [tags, setTags] = useState([])
  const [newTag, setNewTag] = useState("")
  const [loading, setLoading] = useState(false)

  const categories = [
    { name: "General" },
    { name: "Movies" },
    { name: "Tech" },
    { name: "Sports" },
    { name: "Education" },
    { name: "Gaming" },
  ]

  const addTag = (tagName) => {
    if (tagName.trim() && !tags.includes(tagName.trim())) {
      setTags([...tags, tagName.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag(newTag)
    }
  }

const postQuestion = async (e) => {
  e.preventDefault()

  const token = localStorage.getItem("token")

  if (!title.trim() || !body.trim() || tags.length === 0) {
    alert("Please fill all required fields.")
    return
  }

  const payload = {
    title,
    body,
    tags: tags.map((tag) => tag.trim().toLowerCase()),
    category: category.trim().toUpperCase()
  }

  try {
    setLoading(true)

    await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/stackoverflow/submit-question`,
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    )

    alert("Question and tags submitted successfully!")

    // Reset form
    setTitle("")
    setBody("")
    setCategory("General")
    setTags([])
    setNewTag("")
  } catch (error) {
    console.error("Submission failed:", error)
    alert("Failed to post question. Please try again.")
  } finally {
    setLoading(false)
  }
}



  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto flex">
        <SideBar />
        <main className="flex-1 p-6">
          <div className="max-w-2xl">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Ask Question</h1>

            <form className="space-y-6" onSubmit={postQuestion}>
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Title*
                </label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter your question title"
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-2">
                  Body*
                </label>
                <Textarea
                  id="body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Describe your question in detail"
                  className="w-full min-h-[120px] resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select a category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="block w-48 px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="" disabled>Select category</option>
                  {categories.map((cat) => (
                    <option key={cat.name} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags*</label>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                        {tag}
                        <button type="button" onClick={() => removeTag(tag)} className="ml-1 hover:text-red-500">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Add a tag"
                      className="w-full"
                    />
                    <Button
                      type="button"
                      onClick={() => addTag(newTag)}
                      className="bg-gray-300 text-sm"
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3" disabled={loading}>
                {loading ? "Posting..." : "Post your Question"}
              </Button>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}
