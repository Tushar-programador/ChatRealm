import { useState } from "react";
import { toast } from "sonner";
import { apiClient } from "../../lib/api-client";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { forgetpasswordsRoute } from "../../utils/constant";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    try {
      console.log(email);
      console.log(forgetpasswordsRoute);

      const response = await apiClient.post(forgetpasswordsRoute, {
        email,
      });
      if (response.status === 200) {
        toast.success("Password reset link sent to your email.");
        navigate("/auth");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="bg-white shadow-xl w-full max-w-md rounded-3xl p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 rounded-full p-4"
        />
        <Button
          onClick={handleForgotPassword}
          className="w-full p-4 rounded-full bg-purple-500 text-white font-semibold"
        >
          Send Reset Link
        </Button>
      </div>
    </div>
  );
}

export default ForgotPassword;
