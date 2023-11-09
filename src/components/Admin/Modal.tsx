import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";


interface modalProps {
  openModal: boolean;
  handleCloseModal: () => void;
  handleClickOpenModal: () => void;
  deleteId: string;
  handleDelete: () => void;
}

export default function ModalAdmin(props: modalProps) {
  const {
    openModal,
    handleClickOpenModal,
    handleCloseModal,
    handleDelete,
  } = props;

  
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpenModal}>
        Delete
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          id="responsive-dialog-title"
          className="!bg-white text-black"
        >
          DELETE
        </DialogTitle>
        <DialogContent className="!bg-white text-black">
          <DialogContentText className="!text-black !text-lg">
            Are you sure you wish to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions className="!bg-white text-black">
          <Button autoFocus onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            autoFocus
            className="!bg-red-500 !text-white !font-semibold"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
