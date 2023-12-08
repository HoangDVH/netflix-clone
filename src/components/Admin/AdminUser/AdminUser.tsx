import { useNavigate } from "react-router-dom";
import AdminTable from "../AdminTable";

import ExportFile from "./ExportFile";
import InputFileUpload from "./InputFileUpload";
import AddIcon from "@mui/icons-material/Add";
import { AdminSearch } from "../AdminSearch";
import { SetStateAction, useState } from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "../../../store/authSlice";
import {
  useGetCurrentUserQuery,
  useGetPermissionByUserQuery,
} from "../../../apis/accountUser";

export const AdminUser = () => {
  const navigate = useNavigate()
  const [inputChange,setInputChange] = useState("")
  const handleInput = (e: { target: { value: SetStateAction<string>; }; }) => {
    setInputChange(e.target.value)
  }
  console.log('search',inputChange)


 
  const { accessToken } = useSelector(selectAuth);
  const { data: dataGetCurrentUser } = useGetCurrentUserQuery({
    accessToken: accessToken || "",
  });
  const { data: dataUserPermission } = useGetPermissionByUserQuery({
    id: dataGetCurrentUser?.id || "",
  });
  console.log("pẻ", dataUserPermission);
  return (
    <div className="w-full h-full">
      <div className="flex items-center gap-5 justify-between">
        <h2 className="text-4xl">Users</h2>
        <div className="flex gap-3 items-center">
          <InputFileUpload />
          <ExportFile />
          <button className="flex items-center gap-2 bg-blue-600 text-white font-semibold px-5 py-2 rounded">
            <AddIcon />
            <span
              className="text-sm"
              onClick={() => navigate("/admin/user/create")}
            >
              CREATE NEW USER
            </span>
          </button>
        </div>
      </div>
      <AdminSearch onChange={handleInput} />
      <AdminTable inputChange={inputChange} />
    </div>
  );
};
