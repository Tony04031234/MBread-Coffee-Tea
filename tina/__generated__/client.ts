import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '2b8fc7c7bc3e8c27c12e582e53f2021f97e669f4', queries,  });
export default client;
  