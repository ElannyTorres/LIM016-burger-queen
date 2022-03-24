import { OrderDate, Product } from './../../model/order';
import { Component, OnInit } from '@angular/core';
import { ShoppinngCarService } from 'src/app/services/shoppinng-car.service';
import { faCoffee, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { FirestoreService } from 'src/app/services/firestore.service';
import {GetOrderStatusService} from 'src/app/services/get-order-status.service';
import { Order } from 'src/app/model/order';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent implements OnInit {
  //*Icons
  faCoffee = faCoffee;
  faTrash = faTrashAlt;

  //*Order
  productList:Array<any> = []
  clientName:string = "";
  tableNumber:string = "";
  price:number = 0;
  base: number = 1;
  nuevo:Array<Product> = [];
  orderDate:Array<OrderDate> = [];

  //*Payment
  subTotal:number = 0;
  igv:number = 0;
  total:number = 0;


  constructor(private shoppingCarService: ShoppinngCarService, private firestore: FirestoreService, private getOrderStatusService: GetOrderStatusService) { }

  ngOnInit(): void {
    this.shoppingCarService.disparadorShoppinngCar.subscribe(data => {
      this.productList.push({data, amount: 1});
      console.log(this.productList)
      this.totalPrice();
  });
  }

  changeAmount(base:number, item:any){
    if (item.amount && item.amount+base === 0){
      this.deleteItem(item);
    }else{
      item.amount = item.amount + base
      this.totalPrice();
    }
  }

  deleteItem(item:any){
    const index = this.productList.indexOf(item);
    if(index > -1){
      this.productList.splice(index,1);
      this.totalPrice();
    }
    console.log(this.productList);
    //return this.productList;
  }

  totalPrice() {
    if(this.productList.length === 0){
      this.subTotal = 0;
    } else {
      this.subTotal = this.productList.map((item)=>item.data.data.precio*item.amount)
      .reduce((acc,item) => acc += item);
      this.igv = this.subTotal*18/100;
      this.total = this.subTotal + this.igv;
    }
  }

  sendOrder(){
    const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: 'success',
      title: 'Registered Order'
    })

    this.productList.forEach((product) => {
      this.nuevo.push(new Product(product.amount, product.data.data.description));
    })

    //fechaCreacion: new Date
    //fechaTerminada: new Date
    let dateDay = new Date().toLocaleDateString();
    let hourDay = `${new Date().getHours().toString().padStart(2, "0")}`+":"+`${new Date().getMinutes().toString().padStart(2, "0")}`;

    //*Capturamos la fecha y hora
    this.orderDate.push(new OrderDate(dateDay, hourDay.toString().padStart(2, "0")));

    const orderObj =  new Order(this.clientName, parseInt(this.tableNumber), "New", 0, "00:00", this.nuevo, this.orderDate);

    console.log(orderObj);
    this.firestore.sendOrdeFireStore(orderObj).then(() => {console.log('Orden registrada con éxito!');
    //?Mandando con disparador get-otder-status
    this.getOrderStatusService.disparadorGetOrderStatus.emit({orderSaved: orderObj});
    //Mandar al servicio con un "servicio"
  }).catch(err => {console.log(err)});

    this.clientName = "";
    this.tableNumber = "";
    this.productList = [];
    this.subTotal = 0;
    this.igv = 0;
    this.total = 0;
  }

  cancelOrder(){
    let clean  = () => {
      this.clientName = "";
      this.tableNumber = "";
      this.productList = [];
      this.base = 1;
      this.subTotal = 0;
      this.igv = 0;
      this. total = 0
    }

    Swal.fire({
      icon: 'warning',
      iconColor:'#94d154',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor:'#94d154',
      focusCancel:true,
      title: 'Do you want to cancel the order?',
      text: 'You will lose all registered products!',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({
          text:'Canceled Order!',
          icon: 'success',
          confirmButtonColor:'#94d154'
        }).then(clean)
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })

  }
}
