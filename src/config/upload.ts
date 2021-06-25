import crypto from "crypto";
import multer from "multer";
import { resolve } from "path";

const tmpFolder = resolve(__dirname, "..", "..", "tmp");

export default {
  tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (request, file, callback) => {
      const file_hash = crypto.randomBytes(16).toString("hex");
      const file_name = `${file_hash}-${file.originalname}`;
      return callback(null, file_name);
    },
  }),
};
