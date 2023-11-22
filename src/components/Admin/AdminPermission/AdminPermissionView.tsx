import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Badge from "@mui/material/Badge";

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

  const matchedPermissionNames = dataGetPerById?.permissionSetIdList
    .map((id) => {
      const matchedPermission = dataGetPer?.data.find((item) => item.id === id);
      return matchedPermission;
    })
    .filter((name) => name !== undefined);

  console.log("matchedPermissionNames", matchedPermissionNames);

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
      <div className="mt-5 relative">
        <Accordion sx={{ backgroundColor: "white", color: "black" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            className="relative"
          >
            <Typography className="flex items-center justify-between w-full">
              <p className="w-full">Policies contain this permission</p>
              <div className="mr-3 bg-blue-600 text-white rounded-full px-3 py-1">
                {matchedPermissionNames?.length}
              </div>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {matchedPermissionNames?.length !== 0 ? (
                <div className="w-full text-left border-2 mt-5">
                  <Table>
                    <thead className="bg-gray-200 border-y-2">
                      <tr className="">
                        <th className="border-b-2 border-slate-400 pl-10 py-2">
                          Name
                        </th>
                        <th className="border-b-2 border-slate-400 py-2">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {matchedPermissionNames?.map((foundRole, index) => (
                        <tr key={index}>
                          <td className="pl-10 py-4 w-64">{foundRole?.name}</td>
                          <td className="py-4">{foundRole?.description}</td>
                          {/* Add more cells for other properties if needed */}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ) : (
                <div className="text-black">There is no policy containing this permission</div>
              )}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};
