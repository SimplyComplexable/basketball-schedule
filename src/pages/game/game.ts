import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpService} from "../../app/services/http.service";
import {TeamHomePage} from "../team-home/team-home";
import {MapPage} from "../map/map";
declare var window: any;
@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {
  game: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpService: HttpService) {}

  ionViewDidLoad() {
    this.game = this.navParams.data;
    this.game.gameTime = Date.parse(this.game.time);
  }

  teamTapped(teamId) {
    let tournamentData = this.httpService.getCurrentTournament();
    let team = tournamentData.teams.find(t => t.id === teamId);
    this.navCtrl.push(TeamHomePage, team);
  }

  goToDirections() {
    let tournamentData = this.httpService.getCurrentTournament();
    let location = tournamentData.locations[this.game.locationId];
    window.location = `geo:?q=${location.latitude},${location.longitude};u=35`;
  }

  goToMap() {
    this.navCtrl.push(MapPage, this.game);
  }

  isWinner(score1, score2) {
    return Number(score1) > Number(score2);
  }
}
