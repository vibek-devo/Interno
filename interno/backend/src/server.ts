import dotenv/config;
import express from express;
import cors from cors;
import helmet from helmet;
import morgan from morgan;
import cookieParser from cookie-parser;
import compression from compression;
import rateLimit from express-rate-limit;
import { connect } from ./config/db;

const app = express();
app.use(cors({origin: true, credentials: true}));
app.use(helmet());
app.use(morgan(dev));
app.use(express.json({ limit: 1mb }));
app.use(cookieParser());
app.use(compression());
app.use(rateLimit({ windowMs: 15*60*1000, limit: 200 }));

app.get(/health, (_req, res) => res.json({ ok: true, service: interno-backend }));

const port = Number(process.env.PORT || 4000);
connect().then(() => {
  app.listen(port, () => console.log());
});

export default app;
