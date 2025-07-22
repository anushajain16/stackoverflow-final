import { useState } from "react"
import Button from "../ui/Button"
import {Input} from "../ui/Input"
import Card from "../ui/Card";
import CardContent from "../ui/CardContent";
import { Link } from 'react-router-dom';
import Header from "../components/Header";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const [globalEmail, setGlobalEmail] = useState("")
  const [globalPassword, setGlobalPassword] = useState("")
  const [orgEmail, setOrgEmail] = useState("")
  const [orgPassword, setOrgPassword] = useState("")
  const [orgId, setOrgId] = useState("")
  const [globalName, setGlobalName] = useState("")
  const [orgName, setOrgName] = useState("")
  const [adminName, setAdminName] = useState("")

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async(e) => {
    e.preventDefault();
    setMessage('');

    try {
        // Step 1: Register User
        const userPayload = {
          name: globalName,
          email: globalEmail,
          password: globalPassword,
          role: 'USER',
          organisation: {
            id: parseInt(orgId, 10)
          }
        };

        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/stackoverflow/signup/user`, userPayload);
        setMessage('User registered and logged in successfully!');
        setTimeout(() => navigate('/login'), 1200);

      } catch (error) {
        const errMsg = error.response?.data || 'User registration failed.';
        setMessage(errMsg);
      }
  };

  const handleSignUpOrg = async (e) =>{
    e.preventDefault();
     setMessage('');
    if (!orgName.trim()) {
        alert("Please enter organisation name");
        return;
    }
    try {
        // Step 1: Register Organisation
        const orgResponse = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/stackoverflow/signup/admin`, {
          name: orgName
        });

        const createdOrg = orgResponse.data;

        if (!createdOrg) {
          setMessage('Organisation creation failed.');
          return;
        }

        // Step 2: Register Admin
        const adminPayload = {
          name: adminName,
          email: orgEmail,
          password: orgPassword,
          role: 'ADMIN',
          organisation: {
            id: createdOrg.id
          }
        };

        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/stackoverflow/signup/user`, adminPayload);
        setMessage('Admin registered and logged in successfully!');
        setTimeout(() => navigate('/login'), 1200);

      } catch (error) {
        const errMsg = error.response?.data || 'Admin registration failed.';
        setMessage(errMsg);
      }
    };

  return (
    <div className="min-h-screen">
      <Header/>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center px-6 py-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Welcome !</h1>
        <Card className="w-full max-w-4xl  border-2 bg-white p-8">
          <CardContent className="p-8 ">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-0">
              {/* Global User Section */}
              <div className="space-y-6 md:col-span-1">
                <h2 className="text-2xl font-bold text-global-4 text-center mb-8">User Sign Up</h2>
                <div className="space-y-4">
                    <div>
                    <Input
                      type="text"
                      placeholder="Name"
                      value={globalName}
                      onChange={(e) => setGlobalName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 text-global-1 rounded-lg "
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Email ID"
                      value={globalEmail}
                      onChange={(e) => setGlobalEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 text-global-1 rounded-lg "
                    />
                  </div>
                  <div>
                    <Input
                      type="password"
                      placeholder="Password"
                      value={globalPassword}
                      onChange={(e) => setGlobalPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg "
                    />
                  </div>
                  <div>
                    <Input
                      type="organisation"
                      placeholder="Organisation Id"
                      value={orgId}
                      onChange={(e) => setOrgId(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg "
                    />
                  </div>
                  <div className="text-global-6 text-xs">*Global User Organisation Id 100</div>
                  <div className="pt-4 flex justify-center">
                    <Button
                        onClick={handleSignUp}
                        variant="primary"
                        size="large"
                        className="text-xs sm:text-sm "
                    >
                        Sign Up
                    </Button>
                  </div>
                  {message && (
                    <p style={{ marginTop: '15px', color: 'green', fontWeight: 'bold', paddingLeft: '35px' }}>{message}</p>
                    )}
                </div>
              </div>
               <div className="hidden md:flex items-stretch justify-center">
                    <div className="w-px bg-gray-300"></div>
                </div>
               
              {/* Organisation Section */}
              <div className="space-y-6 md:col-span-1 mt-0.5">
                <h2 className="text-2xl font-bold text-global-4 text-center mb-8">Organisation Sign Up</h2>
                <div className="space-y-4">
                    <div>
                    <Input
                      type="text"
                      placeholder="Organisation Name"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg "
                    />
                  </div>
                  <div>
                    <Input
                      type="text"
                      placeholder="Admin Name"
                      value={adminName}
                      onChange={(e) => setAdminName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Email ID"
                      value={orgEmail}
                      onChange={(e) => setOrgEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg "
                    />
                  </div>
                  <div>
                    <Input
                      type="password"
                      placeholder="Password"
                      value={orgPassword}
                      onChange={(e) => setOrgPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div className="pt-4 flex justify-center">
                    <Button
                        onClick={handleSignUpOrg}
                        variant="primary"
                        size="large"
                        className="text-xs sm:text-sm "
                    >
                        Sign Up
                    </Button>
                  </div>
                  {message && (
                    <p style={{ marginTop: '15px', color: 'green', fontWeight: 'bold', paddingLeft: '35px' }}>{message}</p>
                    )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Register Link */}
        <div className="mt-8 text-center">
          <span className="text-global-2">Already have an account? </span>
          <Link to="/login" className="text-global-4 hover:text-global-2 font-medium">
            Login
          </Link>
        </div>
      </main>
    </div>
  )
}
