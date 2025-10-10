import env from "@/app/env";
import { Client, Account, Storage, Databases, Avatars } from "appwrite-client";
const client = new Client()
.setEndpoint(env.appwrite.endpoint) 
.setProject(env.appwrite.projectId);

const account = new Account(client);
const storage = new Storage(client);
const databases = new Databases(client);
const avatars = new Avatars(client);

export { client, account, storage, databases, avatars };
