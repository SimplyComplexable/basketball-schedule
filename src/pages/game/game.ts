import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpService} from "../../app/services/http.service";
import {TeamHomePage} from "../team-home/team-home";
import {MapPage} from "../map/map";

/**
 * Generated class for the GamePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
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

  goToDirection() {

  }

  goToMap() {
    this.navCtrl.push(MapPage, this.game);
  }

  isWinner(score1, score2) {
    return Number(score1) > Number(score2);
  }
}
