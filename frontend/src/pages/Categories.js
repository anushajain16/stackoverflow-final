import gen from '../images/img_icon_blue_gray_400.svg'
import gaming from '../images/img_playstation_charge1.svg'
import movie from '../images/img_video_camera.svg'
import education from '../images/img_matemathic.svg'
import tech from '../images/img_icon.svg'
import sport from '../images/img_icon_blue_gray_400_24x24.svg'
import Card from "../ui/Card";
import CardContent from "../ui/CardContent";
import SideBar from "../components/SideBar"
import Header from "../components/Header"
import { useNavigate } from "react-router-dom";

export default function Categories() {
  const categories = [
    {
      id: 1,
      name: "General",
      icon: gen,
      color: "text-global-4",
      description: "General discussion of no particular or specific domain.",
    },
    {
      id: 2,
      name: "Sports",
      icon: sport,
      color: "text-global-4",
      description: "Discussions on games, athletes, scores, and major sporting events.",
    },
    {
      id: 3,
      name: "Tech",
      icon: tech,
      color: "text-global-4",
      description: "Explore the latest trends in software, hardware, and emerging technologies.",
    },
    {
      id: 4,
      name: "Gaming",
      icon: gaming,
      color: "text-global-4",
      description: "Talk about new games, platforms, strategies, and gaming culture.",
    },
    {
      id: 5,
      name: "Movies",
      icon: movie,
      color: "text-global-4",
      description: "Dive into movie reviews, recommendations, and cinematic discussions.",
    },
    {
      id: 6,
      name: "Education",
      icon: education,
      color: "text-global-4",
      description: "Share insights on learning methods, academic resources, and career guidance."
    },
  ];

  const navigate = useNavigate();
  const handleClick = (categoryName) => {
    navigate(`/questions?cat=${categoryName}`);
    console.log(categoryName+" clicked")
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header />
      <div className="max-w-7xl mx-auto flex gap-6 p-6">
        {/* Left Sidebar */}
        <SideBar />

        {/* Main Content */}
        <main className="flex-1">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-global-2">Categories</h1>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Card
                key={category.id}
                onClick={() => handleClick(category.name.toUpperCase())}
                className="hover:shadow-md transition-shadow cursor-pointer p-8"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg`}>
                      <img src={category.icon} alt={`${category.name} icon`} className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1 mb-2">
                        <h3 className={`font-semibold ${category.color}`}>{category.name}</h3>
                      </div>
                      <p className="text-global-1 text-sm">{category.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
