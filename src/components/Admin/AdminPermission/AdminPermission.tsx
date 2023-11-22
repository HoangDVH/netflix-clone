import AddIcon from "@mui/icons-material/Add";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  useDeletePermissionMutation,
  useGetPermissionQuery,
  useSearchPermissionByNameQuery,
} from "../../../apis/accountUser";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import ModalAdmin from "../Modal";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", width: 800, maxWidth: 500 },
  { field: "sort", headerName: "Sort", width: 300 },
];
export const AdminPermission = () => {
  const navigate = useNavigate();
  const { data, refetch } = useGetPermissionQuery();
  const permission = data?.data || [];
  const permissionList = permission.map((per) => ({
    id: per.id,
    name: per.name,
    sort: per.sort,
  }));

  //Number of checkboxes selected
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const handleSelectionModelChange = (selectionModel: string[]) => {
    setSelectedRows(selectionModel);
  };
  const getSelectedRoleNames = () => {
    return selectedRows.map(
      (rowId) => permissionList[parseInt(rowId, 10) - 1]?.name || ""
    );
  };
  //End

  const [openModal, setOpenModal] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState("");
  const handleClickOpenModal = () => {
    setOpenModal(!openModal);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const [deletePermission] = useDeletePermissionMutation();

  const handleDelete = async () => {
    if (deleteId) {
      await deletePermission(deleteId);
      handleCloseModal();
      await refetch();
    }
  };

  const handleDeleteIconClick = (id: React.SetStateAction<string>) => {
    handleClickOpenModal();
    setDeleteId(id);
  };

  //Search
  const [searchTerm, setSearchTerm] = useState("");
  const [searchClicked, setSearchClicked] = useState(false); // New state variable

  const { data: dataSearchResults, refetch: refetchSearch } =
    useSearchPermissionByNameQuery(searchTerm);

  const permissionListByName = dataSearchResults?.data.map((per) => ({
    id: per.id,
    name: per.name,
    sort: per.sort,
  }));
  useEffect(() => {
    setSearchClicked(false);
  }, [searchTerm]);

  const handleSearch = async () => {
    if (searchTerm.trim() !== "") {
      await refetchSearch();
      setSearchClicked(true);
    } else {
      setSearchClicked(false); // Set to false if the search term is empty
    }
  };

  //*****//

  return (
    <div className="h-full">
      <div className="flex items-center justify-between ">
        <h1 className="text-4xl mt-10 mb-10 font-medium">Permissions</h1>
        <button
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-3 rounded"
          onClick={() => navigate("create")}
        >
          <AddIcon />
          CREATE NEW PERMISSION
        </button>
      </div>
      <div className="flex gap-2 h-1/2 mb-5">
        <input
          className="border-solid border-2 px-2 w-80"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-blue-500 px-5 py-2 rounded text-white"
          onClick={handleSearch}
        >
          <SearchIcon />
        </button>
      </div>
      <DataGrid
        rows={searchClicked ? permissionListByName : permissionList}
        columns={[
          ...columns,
          {
            field: "edit",
            headerName: "",
            width: 100,
            renderCell: (params) => (
              <div onClick={() => navigate(`edit/${params.row.id}`)}>
                <EditIcon />
              </div>
            ),
          },
          {
            field: "delete",
            headerName: "",
            width: 100,
            renderCell: (params) => (
              <div
                className="text-red-500"
                onClick={() => handleDeleteIconClick(params.row.id)}
              >
                <DeleteIcon />
              </div>
            ),
          },
        ]}
        checkboxSelection
        onRowSelectionModelChange={handleSelectionModelChange}
        className="!text-black group/item !border-slate-400"
        onCellClick={(params) => {
          if (params.field === "name") {
            navigate(`view/${params.id}`);
          }
        }}
      />
      <ModalAdmin
        openModal={openModal}
        handleClickOpenModal={handleClickOpenModal}
        handleCloseModal={handleCloseModal}
        deleteId={deleteId}
        handleDelete={handleDelete}
        title="Do you really want to delete this permission? This process cannot be undone.

        "
      />
    </div>
  );
};
