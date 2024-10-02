import { useState, useEffect } from "react";
import axios from "../config/axios";
import Popup from "reactjs-popup";
import AddMedicineForm from "../components/medicine/AddMedicineForm";
import EditMedicineForm from "../components/medicine/EditMedicineForm";
import { toast } from "react-toastify";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";

function Medicine() {
  const [medicines, setMedicines] = useState([]);
  const [medicine_groups, setMedicineGroups] = useState({});
  const [selected_group, setSelectedGroup] = useState(null);
  const [selected_medicine, setSelectedMedicine] = useState(null);

  const [pg, setpg] = useState(0);
  const [rpg, setrpg] = useState(5);

  function handleChangePage(event, newpage) {
    setpg(newpage);
  }

  function handleChangeRowsPerPage(event) {
    setrpg(parseInt(event.target.value, 10));
    setpg(0);
  }

  useEffect(() => {
    fetchMedicines();
    fetchMedicineGroups();
  }, []);

  const fetchMedicines = () => {
    axios
      .get("/medicines")
      .then((response) => setMedicines(response.data))
      .catch((error) => console.error("Error fetching medicines:", error));
  };

  const fetchMedicineGroups = () => {
    axios
      .get("/medicine-groups")
      .then((response) => {
        const groupsMap = response.data.reduce((map, group) => {
          map[group.id] = group.name;
          return map;
        }, {});
        setMedicineGroups(groupsMap);
      })
      .catch((error) =>
        console.error("Error fetching medicine groups:", error)
      );
  };

  const handleDelete = (medicine_id) => {
    axios
      .delete(`/medicines/${medicine_id}`)
      .then(() => {
        fetchMedicines();
        toast.success("Medicine deleted successfully");
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Thuốc</h1>

      <Popup
        trigger={
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4">
            Thêm thuốc mới
          </button>
        }
        modal
      >
        {(close) => (
          <AddMedicineForm
            onClose={close}
            medicine_groups={medicine_groups}
            fetchMedicines={fetchMedicines}
          />
        )}
      </Popup>
      <div className="mb-4 bg-white shadow-md rounded px-8 pt-6 pb-8">
        <p className="font-bold mb-2 text-lg">Tìm kiếm thuốc</p>
        <select
          value={selected_group}
          onChange={(e) => setSelectedGroup(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option value="">Chọn nhóm thuốc</option>
          {Object.entries(medicine_groups).map(([id, name]) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
        <br />
        <label className="block">
          Tên thuốc
          <input
            type="text"
            value={selected_medicine}
            onChange={(e) => setSelectedMedicine(e.target.value)}
            className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>
      </div>
      <TableContainer component={Paper}>
        <Table className="min-w-full">
          <TableHead>
            <TableRow>
              <TableCell className="bg-gray-200 p-2 text-center font-bold">
                Tên thuốc
              </TableCell>
              <TableCell className="bg-gray-200 p-2 text-center font-bold">
                Nhóm thuốc
              </TableCell>
              <TableCell className="bg-gray-200 p-2 text-center font-bold"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {medicines
              .filter((medicine) =>
                selected_group ? medicine.group_id == selected_group : true
              )
              .filter((medicine) =>
                selected_medicine
                  ? medicine.name
                      .toLowerCase()
                      .includes(selected_medicine.toLowerCase())
                  : true
              )
              .slice(pg * rpg, pg * rpg + rpg)
              .map((medicine) => (
                <TableRow key={medicine.id} className="bg-gray-100">
                  <TableCell className="p-2 text-center">
                    {medicine.name}
                  </TableCell>
                  <TableCell className="p-2 text-center">
                    {medicine_groups[medicine.group_id]}
                  </TableCell>
                  <TableCell className="p-2 text-center">
                    <Popup
                      trigger={
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
                          Sửa
                        </button>
                      }
                      modal
                    >
                      {(close) => (
                        <EditMedicineForm
                          onClose={close}
                          medicine={medicine}
                          medicine_groups={medicine_groups}
                          fetchMedicines={fetchMedicines}
                        />
                      )}
                    </Popup>
                    <button
                      onClick={() => handleDelete(medicine.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded m-2"
                    >
                      Xóa
                    </button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={
          medicines
            .filter((medicine) =>
              selected_group ? medicine.group_id == selected_group : true
            )
            .filter((medicine) =>
              selected_medicine
                ? medicine.name
                    .toLowerCase()
                    .includes(selected_medicine.toLowerCase())
                : true
            ).length
        }
        rowsPerPage={rpg}
        page={pg}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default Medicine;
