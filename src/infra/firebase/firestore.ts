import { FirestoreRepository } from "../../core/domain/firestore-protocol";

export class Firestore implements FirestoreRepository {
  async saveDocument(): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async updateDocument(): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async deleteDocument(): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async findDocument(): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
