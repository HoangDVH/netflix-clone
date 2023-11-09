import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SaveIcon from "@mui/icons-material/Save";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditPhoneNumberMutation,
  useGetAccountByIdQuery,
  useGetAccountListQuery,
  useGetRoleByIdQuery,
} from "../../../apis/accountUser";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
type FormValues = {
  phoneNumber: string;
};

const EditSchema = Yup.object().shape({
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

export const AdminUserEdit = () => {
  const { data, refetch } = useGetAccountListQuery();
  const navigate = useNavigate();
  const { editId } = useParams();
  const { data: dataIdAccount } = useGetAccountByIdQuery(editId);
  const roles = dataIdAccount?.roleIds.map((roleId) => {
    const roleData = useGetRoleByIdQuery(roleId);
    return roleData; // Return roleData inside the map function
  });
  console.log("name", roles);

  // const { data: dataRoleById } = useGetRoleByIdQuery(
  //   dataIdAccount?.roleIds.map((item) => console.log("id", item))
  // );
  // console.log("dataRole", dataRoleById);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(EditSchema) });

  //Edit Phone Number
  const [isPhoneNumberChanged, setPhoneNumberChanged] = React.useState(false);
  const [phoneNumberValue, setPhoneNumberValue] = React.useState(
    dataIdAccount?.phoneNumber || ""
  );
  const [initialPhoneNumberValue, setInitialPhoneNumberValue] = React.useState(
    dataIdAccount?.phoneNumber || ""
  );
  React.useEffect(() => {
    if (dataIdAccount) {
      setPhoneNumberValue(dataIdAccount.phoneNumber || "");
    }
  }, [dataIdAccount]);
  const handlePhoneNumberChange = (event) => {
    setPhoneNumberValue(event.target.value);
    if (!isPhoneNumberChanged) {
      setPhoneNumberChanged(true);
    }
  };

  const [editPhoneNumber] = useEditPhoneNumberMutation();
  const onSubmit = handleSubmit(async (data) => {
    if (phoneNumberValue !== initialPhoneNumberValue) {
      try {
        await editPhoneNumber({
          phoneNumber: data.phoneNumber,
          idEdit: editId || "",
        });
        setPhoneNumberChanged(false);
        setInitialPhoneNumberValue(phoneNumberValue);
        refetch();
      } catch (error) {
        console.error("Error editing phone number:", error);
      }
    }
  });
  //End Edit

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <form>
      <div className="h-screen">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl">Edit new user</h2>
          <div className="flex gap-2">
            <button
              className={`bg-blue-500 px-3 py-3 rounded flex items-center gap-2 ${
                !isPhoneNumberChanged ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={onSubmit}
            >
              <SaveIcon />
              SAVE
            </button>
            <button
              className={`bg-blue-500 px-3 py-3 rounded flex items-center gap-2 ${
                !isPhoneNumberChanged ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={async () => {
                await onSubmit();
                refetch();
                navigate("/admin/user");
                toast.success("Edit successfully!");
              }}
            >
              <SaveIcon />
              SAVE & CLOSE
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
                  4
                </div>
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <div className="">
                <div className="text-xl">User Form</div>
                <div className="flex flex-col mt-5 gap-2">
                  <div className="border-2 w-full">
                    <input
                      className="w-full px-2 py-4"
                      placeholder="Email"
                      value={dataIdAccount?.email || ""}
                      disabled
                    />
                  </div>

                  <div className="border-2 w-full">
                    <input
                      className="w-full px-2 py-4"
                      placeholder="PhoneNumber"
                      {...register("phoneNumber")}
                      value={phoneNumberValue}
                      onChange={handlePhoneNumberChange}
                    />
                  </div>
                  <p className="text-red-500 text-sm -mt-2">
                    {errors?.phoneNumber && errors.phoneNumber.message}
                  </p>
                </div>
                <div className="mt-8">
                  <p>Selected Roles:</p>
                  <p className="text-blue-500">da</p>
                </div>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              Item Two
            </CustomTabPanel>
          </Box>
        </div>
      </div>
    </form>
  );
};
