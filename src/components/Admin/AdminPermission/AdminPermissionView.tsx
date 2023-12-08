import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


import { useNavigate, useParams } from "react-router-dom";
import {
  useGetPermissionByIdQuery,
  useGetPermissionSetQuery,
} from "../../../apis/accountUser";
import { Table } from "@mui/material";
export const AdminPermissionView = () => {
  const navigate = useNavigate();
  const { idPer } = useParams();
  const { data: dataGetPerById } = useGetPermissionByIdQuery(idPer);
  const { data: dataGetPer } = useGetPermissionSetQuery();

  

  return (
    <div className="h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl">{dataGetPerById?.name}</h1>

        <div className="flex items-center gap-2">
          <button
            className="bg-blue-600 text-white px-4 py-2 flex items-center gap-2 text-2xl rounded"
            onClick={() => navigate(`/admin/permission/edit/${idPer}`)}
          >
            <EditIcon />
            Edit
          </button>
          <button className="bg-red-600 text-white px-4 py-2 flex items-center gap-2 text-2xl rounded">
            <DeleteIcon />
            Delete
          </button>
        </div>
      </div>
      <div className="mt-5 text-xl font-medium">
        Sort: {dataGetPerById?.sort}
      </div>
      
    </div>
  );
};
