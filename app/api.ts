import { Account, Client, Databases } from 'appwrite';

let appwrite = new Client();
let account = new Account(appwrite);
let databases = new Databases(appwrite);
let api = {
  sdk: appwrite,

  provider: (configure = true) => {
    if (configure) {
      api.sdk.setEndpoint('http://localhost/v1');
      api.sdk.setProject('todos');
    }

    return {
      account,
      database: databases
    };
  },

  login(email: string, password: string) {
    return api.provider().account.createEmailSession(email, password);
  },

  createAccount: (email: string, password: string, name: string) => {
    return api.provider().account.create('unique()', email, password, name);
  },

  getAccount: () => {
    return api.provider().account.get();
  },

  createJWT: async() => {
    return (await api.provider().account.createJWT()).jwt;
  },

  setJWT: (jwt: string) => {
    api.sdk.setJWT(jwt.toString())
  },

  createSession: (email: string, password: string) => {
    return api.provider().account.createEmailSession(email, password);
  },

  deleteCurrentSession: () => {
    return api.provider().account.deleteSession('current');
  },

  createDocument: (
    databaseId: string,
    collectionId: string,
    data: any
  ) => {
    return api
      .provider()
      .database.createDocument(databaseId, collectionId, 'unique()', data);
  },

  listDocuments: (databaseId: string, collectionId: string) => {
    return api.provider().database.listDocuments(databaseId, collectionId);
  },

  updateDocument: (
    databaseId: string,
    collectionId: string,
    documentId: string,
    data: any
  ) => {
    return api
      .provider()
      .database.updateDocument(databaseId, collectionId, documentId, data);
  },

  deleteDocument: (databaseId: string, collectionId: string, documentId: string) => {
    return api.provider().database.deleteDocument(databaseId, collectionId, documentId);
  },
};

export default api;
