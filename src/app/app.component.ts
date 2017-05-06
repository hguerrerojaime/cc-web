import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 user: Observable<firebase.User>;

 uid:string;
 ammount:number;
 loading:boolean = false;
 showRenew:boolean = false;
 calculatedRate:number;

 constructor(private afAuth: AngularFireAuth,private appService:AppService) {
   this.user = afAuth.authState;
   this.user.subscribe((u) => {
     if (u) {
       this.uid = u.uid;
     }
   });
 }

 login() {
   this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((auth) => {
      let u = auth.user;

      this.appService.getUser(u.uid).then((appUser) => {
        console.log("user found");
        this.uid = u.uid;
      }).catch(() => {
        this.appService.registerUser(u.uid,u.displayName).then((appUser) => {
          console.log("user registered");
          this.uid = u.uid;
        });
      });

   });
 }

 logout() {
   this.afAuth.auth.signOut();
 }

 calculate() {

     this.loading = true;
     this.showRenew = false;

     console.log("calculating rate");

     this.appService.calculateRate(this.uid,this.ammount).then((response) => {
        console.log(response);
        this.calculatedRate = response;
        this.loading = false;
     }).catch(()=> {
        this.showRenew = true;
        this.loading = false;
     });

 }

 renew() {
   this.appService.renew(this.uid).then(() => {
      this.showRenew = false;
      this.loading = false;
      alert("Tu suscripcion se extendio 2 minutos");
   })
 }
}
