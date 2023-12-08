import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import CardContent from "@mui/material/CardContent";

import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { useEffect, useState } from "react";
import {
  useDeleteRoleMutation,
  useGetRoleQuery,
  useSearchRoleByNameQuery,
} from "../../../apis/accountUser";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import ModalAdmin from "../Modal";
import { CardActions } from "@mui/material";
export const AdminRole = () => {
  const navigate = useNavigate();
  const [openActions, setOpenActions] = React.useState<string | null>(null);

  const { data, refetch } = useGetRoleQuery();
  const roles = data?.data ?? [];

  const [openModal, setOpenModal] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState("");
  const handleClickOpenModal = (id: string) => {
    setDeleteId(id);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const [deleteRole] = useDeleteRoleMutation();

  const handleDelete = async () => {
    if (deleteId) {
      await deleteRole(deleteId);
      handleCloseModal();
      await refetch();
    }
  };

  //Search
  const [searchTerm, setSearchTerm] = useState("");
  const [searchClicked, setSearchClicked] = useState(false); // New state variable

  const { data: dataSearchResults, refetch: refetchSearch } =
    useSearchRoleByNameQuery(searchTerm);

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
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold mb-10 mt-2">Roles</h2>
        <button>
          <div className="flex gap-1 items-center bg-blue-700 px-4 py-3 rounded-md text-white">
            <div onClick={() => navigate("/admin/role/create")}>
              CREATE NEW ROLE
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
      </div>
      <p className="text-blue-500 text-2xl mb-5">{roles.length} Roles</p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 h-96 ">
        {searchClicked && searchTerm.trim() !== ""
          ? dataSearchResults?.data.map((role) => {
              return (
                <div key={role.id}>
                  <Card
                    sx={{ maxWidth: 345 }}
                    className="!bg-gray-200 !text-black relative"
                  >
                    <div onClick={() => navigate(`view/${role.id}`)}>
                      <CardHeader
                        action={
                          <IconButton aria-label="settings">
                            <div onClick={() => setOpenActions(role.id)}>
                              <MoreVertIcon className="text-black" />
                            </div>
                          </IconButton>
                        }
                        title={role.name}
                      />

                      <CardContent>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          className="flex gap-4 !text-white !text-m pt-8"
                        >
                          <div className="bg-blue-600 px-3 py-2 rounded-3xl">
                            Permissionset ({role.permissionSets?.length || 0})
                          </div>
                          <div className="bg-blue-600 px-4 py-2 rounded-3xl">
                            User ({role.userIds?.length})
                          </div>
                        </Typography>
                      </CardContent>
                    </div>

                    <CardActions className="absolute top-12 right-5">
                      {openActions === role.id && (
                        <div className="bg-gray-400 px-5 py-3 rounded-sm cursor-pointer flex flex-col gap-3">
                          <div>Edit</div>
                          <div onClick={() => handleClickOpenModal(role.id)}>
                            Delete
                          </div>
                        </div>
                      )}
                    </CardActions>
                  </Card>
                </div>
              );
            })
          : roles.map((role) => {
              return (
                <div key={role.id}>
                  <Card
                    sx={{ maxWidth: 345 }}
                    className="!bg-gray-200 !text-black relative"
                  >
                    <div onClick={() => navigate(`view/${role.id}`)}>
                      <CardHeader
                        action={
                          <IconButton aria-label="settings">
                            <div onClick={() => setOpenActions(role.id)}>
                              <MoreVertIcon className="text-black" />
                            </div>
                          </IconButton>
                        }
                        title={role.name}
                      />

                      <CardContent>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          className="flex gap-4 !text-white !text-m pt-8"
                        >
                          <div className="bg-blue-600 px-3 py-2 rounded-3xl">
                            Permissionset ({role.permissionSets?.length || 0})
                          </div>
                          <div className="bg-blue-600 px-4 py-2 rounded-3xl">
                            User ({role.userIds?.length || 0})
                          </div>
                        </Typography>
                      </CardContent>
                    </div>

                    <CardActions className="absolute top-12 right-5">
                      {openActions === role.id && (
                        <div className="bg-gray-400 px-5 py-3 rounded-sm cursor-pointer flex flex-col gap-3">
                          <div>Edit</div>
                          <div onClick={() => handleClickOpenModal(role.id)}>
                            Delete
                          </div>
                        </div>
                      )}
                    </CardActions>
                  </Card>
                </div>
              );
            })}

        <ModalAdmin
          openModal={openModal}
          handleClickOpenModal={handleClickOpenModal}
          handleCloseModal={handleCloseModal}
          deleteId={deleteId}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};
