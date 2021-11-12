import React from "react";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";

const ModalCrearProducto = (props) => {
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(props);
  const handleClose = () => setOpen(false);
  return (
    <Modal
      open={props}
      onClose={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box component="form" sx={style} noValidate autoComplete="off">
        <h1> Nuevo Producto</h1>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            onChange={handleChange("amount")}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
          />
        </FormControl>
        <TextField
          id="standard-basic"
          label="Nombre del Producto"
          variant="standard"
          fullWidth={true}
        />
        <br />
        <TextField
          id="standard-basic"
          label="Descripcion del Producto"
          variant="standard"
          fullWidth={true}
        />
        <br />
        <TextField
          id="standard-basic"
          label="IVA"
          variant="standard"
          endAdornment={<InputAdornment position="end">$</InputAdornment>}
          disabled={true}
          fullWidth={true}
        />
        <br />
        <TextField
          fullWidth={true}
          id="standard-basic"
          endAdornment={<InputAdornment position="end">$</InputAdornment>}
          label="Precio del Producto"
          variant="standard"
        />
        <br />
        <br />
        <div className="botones-Modal">
          <div>
            <Button onClick={handleClose} variant="contained" color="warning">
              Cancelar
            </Button>

            <Button variant="contained" color="success">
              Crear
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalCrearProducto;
