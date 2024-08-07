import { Server } from 'http';
import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      console.log(`This App server is listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();

// unhandled Rejection error handling
process.on('unhandledRejection', () => {
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// uncaught Exception error handling
process.on('uncaughtException', () => {
  process.exit(1);
});
