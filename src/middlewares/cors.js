import cors from 'cors';

app.use(
  cors({
    origin: "http://localhost:5173", // Cambia esto al dominio del front
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
