//Importación de dependencias
import express from "express";
import path from "path";

const app = express();

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

// Caso real: Respuesta JSON detallada con información comercial de un producto de Supermaxi
app.get("/productos/cafe-loja", (req, res) => {
  res.json({
    producto: "Café Molido Gourmet Lojano 250g",
    referencia: "7861000123456",
    precio: 4.85,
    moneda: "USD",
    disponibilidad: true,
    localesDisponibles: [
      "Sweet & Coffee Quicentro Shopping",
      "Sweet & Coffee Mall del Jardín",
      "Sweet & Coffee San Luis Shopping"
    ],
    descripcion: "Café de origen 100% arábigo cultivado en las alturas de Loja, tostado medio.",
    url: "https://www.supermaxi.com/cafe-loja-250g/p"
  });
});


// Caso real: Envío del cupón de descuento en formato PNG.
app.get("/promocion/banner", (req, res) => {
  res.sendFile(path.join(import.meta.dirname, "public", "cupon.png"));
});

// Caso real: Menú digital 
app.get("/menu-digital", (req, res) => {
  res.send(`
    <h1>Menú de Especialidades - Sweet & Coffee</h1>
    <ul>
      <li>Espresso Doble - $2.25</li>
      <li>Capuchino Vainilla - $3.50</li>
      <li>Mocaccino Frío - $3.80</li>
      <li>Tarta de Manzana - $2.90</li>
    </ul>
  `);
});


// Caso real: Verificación de Token de Administrador para acceder al reporte de ventas.
const verificarTokenAdmin = (req, res, next) => {
  const { token } = req.headers;
  const esAutorizado = token === "admin123" ? true : false;
  esAutorizado ? next() : res.status(403).send("Acceso denegado: Token inválido o no proporcionado.");
};


// Ruta pública
app.get("/promociones-publicas", (req, res) => {
  res.send(`Promoción del día: 2x1 en Americanos de 8:00 a 10:00 AM.`);
});


// Ruta privada por token
app.get("/admin/reporte-ventas", verificarTokenAdmin, (req, res) => {
  res.send(`Panel Administrativo: Ventas totales del día = $1,245.50 USD.`);
});


// Caso real: Captura de rutas inexistentes en el sistema para evitar caídas.
app.use((req, res) => {
  res.status(404).send("404 - La página o servicio solicitado no existe en Sweet & Coffee.");
});

// Inicio del servidor - puerto
app.listen(3000, () => {
  console.log("Servidor de Sweet & Coffee corriendo en el puerto 3000");
});