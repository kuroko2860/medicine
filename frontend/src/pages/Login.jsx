import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../config/axios";
import { toast } from "react-toastify";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/login", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/");
      toast.success("Login successful");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container mx-auto p-8 flex">
      <div className="w-full mx-auto">
        <div className="flex items-center justify-between w-full bg-blue-800 text-white py-4 px-8 h-16 text-xl mb-10">
          <h1 className="text-4xl text-center font-bold">Quản lý thuốc</h1>
          <div className="flex gap-6">
            <a href="/login" className="hover:text-gray-300 duration-300">
              Đăng nhập
            </a>
            <a href="/register" className="hover:text-gray-300 duration-300">
              Đăng ký
            </a>
          </div>
        </div>

        <div className="max-w-md w-full mx-auto bg-white rounded-lg overflow-hidden shadow-2xl border border-gray-300">
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Đăng nhập</h2>
            <form method="POST" className="" action="#" onSubmit={handleLogin}>
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
                Đăng nhập
              </button>
            </form>
          </div>

          <div className="flex justify-between p-8 text-sm border-t border-gray-300 bg-gray-100">
            <a href="/register" className="font-medium text-indigo-500">
              Tạo tài khoản mới
            </a>

            <a href="#" className="text-gray-600">
              Quên mật khẩu?
            </a>
          </div>
        </div>
      </div>
    </div>
    // <form
    //   onSubmit={handleLogin}
    //   classNameName="max-w-sm mx-auto mt-10 p-6 bg-white rounded-lg shadow-md"
    // >
    //   <h2 classNameName="text-2xl font-bold mb-6 text-center">Đăng nhập</h2>
    //   <input
    //     type="text"
    //     placeholder="Username"
    //     value={username}
    //     onChange={(e) => setUsername(e.target.value)}
    //     required
    //     classNameName="w-full px-3 py-2 mb-4 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
    //   />
    //   <input
    //     type="password"
    //     placeholder="Password"
    //     value={password}
    //     onChange={(e) => setPassword(e.target.value)}
    //     required
    //     classNameName="w-full px-3 py-2 mb-6 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
    //   />
    //   <button
    //     type="submit"
    //     classNameName="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
    //   >
    //     Đăng nhập
    //   </button>
    //   <p classNameName="text-center mt-4">
    //     Chưa có tài khoản?{" "}
    //     <a href="/register" classNameName="text-blue-500 hover:underline">
    //       Đăng ký
    //     </a>
    //   </p>
    // </form>
  );
}

export default Login;
