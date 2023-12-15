import CheckIcon from "@mui/icons-material/Check";
import { TextField } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  useEditRoleMutation,
  useGetPermissionSetQuery,
  useGetRoleByIdQuery,
  useGetRoleQuery,
} from "../../../apis/accountUser";
import { useEffect, useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", width: 130 },
  { field: "sort", headerName: "Sort", width: 130 },
];

type FormValues = {
  name: string;
  permissionSetIds: string[];
  userIds: string[];
  id: string;
};
const CreateRoleSchema = Yup.object().shape({
  name: Yup.string().required("Field Name is required"),
});

export const AdminRoleEdit = () => {
  const { idRole } = useParams();
  const { data: dataGetRole, refetch: refetchGetid } =
    useGetRoleByIdQuery(idRole);

  const navigate = useNavigate();
  const { data, refetch: refetchPermission } = useGetPermissionSetQuery();
  const permission = data?.data || [];
  const permissionSetList = permission.map((per) => ({
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
    const selectedNames = permissionSetList
      .filter((permissionSet) => selectedRows.includes(permissionSet.id))
      .map((permissionSet) => permissionSet.name);

    return selectedNames;
  };

  useEffect(() => {
    setSelectedRows(
      dataGetRole?.permissionSets.map((permissionSet) => permissionSet.id) ||
        []
    );
  }, [dataGetRole]);

  const handleRemoveSelectedItem = (index: number) => {
    const updatedSelectedRows = [...selectedRows];
    updatedSelectedRows.splice(index, 1);
    setSelectedRows(updatedSelectedRows);
  };
  //End

  //edit name role
  const [editedName, setEditedName] = useState(dataGetRole?.name || "");
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(event.target.value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(CreateRoleSchema),
    defaultValues: {
      userIds: ["defaultStringValue"],
      id: "string",
    },
  });

  const [editRole, { isSuccess }] = useEditRoleMutation();

  const { refetch } = useGetRoleQuery();

  const onSubmit = handleSubmit(async (data) => {
    data.permissionSetIds = selectedRows;
    await editRole({
      idRole: idRole || "",
      body: data,
    });
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Edit role successfully");
      refetch();
      refetchGetid();
      refetchPermission();
      navigate(`/admin/role/view/${idRole}`);
    }
  }, [idRole, isSuccess, navigate, refetch, refetchGetid, refetchPermission]);

  

  return (
    <form>
      <div className="h-screen">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="border-b-2 border-gray-300 w-56 !text-black">
              <TextField
                id="standard-basic"
                label="Role Name"
                variant="standard"
                fullWidth
                sx={{ input: { color: "black" } }}
                value={editedName}
                {...register("name")}
                onChange={handleNameChange}
              />
            </div>
            <p className="text-red-500 text-sm mt-2">
              {errors?.name && errors.name.message}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              className="bg-blue-500 text-white px-4 py-3 rounded font-semibold"
              onClick={onSubmit}
            >
              <CheckIcon /> SAVE
            </button>
            <button className="bg-gray-400 text-white px-4 py-2 rounded font-semibold">
              CANCEL
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-10">
          <div
            style={{ height: 400, width: "100%" }}
            className="mt-5 col-span-2"
          >
            <h2 className="mt-8 text-2xl mb-10">All PermissionSets</h2>
            <DataGrid
              rows={permissionSetList}
              columns={columns}
              checkboxSelection
              rowSelectionModel={selectedRows}
              onRowSelectionModelChange={handleSelectionModelChange}
              className="!text-black"
            />
          </div>
          <div className="flex flex-col gap-2 mt-14">
            <p className="text-2xl">
              Selected Permissions ({selectedRows.length}):
            </p>
            <div className="flex gap-2 flex-wrap">
              {getSelectedRoleNames().map((name, index) => (
                <div
                  key={index}
                  className="bg-blue-600 text-white px-4 py-3 flex items-center gap-2 rounded-full text-sm mb-2 mt-2"
                >
                  {/* Sử dụng register với các tham số phù hợp */}
                  <input
                    type="hidden"
                    {...register("permissionSetIds")}
                    value={name}
                  />
                  {name}
                  <div
                    className="cursor-pointer text-gray-200"
                    onClick={() => handleRemoveSelectedItem(index)}
                  >
                    <HighlightOffIcon />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
