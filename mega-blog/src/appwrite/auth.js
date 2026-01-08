import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create({
        userId: ID.unique(),
        email,
        password,
        name,
      });

      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw new Error("Error", error);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession({ email, password });
    } catch (error) {
      throw new Error("Invalid credentials", error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      throw new Error("error", error);
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      throw new Error("error", error);
    }
  }
}

const authService = new AuthService();

export default authService;
