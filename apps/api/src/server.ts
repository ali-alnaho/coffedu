import './config/env.config.js';
import app from './app.js';
import { config } from './config/env.config.js';

app.listen(config.port, () => {
  console.log(`Coffedu API is listening on port ${config.port}`);
  //console.log("PORT:", process.env.PORT);
});
