import { useNavigate, useParams } from "react-router-dom";
import { useDeleteAccountMutation, useGetAccountListQuery, useGetUserByIdQuery } from "../../../apis/accountUser";
import EditIcon from "@mui/icons-material/Edit";

import DeleteIcon from "@mui/icons-material/Delete";
import { Table, TextField } from "@mui/material";
import ModalAdmin from "../Modal";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
const AdminUserView = () => {
  const { idView } = useParams();
  const { data } = useGetUserByIdQuery(idView);
  const navigate = useNavigate();
  const {refetch} = useGetAccountListQuery()

  //Open Modal and Delete
  const [openModal, setOpenModal] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState("");
  const handleClickOpenModal = (id: string) => {
    setDeleteId(id);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const [deleteUser, { isSuccess }] = useDeleteAccountMutation();

  const handleDelete = async () => {
    if (deleteId) {
      await deleteUser(deleteId);
      handleCloseModal();
      await refetch();
    }
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Delete successfully");
      refetch();
      navigate("/admin/user");
    }
  }, [isSuccess, navigate, refetch]);
  ///

  return (
    <div className="h-screen">
      <div className="flex items-center justify-between mb-10">
        <p className="text-3xl">{data?.userName}</p>
        <div className="flex items-center gap-2">
          <button
            className="bg-blue-600 px-3 py-3 flex items-center gap-2 text-white rounded"
            onClick={() => navigate(`/admin/user/edit/${data?.id}`)}
          >
            <EditIcon />
            EDIT
          </button>
          <button className="bg-red-600 px-3 py-3 flex items-center gap-2 text-white rounded" onClick={() => handleClickOpenModal(data?.id)}>
            <DeleteIcon />
            DELETE
          </button>
        </div>
      </div>
      <div>
        <p className="text-xl mb-5">User Profile:</p>
        <p className="">Email: </p>
        <div className="border-2 mb-5">
          <TextField
            disabled
            id="outlined-disabled"
            value={data?.email}
            className="w-full"
            sx={{ input: { color: "black" } }}
          />
        </div>
        <p className="">UserName: </p>
        <div className="border-2 mb-5">
          <TextField
            disabled
            id="outlined-disabled"
            value={data?.userName}
            className="w-full"
            sx={{ input: { color: "black" } }}
          />
        </div>
        <p className="">PhoneNumber: </p>
        <div className="border-2 mb-8">
          <TextField
            disabled
            id="outlined-disabled"
            value={data?.phoneNumber}
            className="w-full"
            sx={{ input: { color: "black" } }}
          />
        </div>
      </div>
      <div className="text-xl">List of Role:</div>

      {data?.roles.length !== 0 ? (
        <div className="w-1/3 text-left border-2 mt-5">
          <Table>
            <thead className="bg-gray-200 border-y-2">
              <tr className="">
                <th className="border-b-2 border-slate-400 pl-8 py-2">Name</th>
              </tr>
            </thead>
            <tbody className="">
              {data?.roles.map((role, index) => (
                <tr key={index}>
                  <td className="pl-8 py-4">{role?.name}</td>
                  {/* Add more cells for other properties if needed */}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <div className="text-base mt-3">This user has no roles</div>
      )}

      <ModalAdmin
        openModal={openModal}
        handleClickOpenModal={handleClickOpenModal}
        handleCloseModal={handleCloseModal}
        deleteId={deleteId}
        handleDelete={handleDelete}
        title="Are you sure you wish to delete this user?"
      />
    </div>
  );
};

export default AdminUserView;
