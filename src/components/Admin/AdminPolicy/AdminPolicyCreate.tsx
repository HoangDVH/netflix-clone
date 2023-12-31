import CheckIcon from "@mui/icons-material/Check";
import { TextField } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  useCreaeNewPermissionSetMutation,
  useCreateNewRoleMutation,
  useGetPermissionQuery,
  useGetPermissionSetQuery,
  useGetRoleQuery,
} from "../../../apis/accountUser";
import { useEffect, useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const columns: GridColDef[] = [
  { field: "id", headerName: "", width: 70 },
  { field: "name", headerName: "Name", width: 130 },
  { field: "sort", headerName: "Sort", width: 130 },
];

type FormValues = {
  name: string;
  permissionIdList: string[];
  userIds: string[];
};
const CreateRoleSchema = Yup.object().shape({
  name: Yup.string().required("Field Name is required"),
});

export const AdminPolicyCreate = () => {
  const navigate = useNavigate();
  const { data } = useGetPermissionQuery();
  const permission = data?.data || [];
  const permissionList = permission.map((per, index) => ({
    id: index + 1,
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(CreateRoleSchema) });

  const [createNewPermissionSet, { isSuccess }] =
    useCreaeNewPermissionSetMutation();
  const { refetch } = useGetRoleQuery();
  const { refetch: refetchPerMissionSet } = useGetPermissionSetQuery();

  const onSubmit = handleSubmit(async (data) => {
    const selectedRoleNames = getSelectedRoleNames();
    const selectedRoleIds = permission
      .filter((role) => selectedRoleNames.includes(role.name))
      .map((role) => role.id);

    // Add the selected role ids to the form data
    data.permissionIdList = selectedRoleIds;
    createNewPermissionSet(data);
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Create new role successfully");
      refetch();
      refetchPerMissionSet();
      navigate("/admin/policy");
    }
  }, [isSuccess, navigate, refetch]);

  return (
    <form>
      {" "}
      <div className="h-screen">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="border-b-2 border-gray-300 w-56 !text-black">
              <TextField
                id="standard-basic"
                label="Policy Name"
                variant="standard"
                fullWidth
                sx={{ input: { color: "black" } }}
                {...register("name")}
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
              <CheckIcon /> CREATE
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
            <h2 className="mt-8 text-2xl mb-10">All Permission</h2>
            <DataGrid
              rows={permissionList}
              columns={columns}
              checkboxSelection
              onRowSelectionModelChange={handleSelectionModelChange}
              className="!text-black"
            />
          </div>
          <div className="flex flex-col gap-2 mt-14">
            <p className="text-2xl">
              Selected Permissions ({selectedRows.length}):
            </p>
            <div className="flex gap-2 flex-wrap">
              {selectedRows.map((permiss, index) => (
                <div
                  key={index}
                  className="bg-blue-600 text-white px-4 py-3 flex items-center gap-2 rounded-full text-sm mb-2 mt-2"
                  {...register("permissionIdList")}
                >
                  {permissionList[parseInt(permiss, 10) - 1]?.name || ""}
                  <div className="cursor-pointer">
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
