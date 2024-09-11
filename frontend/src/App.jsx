import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PrivateRoute from "./route/PrivateRoute";
import Medicine from "./pages/Medicine";
import MedicineGroup from "./pages/MedicineGroup";
import MedicineBatch from "./pages/MedicineBatch";
import Layout from "./layout/Layout";
import Stats from "./pages/Stats";
import Expired from "./components/stats/Expired";
import Stock from "./components/stats/Stock";
import MedicineBatchDetails from "./components/medicineBatch/Details";
import ExpiredSoon1 from "./components/stats/ExpiredSoon1";
import ExpiredSoon3 from "./components/stats/ExpiredSoon3";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path=""
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="medicines"
            element={
              <PrivateRoute>
                <Medicine />
              </PrivateRoute>
            }
          />
          <Route
            path="medicine-groups"
            element={
              <PrivateRoute>
                <MedicineGroup />
              </PrivateRoute>
            }
          />
          <Route
            path="medicine-batches"
            element={
              <PrivateRoute>
                <MedicineBatch />
              </PrivateRoute>
            }
          />
          <Route
            path="medicine-batches/:batch_number"
            element={
              <PrivateRoute>
                <MedicineBatchDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="statistics"
            element={
              <PrivateRoute>
                <Stats />
              </PrivateRoute>
            }
          />
          <Route
            path="stock"
            element={
              <PrivateRoute>
                <Stock />
              </PrivateRoute>
            }
          />
          <Route
            path="expired"
            element={
              <PrivateRoute>
                <Expired />
              </PrivateRoute>
            }
          />

          <Route
            path="expire-soon/1"
            element={
              <PrivateRoute>
                <ExpiredSoon1 />
              </PrivateRoute>
            }
          />
          <Route
            path="expire-soon/3"
            element={
              <PrivateRoute>
                <ExpiredSoon3 />
              </PrivateRoute>
            }
          />

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
