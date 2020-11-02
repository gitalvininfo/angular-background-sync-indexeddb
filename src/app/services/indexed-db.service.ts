import { Injectable } from '@angular/core';
import { openDB, DBSchema, IDBPDatabase } from 'idb';

@Injectable({
  providedIn: 'root',
})
export class IndexedDBService {
  private db: IDBPDatabase<MyDB>;
  constructor() {
    this.connectToDb();
  }

  async connectToDb() {
    this.db = await openDB<MyDB>('my-db', 1, {
      upgrade(db) {
        db.createObjectStore('user-store', {
          keyPath: "number"
        });
      },
    });
  }

  addUser(name: any) {
    return this.db.add('user-store', name);
  }

  getAllUsers() {
    return this.db.getAll('user-store');
  }

  deleteUser(key: string) {
    return this.db.delete('user-store', key);
  }
}

interface MyDB extends DBSchema {
  'user-store': {
    key: string;
    value: {
      name: string,
      number: any
    };
  };
}
