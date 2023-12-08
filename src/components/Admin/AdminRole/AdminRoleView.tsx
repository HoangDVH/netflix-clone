import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteRoleMutation,
  useEditRoleMutation,
  useGetPermissionSetQuery,
  useGetRoleByIdQuery,
  useGetRoleQuery,
} from "../../../apis/accountUser";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Table } from "@mui/material";
import { useEffect } from "react";
import ModalAdmin from "../Modal";
import { toast } from "react-toastify";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export const AdminRoleView = () => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const { refetch: refetchRole } = useGetRoleQuery();

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

  const [deleteRole, { isSuccess }] = useDeleteRoleMutation();

  const handleDelete = async () => {
    if (deleteId) {
      await deleteRole(deleteId);
      handleCloseModal();
      await refetch();
    }
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Delete successfully");
      refetchRole();
      navigate('/admin/role')
    }
  },[isSuccess, navigate, refetchRole]);
  ///

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { idRole } = useParams();

  //Get Name of Pẻmission By ID
  const { data: dataGetIdRole } = useGetRoleByIdQuery(idRole);
  const { data: dataGetPer, refetch } = useGetPermissionSetQuery();

  const renderRoles = () => {
    if (dataGetIdRole && dataGetPer) {
      const matchingRoles = dataGetIdRole.permissionSets.map((perId) => {
        return dataGetPer.data.find((role) => role.id === perId) || null;
      });

      return matchingRoles.filter((role) => role !== null);
    }
    return [];
  };

  //End
  return (
    <div className="h-screen">
      <div className="flex items-center justify-between mt-8">
        <h2 className="text-4xl">Admin</h2>
        <div className="flex gap-2">
          <button
            className="bg-blue-500 text-white px-5 py-3 rounded flex gap-2"
            onClick={() => navigate(`/admin/role/edit/${idRole}`)}
          >
            <EditIcon />
            <p>EDIT</p>
          </button>
          <button
            className="bg-red-500 text-white px-5 py-3 rounded flex gap-2"
            onClick={() => handleClickOpenModal(idRole)}
          >
            <DeleteIcon />
            DELETE
          </button>
        </div>
      </div>
      <div className="mt-8">
        <p className="text-2xl text-blue-500 font-semibold">Overview</p>
        <p className="mt-4">Name: {dataGetIdRole?.name}</p>
      </div>
      <div className="mt-8">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="PERMISSIONSETS" {...a11yProps(0)} />
            <Tab label="USERS" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div className="w-1/2 text-left border-2">
            <Table>
              <thead className="bg-gray-200 border-y-2">
                <tr className="">
                  <th className="border-b-2 border-slate-400 pl-24 py-2">
                    Name
                  </th>
                  <th className="border-b-2 border-slate-400 px-2 py-2">
                    Sort
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {dataGetIdRole?.permissionSets.map((foundRole, index) => (
                  <tr key={index}>
                    <td className="pl-24 py-4">{foundRole.name}</td>
                    <td className="px-2 py-4">{foundRole.sort}</td>
                    {/* Add more cells for other properties if needed */}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Item Two
        </CustomTabPanel>
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
