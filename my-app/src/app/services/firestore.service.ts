import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  sendOrdeFireStore(order: Order): Promise<DocumentReference<any>> {
    return this.firestore.collection('orders').add(
      {
        clientName: order.clientName,
        table: order.table,
        status: order.status,
        startTime: order.readyTime,
        products: JSON.parse(JSON.stringify(order.products)),
        date: JSON.parse(JSON.stringify(order.date))});
  }

  getOrder() {
      return this.firestore.collection('orders').snapshotChanges();
    }

  updateStatus(id:string, status:string, startTime: number) {
    return this.firestore.collection('orders').doc(id).update({
      status: status,
      startTime : startTime
    })
  }

  sendReadyTime(id:string, readyTime:string) {
    return this.firestore.collection('orders').doc(id).update({
      readyTime: readyTime,
    })
  }

  
  // getUsers() {
  //   return this.firestore.collection('users').snapshotChanges();
  // }

  getUsers(id:any) {
    return this.firestore.collection('users').doc(id).get();
  }

  // async function getUserByEmail(email:string) {
  //   // Make the initial query
  //   const query = await firestore.collection('users').where('email', '==', email).get();
  
  //    if (!query.empty) {
  //     const snapshot = query.docs[0];
  //     const data = snapshot.data();
  //   } else {
  //     // not found
  //   }
  
  // }
  
}

