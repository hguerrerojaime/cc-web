import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AppService {

  constructor(private http: Http) {}

  getUser(uid:string) {
    return this.http.get(`http://localhost:3000/user/${uid}`)
      .map(res => res.json())
      .toPromise();
  }

  registerUser(uid:string,name:string) {
    return this.http.post(`http://localhost:3000/user`,{firebase_id:uid,name:name})
      .map(res => res.json())
      .toPromise();
  }

  calculateRate(uid:string,ammount:number) {
    return this.http.post(`http://localhost:3000/calculate`,{firebase_id:uid,ammount:ammount})
      .map(res => res.json())
      .toPromise();
  }

  renew(uid:string) {
    return this.http.put(`http://localhost:3000/user/${uid}/renew`,{})
      .map(res => res.json())
      .toPromise();
  }

}
