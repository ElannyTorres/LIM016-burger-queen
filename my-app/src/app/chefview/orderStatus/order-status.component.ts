import { createNgModuleType } from '@angular/compiler/src/render3/r3_module_compiler';
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';


@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit {
  public listOrders: any[] = [];
  public dataUser: any;
  public listOrdersDelivered: any[] =[];
  roleChef: boolean = false;
  roleWaiter: boolean = false;

  orders: any [] =[];

  time:any= "00:00:00";
  runningTime:any = 0;
  timeInterval:any;

  id:string = '';

  constructor(private firestoreService: FirestoreService ) {}

  ngOnInit(): void {
    this.getOrder();

  }

  getOrder(){
    this.firestoreService.getOrder().subscribe(data => {
      this.listOrders = [];
      data.forEach((item) => {
        this.listOrders.push({
          id: item.payload.doc.id,
          data: item.payload.doc.data()
        });
      });
      this.sortOrders(this.listOrders);
    })
  }

  sortOrders(arr:any) {
    arr.sort((a:any,b:any) =>{
      const newA = a.data.date[0].monthDateYear.split('/').reverse().join('-')
      const newB = b.data.date[0].monthDateYear.split('/').reverse().join('-');
      if(newA == newB){
        return b.data.date[0].hourMinutes.localeCompare(a.data.date[0].hourMinutes);
      } else {
        return +new Date(newB) - +new Date(newA)
      }
    })
    //console.log(arr)
  }

  filterDelivered(){
    //?El array con todas las ordenes
    // console.log(this.listOrders);
    // console.log(this.listOrders[0].data.status);
    
    //? filtrar las ordenes de solo estado 'delivered'
    this.listOrdersDelivered = this.listOrders.filter(item => item.data.status == 'Delivered');
    console.log(this.listOrdersDelivered);
    this.listOrders = this.listOrdersDelivered;
    
    
  }

}
