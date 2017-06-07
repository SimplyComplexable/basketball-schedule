import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpService} from "../../app/services/http.service";
import _ from 'lodash';

/**
 * Generated class for the StandingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-standings',
  templateUrl: 'standings.html',
})
export class StandingsPage {

  standings: any[];
  allStandings: any[];
  team: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private httpService: HttpService) {}

  ionViewDidLoad() {
    this.team = this.navParams.data;
    let tournamentData = this.httpService.getCurrentTournament();
    this.standings = tournamentData.standings;

    this.allStandings = _.chain(this.standings)
      .groupBy('division')
      .toPairs()
      .map(item => _.zipObject(['divisionName', 'divisionStandings'], item))
      .value();
  }

}
