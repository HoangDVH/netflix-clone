import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  useCreateNewUserMutation,
  useGetAccountListQuery,
  useGetRoleQuery,
} from "../../../apis/accountUser";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CreateIcon from "@mui/icons-material/Create";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";

const columns: GridColDef[] = [
  { field: "id", headerName: "", width: 70 },
  { field: "firstName", headerName: "Name", width: 130 },
];

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  roleIds: string[];
};

const CreateSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
      "Invalid email address"
    )
    .required("Không được bỏ trống"),
  password: Yup.string()
    .min(8, "The Password must be at least 6 ")
    .max(20, "The Password must be  at max 30 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-])/,
      "Password must contain uppercase letters, lowercase letters, digits and non-alphanumeric character"
    )
    .required("Không được bỏ trống"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Mật khẩu phải trùng khớp")
    .required("Không được bỏ trống"),
  phoneNumber: Yup.string()
    .matches(/^0[0-9]{9,10}$/, "Invalid phone number")
    .required("Không được bỏ trống"),
});
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

export const AdminUserCreate = () => {
  const { data } = useGetRoleQuery();

  const roles = data?.data || [];
  const roleNames = roles.map((role) => role.name);
  const roleNamesWithId = roleNames.map((role, index) => ({
    id: index + 1,
    firstName: role,
  }));

  

  const navigate = useNavigate();

  const { refetch } = useGetAccountListQuery();
  const [createNewAccount, { isSuccess }] = useCreateNewUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(CreateSchema) });

  const onSubmit = handleSubmit(async (data) => {
    const selectedRoleNames = getSelectedRoleNames();

    // Map selected role names to their corresponding role id
    const selectedRoleIds = roles
      .filter((role) => selectedRoleNames.includes(role.name))
      .map((role) => role.id);

    // Add the selected role ids to the form data
    data.roleIds = selectedRoleIds;

    // Log the final form data
    createNewAccount(data)

  });

  React.useEffect(() => {
    if (isSuccess) {
      toast.success("Create new user successfully");
      refetch();
      navigate("/admin/user");
    }
  }, [isSuccess, navigate, refetch]);

  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  //Number of checkboxes selected
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const handleSelectionModelChange = (selectionModel: string[]) => {
    setSelectedRows(selectionModel);
  };
  console.log('number',selectedRows)
  const getSelectedRoleNames = () => {
    return selectedRows.map(
      (rowId) => roleNamesWithId[parseInt(rowId, 10) - 1]?.firstName || ""
    );
  };
  //End


  return (
    <form>
      <div className="h-screen">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl">Create new user</h2>
          <div className="flex gap-2">
            <button
              className="bg-blue-500 px-3 py-3 rounded flex items-center gap-2"
              onClick={onSubmit}
            >
              <CreateIcon />
              CREATE
            </button>

            <button className="bg-slate-400 px-3 py-2 rounded">CANCEL</button>
          </div>
        </div>
        <div className="text-black mt-10 border-2 border-collapse">
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="USER" {...a11yProps(0)} />
                <Tab label="ROLE" {...a11yProps(1)} />
                <div className="bg-green-500 h-5 px-2 text-white rounded-full -ml-8 mt-1">
                  {selectedRows.length}
                </div>
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <div className="">
                <div className="text-xl">User Form</div>
                <div className="flex flex-col mt-5 gap-2">
                  <div className="border-2 w-full">
                    <TextField
                      id="outlined-basic"
                      label="Email"
                      variant="outlined"
                      fullWidth
                      sx={{ input: { color: "black" } }}
                      {...register("email")}
                    />
                  </div>
                  <p className="text-red-500 text-sm -mt-2">
                    {errors?.email && errors?.email.message}
                  </p>
                  <div className="border-2 w-full">
                    <TextField
                      id="outlined-basic"
                      label="Password"
                      variant="outlined"
                      fullWidth
                      sx={{ input: { color: "black" } }}
                      {...register("password")}
                    />
                  </div>
                  <p className="text-red-500 text-sm -mt-2">
                    {errors?.password && errors.password.message}
                  </p>
                  <div className="border-2 w-full">
                    <TextField
                      id="outlined-basic"
                      label="ConfirmPassword"
                      variant="outlined"
                      fullWidth
                      sx={{ input: { color: "black" } }}
                      {...register("confirmPassword")}
                    />
                  </div>
                  <p className="text-red-500 text-sm -mt-2">
                    {errors?.confirmPassword && errors.confirmPassword.message}
                  </p>
                  <div className="border-2 w-full">
                    <TextField
                      id="outlined-basic"
                      label="PhoneNumber"
                      variant="outlined"
                      fullWidth
                      sx={{ input: { color: "black" } }}
                      {...register("phoneNumber")}
                    />
                  </div>
                  <p className="text-red-500 text-sm -mt-2">
                    {errors?.phoneNumber && errors.phoneNumber.message}
                  </p>
                </div>
                <div className="mt-8">
                  <p {...register("roleIds")}>
                    Selected Roles: {getSelectedRoleNames().join(", ")}
                  </p>
                </div>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={roleNamesWithId}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 10 },
                    },
                  }}
                  pageSizeOptions={[10, 15]}
                  checkboxSelection
                  onRowSelectionModelChange={handleSelectionModelChange}
                  className="!text-black"
                />
              </div>
            </CustomTabPanel>
          </Box>
        </div>
      </div>
    </form>
  );
};
