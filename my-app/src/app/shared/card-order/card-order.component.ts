import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FirestoreService } from '../../services/firestore.service';


@Component({
  selector: 'app-card-order',
  templateUrl: './card-order.component.html',
  styleUrls: ['./card-order.component.scss']
})
export class CardOrderComponent implements OnInit {
  @Input() orders!: any;

  public dataUser: any;
  roleChef: boolean = false;
  roleWaiter: boolean = false;

  time:any= "00:00";
  runningTime:any = 0;
  timeInterval:any;
  startTime:any;



  constructor(private dataService: DataService, private firestoreService: FirestoreService, private router: Router) { }

  ngOnInit(): void {
    this.dataUser = this.dataService.disparador.getValue();
    this.roleWaiter = this.dataUser.rol == 'waiter' ? true : false;
    this.roleChef = this.dataUser.rol == 'chef' ? true : false;
    console.log("hola");

    if(this.roleChef == true) {
      setTimeout(() => {this.showTime()}, 1);
    } else if(this.roleWaiter == true) {
      setTimeout(() => {this.background()}, 1000);
    }
  }

  showTime() {
    const select = document.getElementById(this.orders.id);
    console.log("select", select);
    let selectValue = (<HTMLInputElement>document.getElementById(this.orders.id)).value;
    if (select !== null) {
      if (selectValue == "Accepted") {
        this.startTime = this.orders.data.startTime;
        this.start(this.startTime)
        select.style.backgroundColor = "#ffbbae";
      } else if (selectValue == "Ready") {
        select.style.backgroundColor = "#cddfa0";
        console.log("este select está listo");
        console.log(this.orders.data.readyTime);
        this.time = this.orders.data.readyTime;
      }
    }
  }

  background(){
    const p = document.getElementsByClassName(".waiterStatus");
    console.log(p);
    /* const pStyle = document.querySelector<HTMLElement>('p');
    if(p !== null && pStyle != null){
      if(p.innerHTML == 'Accepted') {
        pStyle.style.backgroundColor = "#ffbbae";
      } else if (p.innerHTML == 'Ready'){
        pStyle.style.backgroundColor = "#cddfa0";
      }
    } */
  }

  orderStatus($event: any){
    console.log($event.target.value);
    if($event.target.value == 'Accepted'){
      console.log("Accepted the select");
      this.startTime = Date.now();
      this.firestoreService.updateStatus(this.orders.id, $event.target.value, this.startTime);
    } else if ($event.target.value == 'Ready'){
      //! Bloquear el select
      console.log("pausando");
      this.stop();
      this.firestoreService.updateStatus(this.orders.id, $event.target.value, this.startTime);
      this.firestoreService.sendReadyTime(this.orders.id, this.time);
      //this.time = "00:08";
    }
}

  start(orderStartTime: number){
    this.timeInterval = setInterval(() => {
      this.runningTime = Date.now() - orderStartTime;
      this.time = this.calculateTime(this.runningTime);
      //console.log('timestart: ', this.time);
    }, 1000)
  }

  calculateTime(x:any){
    const totalSeconds = Math.floor(x / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);

    const displaySeconds = (totalSeconds % 60).toString().padStart(2, "0");
    const displayMinutes = (totalMinutes & 60).toString().padStart(2, "0");
    const displayHours = totalHours.toString().padStart(2, "0");

    return `${displayHours}:${displayMinutes}:${displaySeconds}`
  }

  stop(): void{
    clearInterval(this.timeInterval);
  }

}

