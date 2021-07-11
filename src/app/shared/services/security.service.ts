import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserI } from 'src/app/shared/model/user';
import { configService } from 'src/app/shared/config/config-service'
import { Observable } from 'rxjs';
import { UserResetI } from '../model/user-reset';
import { TurnI } from '../model/turn';


const url_base = configService.URL_BASE;

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  public entity: string = "user";
  
  constructor(private http: HttpClient) { }

  getSearch(search: String){
    return this.http.get<UserI[]>(`${url_base}/${this.entity}/search/${search}`);
  }

  getAllRecords(): Observable<UserI[]>{
    return this.http.get<UserI[]>(`${configService.URL_BASE}/${this.entity}`);
  }

  updateRecordStatusAndRole(recordId:string, role: number, isActive: boolean){
    console.log( { 'role': role, 'isActive':isActive });
    return this.http.patch(`${configService.URL_BASE}/${this.entity}/${recordId}`, { 'role': role, 'isActive':isActive });
  }

  saveRecord(user: UserI): Observable<UserI>{
      return this.http.post<UserI>(`${configService.URL_BASE}/${this.entity}`, user);
  }

  getRecordByUserName(userName: string){
    return this.http.get<number[]>(`${configService.URL_BASE}/${this.entity}/${userName}`);
  }

  getCount(): Observable<any>{
    return this.http.get<any>(`${configService.URL_BASE}/${this.entity}/count`);
  }

  resetPassword(user: UserResetI): Observable<any>{
    return this.http.post<any>(`${configService.URL_BASE}/${this.entity}/reset-password`, user);
  }

  changePassword(id: string, password: string, newPassword): Observable<any>{
    return this.http.post(`${configService.URL_BASE}/${this.entity}/change-password/${id}`, { password, newPassword});
  }

  login(userName: string, password: string): Observable<any>{
    return this.http.post<any>(`${configService.URL_BASE}/${this.entity}/login`, { userName, password });
  }

  logout() {
    let turn = this.getTurn();
    return this.http.post(`${configService.URL_BASE}/${this.entity}/logout`, turn);
  }


  saveSession(data: any): boolean{
   
      let user: UserI = {
        id: data.user.id,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        userName: data.user.userName,
        role: data.user.role,
        isActive: data.user.isActive
      }

      let turn: TurnI = {
        id: data.turn.id,
        startDate: data.turn.startDate,
        startBalance: data.turn.startBalance,
        boxId: data.turn.boxId,
        userId: data.turn.userId,
        token: data.turn.token
      }

      this.setUser(user);
      this.setTurn(turn);
      this.setToken(turn.token);
      return true;
    
  }

  setUser(user: UserI): void {
    let user_string = JSON.stringify(user);
    localStorage.setItem("currentUser", user_string);
  }

  setToken(token: string): void {
    localStorage.setItem("accessToken", token);
  }

  setTurn(turn: TurnI): void {
    let turn_string = JSON.stringify(turn);
    localStorage.setItem("turn", turn_string);
  }

  getCurrentUser(): UserI {
    let user_string = localStorage.getItem("currentUser");
    if (user_string) {
      let user: UserI = JSON.parse(user_string);
      return user;
    }
  }

  getTurn(): TurnI {
    let turn_string = localStorage.getItem("turn");
    if (turn_string) {
      let turn: TurnI = JSON.parse(turn_string);
      return turn;
    }
  }


}
