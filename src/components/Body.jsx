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
import swal from "sweetalert";
import axios from "axios";

const API = "https://dry-chamber-65015.herokuapp.com/api/v1/productos/";

const Body = () => {
  const [open2, setOpen2] = useState(false);
  const [tabla, setTabla] = useState(false);

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
    setPropModal({ ...propModal, name: "", costo: "", price: "", iva: 0 });
  };
  const handleChange = (event) => {
    if (event.target.name === "costo") {
      calculaiva(event.target.value);
      setPropModal({ ...propModal, [event.target.name]: event.target.value });
    } else {
      setPropModal({ ...propModal, [event.target.name]: event.target.value });
    }
  };
  const reload = () => {
    setTabla(!tabla);
  };
  const handlePost = () => {
    if (
      propModal.name === "" ||
      propModal.costo === "" ||
      propModal.price === "" ||
      propModal.iva === ""
    ) {
      return swal({
        title: "Hubo un Error",
        text: "Verifica los datos ingresados ",
        icon: "error",
        timer: "5000",
      });
    }
    const id = faker.datatype.uuid();
    const postObj = { id: "", name: "", costo: "", price: "", iva: 0 };
    postObj.id = id;
    postObj.name = propModal.name;
    postObj.costo = parseFloat(propModal.costo);
    postObj.price = parseFloat(propModal.price);
    postObj.iva = parseFloat(propModal.iva);

    setOpen2(false);
    const post = API;
    async function fetchData() {
      const response = await axios.post(post, postObj);
      if (response.status === 201) {
        swal({
          title: "Producto creado",
          text: "El producto fue creado correctamente",
          icon: "success",
          timer: "5000",
        });
      }
      console.log(response);
    }
    fetchData();
    reload();
  };

  const calculaiva = async (costo) => {
    let newiva = parseFloat(costo * 0.16);
    let newPrice = parseFloat(parseFloat(costo) + newiva);
    propModal.iva = newiva.toFixed(2);
    propModal.price = newPrice.toFixed(2);
  };
  return (
    <Container>
      <div className="nuevoProducto">
        <Button onClick={handleClickOpen2} variant="contained" color="success">
          Nuevo Producto
        </Button>
      </div>
      <ListaProducto className="listaProducto" />
      <div class="attribution">
        Challenge by{" "}
        <a href="https://www.microsip.com/" target="_blank">
          Microsip
        </a>
        . Coded by <a href="#">Aldo Rodriguez</a>.
      </div>

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
            // error={propModal.name === ""}
            helperText={
              propModal.name === "" ? "Por favor ingrese un valor" : " "
            }
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
            //error={propModal.costo === ""}
            helperText={
              propModal.costo === "" ? "Por favor ingrese un valor" : " "
            }
          />
          <TextField
            autoFocus
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
            disabled
            id="price"
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
            value={propModal.price}
            onChange={handleChange}
            //error={propModal.price === ""}
            helperText={
              propModal.price === "" ? "Por favor ingrese un valor" : " "
            }
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
