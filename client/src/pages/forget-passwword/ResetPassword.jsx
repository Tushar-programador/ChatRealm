import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { apiClient } from "../../lib/api-client";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
function ResetPassword() {
  const { resetToken } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await apiClient.put(`/reset-password/${resetToken}`, {
        password,
      });

      if (response.status === 200) {
        toast.success("Password reset successful");
        navigate("/auth");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Error resetting password. Please try again.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="bg-white shadow-xl w-full max-w-md rounded-3xl p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
        <Input
          placeholder="New Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 rounded-full p-4"
        />
        <Input
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mb-4 rounded-full p-4"
        />
        <Button
          onClick={handleResetPassword}
          className="w-full p-4 rounded-full bg-purple-500 text-white font-semibold"
        >
          Reset Password
        </Button>
      </div>
    </div>
  );
}

export default ResetPassword;
