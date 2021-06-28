import { hash } from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import createConnection from "..";

async function create() {
  const connection = await createConnection();

  const id = uuidv4();
  const password = await hash("admin", 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
    values('${id}', 'admin', 'admin@rentalx.com', '${password}', true, 'now()', 'ABCD')
    `
  );

  await connection.close();
}

create().then(() => console.log("User Admin Created"));
