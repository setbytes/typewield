export interface FirestoreRepository {
  findDocument(): Promise<any>
  saveDocument(): Promise<any>
  updateDocument(): Promise<any>
  deleteDocument(): Promise<any>
}
