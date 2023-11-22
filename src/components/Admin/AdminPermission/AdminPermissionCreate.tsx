import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import { TextField } from "@mui/material";
import {
  useCreaeNewPermissionMutation,
  useGetPermissionQuery,
} from "../../../apis/accountUser";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import React from "react";

type FormValues = {
  name: string;
  sort: number;
};
const CreateRoleSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  sort: Yup.string().required("Sort is required"),
});
export const AdminPermissionCreate = () => {
  const navigate = useNavigate();

  //Create new Permission
  const [createNewPermission, { isSuccess }] = useCreaeNewPermissionMutation();
  const { refetch: refetchPermissionList } = useGetPermissionQuery();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(CreateRoleSchema) });
  const onSubmit = handleSubmit(async (data) => {
    await createNewPermission(data);
  });

  const successToastShownRef = React.useRef(false);
  useEffect(() => {
    if (isSuccess && !successToastShownRef.current) {
      toast.success("Create new permission successfully!");
      successToastShownRef.current = true;
      navigate("/admin/permission");
      refetchPermissionList();
    }
  });
  //End

  return (
    <div className="h-screen">
      <div className="flex items-center justify-between">
        <h1>Add permission</h1>
        <div className="flex items-center gap-2">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2 text-2xl"
            onClick={onSubmit}
          >
            <DownloadDoneIcon />
            Create
          </button>
          <button className="bg-gray-400 text-white px-4 py-2 rounded flex items-center gap-2 text-2xl">
            Cancel
          </button>
        </div>
      </div>
      <div className="border-b-2 mb-5">
        <TextField
          id="standard-basic"
          label="Name"
          variant="standard"
          fullWidth
          sx={{ input: { color: "black" } }}
          {...register("name")}
        />
      </div>
      <p className="text-red-500 text-sm -mt-2">
        {errors?.name && errors.name.message}
      </p>
      <div className="border-b-2">
        <TextField
          id="standard-basic"
          label="Sort"
          variant="standard"
          fullWidth
          type="number"
          sx={{ input: { color: "black" } }}
          {...register("sort")}
        />
      </div>
      <p className="text-red-500 text-sm mt-2">
        {errors?.sort && errors.sort.message}
      </p>
    </div>
  );
};
