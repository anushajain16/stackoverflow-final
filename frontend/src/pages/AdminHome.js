import AdminSidebar from "../components/AdminSidebar"
import AdminHeader from "../components/AdminHeader"
import SearchView from "../ui/SearchView"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/Table"
import { useState, useEffect } from "react"
import axios from "axios"
import Button from "../ui/Button"

const AdminHome = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState("")

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token")
      const userId = localStorage.getItem("userId")
      const orgId = localStorage.getItem("orgId")
      const response = await axios.get(`http://localhost:9090/stackoverflow/admin/user`, {
        params: { userId: userId, organisationId: orgId },
        headers: { Authorization: `Bearer ${token}` },
      })
      setUsers(response.data)
    } catch (err) {
      setError("Failed to load users.")
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (text) => {
    setQuery(text)
    const token = localStorage.getItem("token")
    const orgId = localStorage.getItem("orgId")
    if (text.trim() === "") {
      fetchUsers() // if query is empty, reload all users
      return
    }
    try {
      const response = await axios.get(`http://localhost:9090/stackoverflow/admin/user/search`, {
        params: { query: text, organisationId: orgId },
        headers: { Authorization: `Bearer ${token}` },
      })
      setUsers(response.data)
    } catch (err) {
      setError("Search failed.")
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])



  return (
    <div className="flex flex-col w-full bg-global-2">
      <AdminHeader />
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-4 px-4 sm:px-5 md:px-6 lg:px-8 py-4 lg:py-6">
        <AdminSidebar />
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">User Details</h1>
              <div className="w-full sm:w-full md:w-[48%] order-3 sm:order-2">
                <SearchView
                  placeholder="Search by name or email"
                  onSearch={handleSearch}
                  className="w-full"
                />
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-200">
                    <TableHead>User Id</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Name</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <TableCell className="text-gray-900">{user.id}</TableCell>
                      <TableCell className="text-gray-900">{user.email}</TableCell>
                      <TableCell className="text-gray-900">{user.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {loading && <div className="p-4 text-gray-500">Loading...</div>}
              {error && <div className="p-4 text-red-500">{error}</div>}
              {users.length === 0 && !loading && <div className="p-4 text-gray-500">No users found.</div>}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminHome
