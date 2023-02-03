import { FirestoreRepository } from '../../core/domain/firestore-protocol'

export class Firestore implements FirestoreRepository {
  saveDocument(): Promise<any> {
    throw new Error('Method not implemented.')
  }

  updateDocument(): Promise<any> {
    throw new Error('Method not implemented.')
  }

  deleteDocument(): Promise<any> {
    throw new Error('Method not implemented.')
  }

  findDocument(): Promise<any> {
    throw new Error('Method not implemented.')
  }
}
