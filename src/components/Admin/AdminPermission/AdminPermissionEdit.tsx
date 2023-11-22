import SaveIcon from "@mui/icons-material/Save";
import { TextField } from "@mui/material";
import {
  useCreaeNewPermissionMutation,
  useEditPermissionMutation,
  useGetPermissionByIdQuery,
  useGetPermissionQuery,
} from "../../../apis/accountUser";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";

type FormValues = {
  name: string;
  sort: number;
  id: string;
};
const CreateRoleSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  sort: Yup.string().required("Sort is required"),
});
export const AdminPermissionEdit = () => {
  const navigate = useNavigate();
  const { idPer } = useParams();

  //Edit new Permission
  const { data: dataGetPerById, refetch: refetchPerById } =
    useGetPermissionByIdQuery(idPer);
  //edit name and sort
  const [editedName, setEditedName] = useState(dataGetPerById?.name || "");
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(event.target.value);
  };
  const [editedSort, setEditedSort] = useState(dataGetPerById?.sort || "");
  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedSort(event.target.value);
  };

  const [editPermission, { isSuccess }] = useEditPermissionMutation();
  const { refetch: refetchPermissionList } = useGetPermissionQuery();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(CreateRoleSchema),
    defaultValues: {
      id: "string",
    },
  });
  const onSubmit = handleSubmit(async (data) => {
    await editPermission({
      idPer: idPer || "",
      body: data,
    });
  });

  const successToastShownRef = React.useRef(false);

  useEffect(() => {
    if (isSuccess && !successToastShownRef.current) {
      toast.success("Create new role successfully");
      successToastShownRef.current = true;
      refetchPermissionList();
      refetchPerById();

      navigate("/admin/permission");
    }
  }, [isSuccess, navigate, refetchPermissionList, refetchPerById]);
  //End

  return (
    <div className="h-screen">
      <div className="flex items-center justify-between">
        <h1>Edit permission</h1>
        <div className="flex items-center gap-2">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2 text-2xl"
            onClick={onSubmit}
          >
            <SaveIcon />
            Save
          </button>
          <button
            className="bg-blue-500 text-white px-2 md:px-4 py-2 rounded flex items-center gap-2 text-2xl"
            onClick={onSubmit}
          >
            <SaveIcon />
            Save & Close
          </button>
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded flex items-center gap-2 text-2xl"
            onClick={() => navigate("/admin/permission")}
          >
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
          value={editedName}
          {...register("name")}
          onChange={handleNameChange}
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
          value={editedSort}
          {...register("sort")}
          onChange={handleSortChange}
        />
      </div>
      <p className="text-red-500 text-sm mt-2">
        {errors?.sort && errors.sort.message}
      </p>
    </div>
  );
};
