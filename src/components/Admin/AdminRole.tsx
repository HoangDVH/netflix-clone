import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import CardContent from "@mui/material/CardContent";

import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";
import { useGetRoleQuery } from "../../apis/accountUser";
import AddIcon from "@mui/icons-material/Add";
export const AdminRole = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const { data } = useGetRoleQuery();
  const roles = data?.data ?? [];
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold mb-10 mt-2">Roles</h2>
        <button>
          <div className="flex gap-1 items-center bg-blue-700 px-4 py-3 rounded-md text-white">
            <div>CREATE NEW ROLE</div>
            <div>
              <AddIcon />
            </div>
          </div>
        </button>
      </div>
      <div className="flex justify-between mb-16 mt-5">
        <div>
          <h4 className="text-2xl mb-2">Overview</h4>
          <p className="h-10 w-96">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s
          </p>
        </div>
        <div className="flex gap-2 h-1/2">
          <input className="border-slate-700 border-solid border-2 px-2 w-80" />
          <button className="bg-blue-500 px-5 py-2 rounded text-white">
            <SearchIcon />
          </button>
        </div>
      </div>
      <p className="text-blue-500 text-2xl mb-5">{roles.length} Roles</p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 h-96 ">
        {roles.map((role) => {
          return (
            <div>
              <Card sx={{ maxWidth: 345 }} className="!bg-gray-200 !text-black">
                <CardHeader
                  action={
                    <IconButton aria-label="settings">
                      <div onClick={handleClick}>
                        <MoreVertIcon className="text-black" />
                      </div>
                      <div className="!bg-white">
                        <Popper id={id} open={open} anchorEl={anchorEl}>
                          <Box
                            sx={{
                              border: 1,
                              p: 1,
                              bgcolor: "background.paper",
                            }}
                          >
                            <div className="flex flex-col gap-3 cursor-pointer">
                              <div className="px-2 py-2">Edit</div>
                              <div className="px-2 py-2">Delete</div>
                            </div>
                          </Box>
                        </Popper>
                      </div>
                    </IconButton>
                  }
                  title={role.name}
                />

                <CardContent>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className="flex gap-4 !text-white !text-m pt-8"
                  >
                    <div className="bg-blue-600 px-3 py-2 rounded-3xl">
                      Permissionset ({role.permissionSetIds.length})
                    </div>
                    <div className="bg-blue-600 px-4 py-2 rounded-3xl">
                      User ({role.userIds.length})
                    </div>
                  </Typography>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};
