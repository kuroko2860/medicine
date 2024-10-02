import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex">
      <div className="w-1/6 bg-gray-800 h-screen fixed">
        <div className="flex items-center justify-center h-16 text-white text-xl font-bold">
          Quản lý thuốc
        </div>
        <ul className="mt-4">
          <li>
            <a
              href="/"
              className="text-white hover:text-gray-300 block py-2 px-4"
            >
              Trang chủ
            </a>
          </li>
          <li>
            <a
              href="/medicines"
              className="text-white hover:text-gray-300 block py-2 px-4"
            >
              Thuốc
            </a>
          </li>
          <li>
            <a
              href="/medicine-groups"
              className="text-white hover:text-gray-300 block py-2 px-4"
            >
              Nhóm thuốc
            </a>
          </li>
          <li>
            <a
              href="/medicine-batches"
              className="text-white hover:text-gray-300 block py-2 px-4"
            >
              Lô thuốc
            </a>
          </li>
          <li>
            <a
              href="/statistics"
              className="text-white hover:text-gray-300 block py-2 px-4"
            >
              Thống kê
            </a>
          </li>
        </ul>
      </div>
      <div className=" ml-auto w-5/6 bg-gray-200 h-full min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
