import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  useDeletePermissionSetMutation,
  useGetPermissionSetQuery,
} from "../../../apis/accountUser";
import React, { useState } from "react";
import ModalAdmin from "../Modal";
export const AdminPolicy = () => {
  const { data, refetch } = useGetPermissionSetQuery();
  const permissionSet = data?.data ?? [];

  const navigate = useNavigate();
  const [openActions, setOpenActions] = React.useState<string | null>(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState("");
  const [namePolicy, setName] = useState("");
  const handleClickOpenModal = (id: string, name: string) => {
    setDeleteId(id);
    setOpenModal(true);
    setName(name);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const [deletePermission] = useDeletePermissionSetMutation();

  const handleDelete = async () => {
    if (deleteId) {
      await deletePermission(deleteId);
      handleCloseModal();
      await refetch();
    }
  };

  return (
    <div className="h-screen">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold mb-10 mt-2">POLICY</h2>
        <button>
          <div className="flex gap-1 items-center bg-blue-700 px-4 py-3 rounded-md text-white">
            <div onClick={() => navigate("/admin/policy/create")}>
              CREATE NEW POLICY
            </div>
            <div>
              <AddIcon />
            </div>
          </div>
        </button>
      </div>
      <div className="flex justify-between mb-16 mt-5">
        <div>
          <h4 className="text-2xl mb-2">Overview</h4>
          <p className="h-10 w-96">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s
          </p>
        </div>
        <div className="flex gap-2 h-1/2">
          <input className="border-slate-700 border-solid border-2 px-2 w-80" />
          <button className="bg-blue-500 px-5 py-2 rounded text-white">
            <SearchIcon />
          </button>
        </div>
      </div>

      <p className="text-blue-500 text-2xl mb-5">
        {permissionSet.length} Policies
      </p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 h-96 ">
        {permissionSet.map((per) => {
          return (
            <div>
              <Card
                sx={{ maxWidth: 345 }}
                className="!bg-gray-200 !text-black relative"
              >
                <div>
                  <CardHeader
                    action={
                      <IconButton aria-label="settings">
                        <div onClick={() => setOpenActions(per.id)}>
                          <MoreVertIcon className="text-black" />
                        </div>
                      </IconButton>
                    }
                    title={per.name}
                  />

                  <div
                    className="line-clamp-2 px-5 h-12"
                    onClick={() => navigate(`view/${per.id}`)}
                  >
                    {per.description}
                  </div>

                  <CardContent>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className="flex gap-4 !text-white !text-m pt-8"
                    >
                      <div className="bg-blue-600 px-3 py-2 rounded-3xl">
                        Permissionset ({per.permissionIdList.length})
                      </div>
                    </Typography>
                  </CardContent>
                </div>

                <CardActions className="absolute top-12 right-5">
                  {openActions === per.id && (
                    <div className="bg-gray-400 px-5 py-3 rounded-sm cursor-pointer flex flex-col gap-3">
                      <div onClick={() => navigate(`edit/${per.id}`)}>Edit</div>
                      <div
                        onClick={() => handleClickOpenModal(per.id, per.name)}
                      >
                        Delete
                      </div>
                    </div>
                  )}
                </CardActions>
              </Card>
            </div>
          );
        })}
      </div>
      <ModalAdmin
        openModal={openModal}
        handleClickOpenModal={handleClickOpenModal}
        handleCloseModal={handleCloseModal}
        deleteId={deleteId}
        handleDelete={handleDelete}
        title={`Do you really want to delete policy ${namePolicy}? This process cannot be undone.`}
      />
    </div>
  );
};
