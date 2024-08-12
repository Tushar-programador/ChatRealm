import { useState } from "react";
import Background from "../../assets/login2.png";
import victory from "../../assets/victory.svg";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSignup = async () => {};
  const handleLogin = async () => {};

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4">
      <div className="bg-white shadow-xl w-full max-w-4xl rounded-3xl overflow-hidden grid md:grid-cols-2">
        <div className="flex flex-col items-center justify-center p-6 md:p-10 gap-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-purple-900">
              Chat Realm
            </h1>
            <div className="flex items-center justify-center mt-4">
              <h2 className="text-2xl md:text-3xl font-semibold">Welcome</h2>
              <img src={victory} alt="victory" className="h-16 ml-3" />
            </div>
            <p className="mt-2 text-gray-600">
              Fill in the details to get started with the best chat app!
            </p>
          </div>
          <Tabs className="w-full max-w-sm">
            <TabsList className="bg-gray-100 rounded-full p-1 flex space-x-2">
              <TabsTrigger
                className="w-1/2 p-2 rounded-full transition-colors duration-300 text-center text-lg font-medium text-gray-700 data-[state=active]:bg-purple-500 data-[state=active]:text-white"
                value="login"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="w-1/2 p-2 rounded-full transition-colors duration-300 text-center text-lg font-medium text-gray-700 data-[state=active]:bg-purple-500 data-[state=active]:text-white"
              >
                SignUp
              </TabsTrigger>
            </TabsList>
            <TabsContent className="flex flex-col gap-4 mt-6" value="login">
              <Input
                placeholder="Email"
                type="email"
                className="rounded-full p-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="Password"
                type="password"
                className="rounded-full p-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                onClick={handleLogin}
                className="rounded-full p-4 bg-purple-500 text-white font-semibold"
              >
                Login
              </Button>
            </TabsContent>
            <TabsContent className="flex flex-col gap-4 mt-6" value="signup">
              <Input
                placeholder="Email"
                type="email"
                className="rounded-full p-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="Password"
                type="password"
                className="rounded-full p-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                placeholder="Confirm Password"
                type="password"
                className="rounded-full p-4"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button
                onClick={handleSignup}
                className="rounded-full p-4 bg-purple-500 text-white font-semibold"
              >
                Sign Up
              </Button>
            </TabsContent>
          </Tabs>
        </div>
        <div className="hidden md:flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
          <img
            src={Background}
            alt="background"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Auth;
