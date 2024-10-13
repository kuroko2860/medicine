import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axios";
import { toast } from "react-toastify";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/register", {
        username,
        password,
        email,
      });
      navigate("/login");
      toast.success("Registered successfully");
    } catch (error) {
      console.error("Error registering:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="container mx-auto p-8 flex">
      <div className="max-w-md w-full mx-auto">
        <h1 className="text-4xl text-center mb-12 font-bold">Quản lý thuốc</h1>

        <div className="bg-white rounded-lg overflow-hidden shadow-2xl border border-gray-300">
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Đăng ký</h2>
            <form
              method="POST"
              className=""
              action="#"
              onSubmit={handleRegister}
            >
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-600">
                  Username
                </label>

                <input
                  type="text"
                  name="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                />
              </div>
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-600">
                  Email
                </label>

                <input
                  type="email"
                  name="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                />
              </div>

              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-600">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full p-3 mt-4 bg-indigo-600 text-white rounded shadow"
              >
                Đăng ký
              </button>
            </form>
          </div>

          <div className="flex justify-between p-8 text-sm border-t border-gray-300 bg-gray-100">
            <a href="/login" className="font-medium text-indigo-500">
              Đăng nhập
            </a>

            <a href="#" className="text-gray-600">
              Quên mật khẩu?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
