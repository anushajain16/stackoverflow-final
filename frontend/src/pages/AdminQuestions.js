import { useState} from "react"
import SearchView from "../ui/SearchView"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/Table"
import AdminHeader from "../components/AdminHeader"
import AdminSidebar from "../components/AdminSidebar"
import axios from "axios"
import { useEffect } from "react"    
import Button from "../ui/Button"

const getCategoryColor = (category) => {

  const colors = {
    GENERAL: "bg-gray-100 text-gray-800",
    SPORTS: "bg-green-100 text-green-800",
    MOVIES: "bg-purple-100 text-purple-800",
    TECH: "bg-blue-100 text-blue-800",
    GAMING: "bg-red-100 text-red-800",
    EDUCATION: "bg-yellow-100 text-yellow-800",
  };

  return colors[category] || "bg-gray-100 text-gray-800";
};

export function AdminQuestions() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("createdOn")
    const [sortOrder, setSortOrder] = useState("desc")
    const[questions, setQuestions] = useState([])

    const fetchQuestions = async () => {
        try {
        const token = localStorage.getItem("token")
        const orgId = localStorage.getItem("orgId")
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/stackoverflow/questions/${orgId}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        setQuestions(response.data)
        } catch (err) {
        setError("Failed to load users.")
        } finally {
        setLoading(false)
        }
    }

     useEffect(() => {
        fetchQuestions()
      }, [])

    const deleteQuestion = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this question?");
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token");
            await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/stackoverflow/admin/questions/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
            });

            // Refresh questions
            setQuestions((prev) => prev.filter((q) => q.id !== id));
            alert("Question deleted successfully");
        } catch (err) {
            alert("Failed to delete question");
            console.error(err);
        }
    };


    const filtered = questions.filter((question) => {
    const title = question.title?.toLowerCase() || "";
    const category = question.cat?.toLowerCase() || "";
    const askedBy = question.user.name?.toLowerCase() || "";
    const term = searchTerm.toLowerCase();

    return (
        title.includes(term) ||
        category.includes(term) ||
        askedBy.includes(term)
    );
    });

    const filteredAndSortedData = filtered.sort((a, b) => {
    let aValue = a[sortBy] ?? "";
    let bValue = b[sortBy] ?? "";

    if (typeof aValue === "string") aValue = aValue.toLowerCase();
    if (typeof bValue === "string") bValue = bValue.toLowerCase();

    if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
    });


  return (
    <div className="flex flex-col w-full bg-global-2">
        <AdminHeader />
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-4 px-4 sm:px-5 md:px-6 lg:px-8 py-4 lg:py-6">
        <AdminSidebar/>
      {/* Search and Sort Controls */}
      <main className="flex-1 p-6">
       
      <div className="p-3 border-b border-gray-200 bg-gray-50 mt-0">
        
        <div className="flex items-center justify-between gap-4">
             <h1 className="text-2xl font-semibold text-gray-900">User Details</h1>
          <div className="relative flex-1 max-w-md">
            
            <SearchView
              placeholder="Search questions, categories, or users..."
              value={searchTerm}
              onSearch={setSearchTerm}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                <option value="createdOn">Created Date</option>
                <option value="updatedOn">Updated Date</option>
                <option value="upvotes">Upvotes</option>
                <option value="downvotes">Downvotes</option>
                <option value="views">Views</option>
                <option value="category">Category</option>
                <option value="askedBy">Asked By</option>
            </select>


            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="p-1 hover:bg-gray-100 rounded-md transition-colors ml-0"
              title={`Sort ${sortOrder === "asc" ? "descending" : "ascending"}`}
            > 
            </button>
          </div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="w-16">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Asked By</TableHead>
            <TableHead className="text-center">Upvotes</TableHead>
            <TableHead className="text-center">Downvotes</TableHead>
            <TableHead className="text-center">Views</TableHead>
            <TableHead>Created On</TableHead>
            <TableHead>Updated On</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAndSortedData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                No questions found matching your search criteria.
              </TableCell>
            </TableRow>
          ) : (
            filteredAndSortedData.map((question, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell className="font-medium">{question.id}</TableCell>
                <TableCell className="text-blue-600 hover:text-blue-800 cursor-pointer">{question.title}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(
                      question.cat,
                    )}`}
                  >
                    {question.cat}
                  </span>
                </TableCell>
                <TableCell>{question.user.name}</TableCell>
                <TableCell className="text-center">{question.upvotes}</TableCell>
                <TableCell className="text-center">{question.downvotes}</TableCell>
                <TableCell className="text-center">{question.views}</TableCell>
                <TableCell className="text-gray-600">{new Date(question.createdAt).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'long',
                      })}</TableCell>
                <TableCell className="text-gray-600">{new Date(question.updatedAt).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'long',
                      })}</TableCell>
                <TableCell>
                    <Button
                        onClick={() => deleteQuestion(question.id)}
                        className="text-red-600 hover:underline text-sm"
                    >
                        Delete
                    </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      </main>
      </div>
    </div>
  )
}
