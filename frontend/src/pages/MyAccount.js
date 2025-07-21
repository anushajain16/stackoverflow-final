import { useEffect, useState } from "react"
import axios from "axios"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import Card from "../ui/Card"
import CardContent from "../ui/CardContent"
import { Progress } from "../ui/Progress"
import Header from "../components/Header"
import SideBar from "../components/SideBar"
import StatCard from "../ui/StatCard";

export default function MyAccount() {
  const [userStats, setUserStats] = useState(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token")
        const userId = localStorage.getItem("userId")

        const res = await axios.get(`http://localhost:9090/stackoverflow/${userId}/stats`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const activity = res.data.monthlyActivity;
        const fullMonthlyData = Array.from({ length: 12 }, (_, i) => {
        const monthData = activity.find((m) => m.month === i + 1);
        return {
          month: i + 1,
          year: monthData?.year || new Date().getFullYear(),
          count: monthData?.count || 0
        };
      });

      setUserStats({ ...res.data, monthlyActivity: fullMonthlyData });

      } catch (err) {
        console.error("Failed to fetch user stats", err)
      }
    }

    fetchStats()
  }, [])

  if (!userStats) {
    return <div className="p-6 text-gray-600">Loading...</div>
  }

  const {
    questionCount,
    organisation_id,
    answerCount,
    unansweredQuestions,
    name,
    monthlyActivity, 
    totalUpvotes,
    totalViews,
    totalDownvotes,
    categoryDistribution
  } = userStats

  const engagementFunnel = {
        views: totalViews,
        upvotes: totalUpvotes,
        downvotes: totalDownvotes,
        questions: questionCount,
        answers: answerCount
    };

  const total = categoryDistribution.reduce((sum, item) => sum + item.count, 0);
    const formattedDistribution = categoryDistribution.map(item => ({
        category: item.category,
        percent: Number(((item.count / total) * 100).toFixed(1)),
    }));

    console.log(formattedDistribution)

  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex max-w-7xl mx-auto">
        <SideBar />
        <main className="flex-1 p-6">
          {/* User Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">{name}</h1>
            <p className="text-global-4">{organisation_id}</p>
          </div>

          {/* Cards */}
          <div className="flex gap-6 mb-8">
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-4">
                <StatCard label="Questions Asked" value={questionCount} />
                <StatCard label="Answers Given" value={answerCount} />
                <StatCard 
                    label="Avg. Votes per Answer" 
                    value={
                        answerCount > 0 
                        ? ((totalDownvotes + totalUpvotes) / answerCount).toFixed(2) 
                        : "0.00"
                    } 
                />

                <StatCard label="Total Upvotes" value={totalUpvotes} />
                <StatCard label="Unanswered Questions" value={unansweredQuestions} />
                <StatCard label="Total Downvotes" value={totalDownvotes} />
              </div>
            </div>

            {/* Monthly Activity Bar Chart */}
            <div className="flex-1">
              <Card className="h-full">
                <p className="font-bold mt-2 ml-2">Monthly Activity</p>
                <CardContent className="h-full">
                    <div className="h-48 flex items-end justify-between space-x-2 relative group">
                    {(() => {
                        const maxCount = Math.max(...monthlyActivity.map(m => m.count || 0))
                        return monthlyActivity.map(({ month, count }, idx) => {
                        const height = Math.min((count / maxCount) * 100, 100)
                        return (
                            <div
                                key={`month-${month}-${idx}`} // safer key
                                className="bg-global-1 rounded-t flex-1 relative hover:bg-purple-600 transition-colors cursor-pointer group/bar"
                                style={{ height: `${height}%` }}
                            >
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100">
                                {count}
                            </div>
                            </div>
                        )
                        })
                    })()}
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                    {monthlyActivity.map(({ month }, idx) => (
                        <span key={`label-${month}-${idx}`}>
                        {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][month - 1]}
                        </span>
                    ))}
                    </div>
                </CardContent>
                </Card>

            </div>
          </div>

          {/* Category Pie + Funnel */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Distribution */}
            
            <Card>
                <p className="mt-2 ml-2 mr-2 font-bold mb-2">Category-wise Questions Asked</p>
                <CardContent>
                    {/* PIE CHART */}
                    <div className="h-60 w-full ">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                        <Pie
                            data={formattedDistribution}
                            dataKey="percent"
                            nameKey="category"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                        >
                            {formattedDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={getColor(index)} />
                            ))}
                        </Pie>
                        <Tooltip />
                        
                        </PieChart>
                    </ResponsiveContainer>
                    </div>

                    {/* CATEGORY LIST */}
                    {formattedDistribution.map((item, i) => (
                    <div key={i} className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: getColor(i) }}
                        ></div>
                        <span className="text-sm">{capitalize(item.category)}</span>
                        </div>
                        <span className="text-sm font-medium">{item.percent}%</span>
                    </div>
                    ))}
                </CardContent>
            </Card>



            {  
            <Card>
              <p className="mt-2 ml-2 mr-2 font-bold mb-4">User Engagement</p>
              <CardContent className="space-y-5">
                {Object.entries(engagementFunnel).map(([label, value]) => (
                  <div key={label}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">{capitalize(label)}</span>
                      <span className="text-sm font-medium">{value}</span>
                    </div>
                    <Progress value={getProgress(value, engagementFunnel)} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
            }
          </div>
        </main>
      </div>
    </div>
  )
}

function getColor(index) {
  const colors = ["#decbed	", "#c7a7e1", "#995ec8", "#683292", "#8b5cf6", "#341949"]
  return colors[index % colors.length]
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

function getProgress(value, data) {
  const max = Math.max(...Object.values(data))
  return (value / max) * 100
}
