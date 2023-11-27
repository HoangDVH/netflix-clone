import { useNavigate, useParams } from "react-router-dom";
import {
  useDeletePermissionSetMutation,
  useDeleteRoleMutation,
  useGetPermissionQuery,
  useGetPermissionSetByIdQuery,
  useGetPermissionSetQuery,
} from "../../../apis/accountUser";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Table } from "@mui/material";
import ModalAdmin from "../Modal";
import { useEffect } from "react";
import React from "react";
import { toast } from "react-toastify";

export const AdminPolicyView = () => {
  const navigate = useNavigate();
  const { idPermission } = useParams();
  const { data: dataGetPerById } = useGetPermissionSetByIdQuery(idPermission);

  //Get Name of Pẻmission By ID
  const { data: dataGetPermision } = useGetPermissionQuery();

  const renderRoles = () => {
    if (dataGetPerById && dataGetPermision) {
      const matchingRoles = dataGetPerById.permissionIdList.map((perId) => {
        return dataGetPermision.data.find((role) => role.id === perId) || null;
      });

      return matchingRoles.filter((role) => role !== null);
    }
    return [];
  };

  //End

  const { refetch: refetchPermissionSet } = useGetPermissionSetQuery();
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

  const [deleteRole, { isSuccess }] = useDeletePermissionSetMutation();

  const handleDelete = async () => {
    if (deleteId) {
      await deleteRole(deleteId);
      handleCloseModal();
      await refetchPermissionSet();
    }
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Delete successfully");
      refetchPermissionSet();
      navigate("/admin/policy");
    }
  }, [isSuccess, navigate, refetchPermissionSet]);
  ///

  return (
    <div className="h-full">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl">{dataGetPerById?.name}</h1>
        <div className="flex items-center gap-2">
          <button
            className="bg-blue-500 text-white px-4 py-3 flex items-center gap-2 rounded"
            onClick={() => navigate(`/admin/policy/edit/${dataGetPerById?.id}`)}
          >
            <EditIcon />
            EDIT
          </button>
          <button
            className="bg-red-500 text-white px-4 py-3 flex items-center gap-2 rounded"
            onClick={() => handleClickOpenModal(dataGetPerById?.id)}
          >
            <DeleteIcon />
            DELETE
          </button>
        </div>
      </div>
      <div className="text-blue-600 text-2xl mt-2">Overview</div>
      <div className="w-1/2 mt-2">{dataGetPerById?.description}</div>
      <div className="text-2xl text-blue-600 mt-8">List of permissions:</div>
      <div className="w-1/2 text-left border-2 mt-5">
        <Table>
          <thead className="bg-gray-200 border-y-2">
            <tr className="">
              <th className="border-b-2 border-slate-400 pl-24 py-2">Name</th>
              <th className="border-b-2 border-slate-400 px-2 py-2">Sort</th>
            </tr>
          </thead>
          <tbody className="">
            {renderRoles().map((foundRole, index) => (
              <tr key={index}>
                <td className="pl-24 py-4">{foundRole?.name}</td>
                <td className="px-2 py-4">{foundRole?.sort}</td>
                {/* Add more cells for other properties if needed */}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <ModalAdmin
        openModal={openModal}
        handleClickOpenModal={handleClickOpenModal}
        handleCloseModal={handleCloseModal}
        deleteId={deleteId}
        handleDelete={handleDelete}
        title="Do you really want to delete these records? This process cannot be undone."
      />
    </div>
  );
};
