//Importación de dependencias
import express from "express";
import path from "path";

const app = express();

// Inicio del servidor - puerto
app.listen(3000, () => {
  console.log("Servidor de Sweet & Coffee corriendo en el puerto 3000");
});

// Middleware para procesar JSON en el req.body
app.use(express.json());

// Caso real: Mensaje de bienvenida a la API pública de Sweet & Coffee.
app.get("/", (req, res) => {
  res.send("Bienvenido a la API Oficial de Pedidos y Menú de Sweet & Coffee");
});



// Caso real: Envío de la orden de un café personalizado
app.post("/pedidos/cafe", (req, res) => {
  console.log(req.body);
  const { cliente, bebida, tamano, leche } = req.body;
  res.send(`Pedido confirmado para ${cliente}: ${bebida} (${tamano}) con leche ${leche}. ¡En preparación!`);
});


// Caso real: Consulta del detalle de una categoría de postre según el tipo en la URL (ej: /postres/cheesecake).
app.get("/postres/:categoria", (req, res) => {
  console.log(req.params);
  const { categoria } = req.params;
  res.send(`Mostrando catálogo de postres en la categoría: ${categoria}`);
});


// Caso real: Filtrado del menú de bebidas según preferencia (ej: /bebidas/buscar?tipo=fria&azucar=baja).
app.get("/bebidas/buscar", (req, res) => {
  console.log(req.query);
  const { tipo, azucar } = req.query;
  res.send(`Búsqueda de bebidas de tipo '${tipo}' con nivel de azúcar '${azucar}'.`);
});


