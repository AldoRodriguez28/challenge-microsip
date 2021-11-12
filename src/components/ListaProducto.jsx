import React, { useEffect, useState } from "react";
import axios from "axios";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { BorderColorSharp } from "@mui/icons-material";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import InputAdornment from "@mui/material/InputAdornment";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const API = "https://dry-chamber-65015.herokuapp.com/api/v1/productos/";

const ListaProducto = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [eliminar, setEliminar] = useState(false);

  const [propModal, setPropModal] = useState({
    name: "",
    costo: 0,
    price: 0,
    iva: 0,
  });

  useEffect(() => {
    async function fetchData() {
      const response = await axios(API);
      setProducts(response.data);
    }
    fetchData();
  }, []);
  const handleChange = (event) => {
    const propiedad = event.target.name;
    if (propiedad === "name") {
      propModal[event.target.name] = event.target.value;
      // setPropModal({
      //   ...propModal,
      //   [event.target.name]: event.target.value,
      // });
    } else {
      let data = parseFloat(event.target.value);
      propModal[event.target.name] = data;
      // setPropModal({
      // ...propModal,
      //   [event.target.name]: data,
      // });
    }
  };

  const calculaiva = (price) => {
    let newiva = parseFloat(price * 0.16);
    propModal.iva = parseFloat(newiva.toFixed(2));
    //   setPropModal({ ...propModal, iva: newiva.toFixed(2) });
    console.log(propModal.iva);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseEliminar = () => {
    setEliminar(false);
  };
  const handlePatch = () => {
    calculaiva(propModal.price);
    setOpen(false);
    console.log(propModal);
    const patch = API + propModal.id;
    delete propModal.id;
    async function fetchData() {
      const response = await axios.patch(patch, propModal);
      console.log(response);
      const response2 = await axios(API);
      setProducts(response2.data);
    }
    fetchData();
  };
  const metodoEliminar = () => {
    const borrar = API + propModal.id;
    async function fetchData() {
      const response = await axios.delete(borrar);
      console.log(response);
      const response2 = await axios(API);
      setProducts(response2.data);
      setEliminar(false);
    }
    fetchData();
  };
  function handleDelete(id) {
    const product = products.find((item) => item.id === id);
    setPropModal(product);
    setEliminar(true);
  }
  function handleEdit(id) {
    const product = products.find((item) => item.id === id);
    setPropModal(product);
    handleClickOpen();
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minwidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Articulo</TableCell>
            <TableCell align="center">Costo</TableCell>
            <TableCell align="right">IVA</TableCell>
            <TableCell align="right">Precio</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((producto) => (
            <TableRow
              key={producto.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="producto">
                {producto.name}
              </TableCell>
              <TableCell component="th" scope="producto" align="center">
                $ {producto.costo}
              </TableCell>
              <TableCell align="right">$ {producto.iva}</TableCell>
              <TableCell align="right">$ {producto.price}</TableCell>
              <TableCell align="center">
                <IconButton
                  color="secondary"
                  aria-label="add an alarm"
                  onClick={() => handleEdit(producto.id)}
                >
                  <BorderColorSharp />
                </IconButton>

                <IconButton
                  color="warning"
                  aria-label="add to shopping cart"
                ></IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDelete(producto.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* MODAL Editar -------------------------------------- */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Editando Producto ...</DialogTitle>
          <DialogContent>
            <TextField
              id="name"
              inputProps={{ maxLength: 30 }}
              autoFocus
              required={true}
              name="name"
              margin="dense"
              label="Nombre de Producto"
              defaultValue={propModal.name}
              type="text"
              fullWidth
              variant="standard"
              onChange={handleChange}
            />
            <TextField
              id="costo"
              autoFocus
              name="costo"
              required={true}
              margin="dense"
              label="Costo del Producto"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              defaultValue={propModal.costo}
              type="number"
              fullWidth
              variant="standard"
              onChange={handleChange}
            />
            <TextField
              id="iva"
              autoFocus
              name="iva"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              defaultValue={propModal.iva}
              margin="dense"
              label="IVA 16%"
              type="number"
              fullWidth
              variant="standard"
              onChange={handleChange}
              disabled
            />
            <TextField
              id="price"
              autoFocus
              required={true}
              name="price"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              defaultValue={propModal.price}
              margin="dense"
              label="price"
              type="number"
              fullWidth
              variant="standard"
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={handlePatch}>Aceptar</Button>
          </DialogActions>
        </Dialog>

        {/* MODAL ELIMINAR -------------------------------------- */}
        <Dialog
          open={eliminar}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>
            {"Estas seguro que deseas eliminar este producto?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Una ves eliminado el producto '{propModal.name}', sera imposible
              recuperarlo.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="warning" onClick={handleCloseEliminar}>
              Cancelar
            </Button>
            <Button color="primary" onClick={metodoEliminar}>
              Si estoy Seguro
            </Button>
          </DialogActions>
        </Dialog>
      </Table>
    </TableContainer>
  );
};
export default ListaProducto;
