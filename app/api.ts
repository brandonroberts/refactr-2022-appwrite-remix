import { Appwrite } from 'appwrite';

let appwrite = new Appwrite();
let api = {
  sdk: appwrite,

  provider: (configure = true) => {
    if (configure) {
      api.sdk.setEndpoint('http://localhost/v1');
      api.sdk.setProject('todos');
    }

    return api.sdk;
  },

  login(email: string, password: string) {
    return api.provider().account.createSession(email, password);
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
    api.provider().setJWT(jwt.toString())
  },

  createSession: (email: string, password: string) => {
    return api.provider().account.createSession(email, password);
  },

  deleteCurrentSession: () => {
    return api.provider().account.deleteSession('current');
  },

  createDocument: (
    collectionId: string,
    data: any,
    read: string[],
    write: string[]
  ) => {
    return api
      .provider()
      .database.createDocument(collectionId, 'unique()', data, read, write);
  },

  listDocuments: (collectionId: string) => {
    return api.provider().database.listDocuments(collectionId);
  },

  updateDocument: (
    collectionId: string,
    documentId: string,
    data: any,
    read: string[],
    write: string[]
  ) => {
    return api
      .provider()
      .database.updateDocument(collectionId, documentId, data, read, write);
  },

  deleteDocument: (collectionId: string, documentId: string) => {
    return api.provider().database.deleteDocument(collectionId, documentId);
  },
};

export default api;
