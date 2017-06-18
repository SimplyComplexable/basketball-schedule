import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import "rxjs";
import {Observable} from "rxjs/Observable";

@Injectable()
export class HttpService {
  private url: string = 'https://elite-schedule-app-i2-9cde1.firebaseio.com';
  currentTournament: any = {};
  tournamentData: any = {};

  constructor(private http: Http) {}

  getTournaments() {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.url}/tournaments.json`)
        .subscribe(
          res => resolve(res.json()),
          err => reject(err)
        )
    });
  }

  getTournamentData(tournamentId, forceRefresh: boolean = false): Observable<any> {
    if (!forceRefresh && this.tournamentData[tournamentId]) {
      this.currentTournament = this.tournamentData[tournamentId];
      return Observable.of(this.currentTournament);
    }
    return this.http.get(`${this.url}/tournaments-data/${tournamentId}.json`)
      .map((response: Response) => {
        this.tournamentData[tournamentId] = response.json();
        this.currentTournament = this.tournamentData[tournamentId];
        return this.currentTournament;
      })
  }

  getCurrentTournament() {
    return this.currentTournament;
  }

  refreshCurrentTournament() {
    return this.getTournamentData(this.currentTournament.tournament.id, true);
  }
}
