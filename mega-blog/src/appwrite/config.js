import conf from "../conf/conf";
import { Client, ID, TablesDB, Storage, Query, Flag } from "appwrite";

export class Service {
  client = new Client();
  tablesDB;
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.tablesDB = new TablesDB(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.tablesDB.createRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        rowId: slug,
        data: {
          title,
          content,
          featuredImage,
          status,
          userId,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status, userId }) {
    try {
      return await this.tablesDB.updateRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        rowId: slug,
        data: {
          title,
          content,
          featuredImage,
          status,
          userId,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  async deletePost(slug) {
    try {
      await this.tablesDB.deleteRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        rowId: slug,
      });
      return true;
    } catch (error) {
      console.error(error);
      // throw new Error("Error Occoer While deleting the post", error.message);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.tablesDB.getRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        rowId: slug,
        transactionId: slug,
      });
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getPosts() {
    try {
      return await this.tablesDB.listRows({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        queries: [Query.equal("status", "active")],
      });
    } catch (error) {
      console.error(error);
    }
  }

  async uploadFile(file) {
    try {
      return await this.storage.createFile({
        bucketId: conf.appwriteBucketId,
        fileId: ID.unique(),
        file,
      });
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile({
        bucketId: conf.appwriteBucketId,
        fileId,
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  getFilePreview(fileId) {
    try {
      return this.storage.getFileView({
        bucketId: conf.appwriteBucketId,
        fileId,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}

const appwriteService = new Service();

export default appwriteService;
