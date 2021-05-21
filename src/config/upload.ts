import crypto from "crypto";
import multer from "multer";
import { resolve } from "path";

export default {
  upload(folder: string) {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, "..", "..", folder),
        filename: (request, file, callback) => {
          const file_hash = crypto.randomBytes(16).toString("hex");
          const file_name = `${file_hash}-${file.originalname}`;
          return callback(null, file_name);
        },
      }),
    };
  },
};
