

import { useNavigate } from "react-router-dom";
import AdminTable from "../AdminTable";

import ExportFile from "./ExportFile";
import InputFileUpload from "./InputFileUpload";
import AddIcon from "@mui/icons-material/Add";
export const AdminUser = () => {
  const navigate = useNavigate()

  return (
    <div className="w-full h-full">
   
      <div className="flex items-center gap-5 justify-between">
        <h2 className="text-4xl">Users</h2>
        <div className="flex gap-3 items-center">
          <InputFileUpload />
          <ExportFile />
          <button className="flex items-center gap-2 bg-blue-600 text-white font-semibold px-5 py-2 rounded">
            <AddIcon />
            <span className="text-sm" onClick={() => navigate('/admin/user/create')}>CREATE NEW USER</span>
          </button>
        </div>
      </div>
      <AdminTable />
    
 
    </div>
  );
};
