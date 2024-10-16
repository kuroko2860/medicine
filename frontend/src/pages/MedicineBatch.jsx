import { useState, useEffect } from "react";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";
import { Popup } from "reactjs-popup";
import AddMedicineBatchForm from "../components/medicineBatch/AddMedicineBatchForm";
import EditMedicineBatchForm from "../components/medicineBatch/EditMedicineBatchForm";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";

const MedicineBatchList = ({
  medicine_batches,
  onViewDetails,
  fetchMedicineBatches,
  medicineGroups,
}) => {
  const [pg, setpg] = useState(0);
  const [rpg, setrpg] = useState(5);

  function handleChangePage(event, newpage) {
    setpg(newpage);
  }

  function handleChangeRowsPerPage(event) {
    setrpg(parseInt(event.target.value, 10));
    setpg(0);
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table className="min-w-full">
          <TableHead>
            <TableRow>
              <TableCell className="bg-gray-200 p-2 text-center">ID</TableCell>
              <TableCell className="bg-gray-200 p-2 text-center">
                Tên thuốc
              </TableCell>
              <TableCell className="bg-gray-200 p-2 text-center">
                Số lượng
              </TableCell>
              {/* <TableCell className="bg-gray-200 p-2 text-center">
                Đơn vị
              </TableCell> */}
              <TableCell className="bg-gray-200 p-2 text-center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {medicine_batches.slice(pg * rpg, pg * rpg + rpg).map((batch) => (
              <TableRow key={batch.id} className="bg-white shadow rounded p-4">
                <TableCell className="p-2 text-center">
                  {batch.batch_number}
                </TableCell>
                <TableCell className="p-2 text-center">
                  {batch.medicine_name}
                </TableCell>
                <TableCell className="p-2 text-center">
                  {batch.quantity}
                </TableCell>
                {/* <TableCell className="p-2 text-center">{batch.unit}</TableCell> */}
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
                      <EditMedicineBatchForm
                        onClose={close}
                        batch={batch}
                        medicineGroups={medicineGroups}
                        fetchMedicineBatches={fetchMedicineBatches}
                      />
                    )}
                  </Popup>

                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded m-2"
                    onClick={() => onViewDetails(batch.batch_number)}
                  >
                    Chi tiết
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
        count={medicine_batches.length}
        rowsPerPage={rpg}
        page={pg}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

const MedicineBatch = () => {
  const [medicine_batches, setMedicineBatches] = useState([]);
  const [medicineGroups, setMedicineGroups] = useState({});
  const [selectedBatch, setSelectedBatch] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMedicineBatches();
    fetchMedicineGroups();
  }, []);

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

  const fetchMedicineBatches = () => {
    axios
      .get("/medicine-batches")
      .then((response) => setMedicineBatches(response.data))
      .catch((error) =>
        console.error("Error fetching medicine batches:", error)
      );
  };

  const handleViewDetails = (batchId) => {
    navigate(`${batchId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lô thuốc</h1>
      <Popup
        trigger={
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Thêm lô thuốc
          </button>
        }
        modal
      >
        {(close) => (
          <AddMedicineBatchForm
            onClose={close}
            medicineGroups={medicineGroups}
            fetchMedicineBatches={fetchMedicineBatches}
          />
        )}
      </Popup>
      <div className="my-4 bg-white shadow-md rounded px-8 pt-6 pb-8">
        <p className="font-bold mb-2 text-lg">Tìm kiếm lô thuốc</p>
        <label className="block">
          ID
          <input
            type="text"
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>
      </div>
      <MedicineBatchList
        medicine_batches={medicine_batches.filter((batch) =>
          batch.batch_number.includes(selectedBatch || "")
        )}
        medicineGroups={medicineGroups}
        fetchMedicineBatches={fetchMedicineBatches}
        onViewDetails={handleViewDetails}
      />
    </div>
  );
};

export default MedicineBatch;
