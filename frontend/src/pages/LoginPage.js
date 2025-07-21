import { useState } from "react"
import Button from "../ui/Button"
import {Input} from "../ui/Input"
import Card from "../ui/Card";
import CardContent from "../ui/CardContent";
import { Link, useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import axios from "axios";

export default function LoginPage() {
  const [globalEmail, setGlobalEmail] = useState("")
  const [globalPassword, setGlobalPassword] = useState("")
  const [orgEmail, setOrgEmail] = useState("")
  const [orgPassword, setOrgPassword] = useState("")
  const [orgId, setOrgId] = useState("")
  const [message,setMessage] = useState("")
  const navigate = useNavigate();

    const handleSignIn = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
        const loginPayload = {
        email: globalEmail,
        password: globalPassword
        };

        const response = await axios.post('http://localhost:9090/stackoverflow/login', loginPayload);

        const { token, role, orgId, userId, name } = response.data;

        // Storing token role and orgName for proper redirection
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('orgId', orgId);
        localStorage.setItem('userId', userId);        
        localStorage.setItem('name', name);             

        setMessage('Login successful!');
        setTimeout(() => {
        if (role === 'ADMIN') navigate('/admin-home');
        else if (role === 'USER') {
            navigate(`/${orgId}`);
        } else {
            navigate('/');
        }
        }, 1200);
    } catch (error) {
        const errMsg = error.response?.data || 'Login failed.';
        setMessage(errMsg);
    }
    };

    const handleOrgSignIn = async (e) => {
  e.preventDefault();
  setMessage('');
  try {
    const loginPayload = {
      email: orgEmail,
      password: orgPassword,
    };

    const response = await axios.post('http://localhost:9090/stackoverflow/login', loginPayload);
    const { token, role, orgId, userId, name } = response.data;

    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('orgId', orgId);
    localStorage.setItem('userId', userId);
    localStorage.setItem('name', name);

    setMessage('Login successful!');
    setTimeout(() => {
      if (role === 'ADMIN') navigate('/admin-home');
      else if (role === 'USER') navigate(`/${orgId}`);
      else navigate('/100');
    }, 1200);

  } catch (error) {
    const errMsg = error.response?.data || 'Login failed.';
    setMessage(errMsg);
  }
};

  return (
    <div className="min-h-screen">
      <Header/>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center px-6 py-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Hello, User !</h1>
        <Card className="w-full max-w-4xl  border-2 bg-white p-12">
          <CardContent className="p-8 ">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-0">
              {/* Global User Section */}
              <div className="space-y-6 md:col-span-1">
                <h2 className="text-2xl font-bold text-global-4 text-center mb-8">Individual</h2>
                <div className="space-y-4">
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
                  <div className="pt-4 flex justify-center">
                    <Button
                        onClick={handleSignIn}
                        variant="primary"
                        size="large"
                        className="text-xs sm:text-sm "
                    >
                        Sign in
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
              <div className="space-y-6 md:col-span-1">
                <h2 className="text-2xl font-bold text-global-4 text-center mb-8">Organisation</h2>
                <div className="space-y-4">
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
                  <div>
                    <Input
                      type="text"
                      placeholder="Organisation ID"
                      value={orgId}
                      onChange={(e) => setOrgId(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div className="pt-4 flex justify-center">
                    <Button
                        onClick={handleOrgSignIn}
                        variant="primary"
                        size="large"
                        className="text-xs sm:text-sm "
                    >
                        Sign in
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Register Link */}
        <div className="mt-8 text-center">
          <span className="text-global-2">Do not have an account? </span>
          <Link to="/signup" className="text-global-4 hover:text-global-2 font-medium">
            Register Now
          </Link>
        </div>
      </main>
    </div>
  )
}
