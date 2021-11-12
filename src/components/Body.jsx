import { Container } from "@mui/material";
import faker from "faker";
import "../css/styles.css";
import { React, useState } from "react";
import Button from "@mui/material/Button";
import ListaProducto from "./ListaProducto";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";

const API = "https://dry-chamber-65015.herokuapp.com/api/v1/productos/";

const Body = () => {
  const [open2, setOpen2] = useState(false);
  const [propModal, setPropModal] = useState({
    name: "",
    costo: "",
    price: "",
    iva: 0,
  });

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose = () => {
    setOpen2(false);
  };
  const handleChange = (event) => {
    if (event.target.name === "costo") {
      calculaiva(event.target.value);
      setPropModal({ ...propModal, [event.target.name]: event.target.value });
    } else {
      setPropModal({ ...propModal, [event.target.name]: event.target.value });
    }
    //console.log(`${event.target.name}: ${event.target.value}`);
  };

  const handlePost = () => {
    calculaiva(propModal.costo);
    const id = faker.datatype.uuid();
    const postObj = { id: "", name: "", costo: "", price: "", iva: 0 };
    postObj.id = id;
    postObj.name = propModal.name;
    postObj.costo = parseFloat(propModal.costo);
    postObj.price = parseFloat(propModal.price);
    postObj.iva = parseFloat(propModal.iva);
    console.log(postObj);

    setOpen2(false);
    const post = API;
    async function fetchData() {
      const response = await axios.post(post, postObj);
      console.log(response);
    }
    fetchData();
  };

  const calculaiva = async (costo) => {
    let newiva = parseFloat(costo * 0.16);
    propModal.iva = parseFloat(newiva.toFixed(2));
    console.log(newiva);
    // setPropModal({ ...propModal, ["iva"]: newiva.toFixed(2) });
    console.log(propModal);
  };
  return (
    <Container>
      <div className="nuevoProducto">
        <Button onClick={handleClickOpen2} variant="contained" color="success">
          Nuevo Producto
        </Button>
      </div>
      <ListaProducto />
      {/* <ModalCrearProducto></ModalCrearProducto> */}

      {/* MODAL Crear -------------------------------------- */}
      <Dialog open={open2} onClose={handleClose}>
        <DialogTitle>Crear Producto ...</DialogTitle>
        <DialogContent>
          <TextField
            inputProps={{ maxLength: 30 }}
            autoFocus
            required={true}
            name="name"
            margin="dense"
            id="name"
            label="Nombre de Producto"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            autoFocus
            name="costo"
            required={true}
            margin="dense"
            id="costo"
            label="Costo del Producto"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            type="number"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            autoFocus
            error
            name="iva"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            margin="dense"
            id="iva"
            label="IVA 16%"
            type="number"
            fullWidth
            value={propModal.iva}
            variant="standard"
            onChange={handleChange}
            disabled
          />
          <TextField
            autoFocus
            id="costo"
            required={true}
            name="price"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            margin="dense"
            label="Precio"
            type="number"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handlePost}>Crear</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Body;
