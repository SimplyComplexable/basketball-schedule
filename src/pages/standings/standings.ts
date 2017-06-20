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
  divisionFilter = 'division';


  constructor(public navCtrl: NavController, public navParams: NavParams, private httpService: HttpService) {}

  ionViewDidLoad() {
    this.team = this.navParams.data;
    let tournamentData = this.httpService.getCurrentTournament();
    this.standings = tournamentData.standings;

    this.allStandings = tournamentData.standings;
    this.filterDivision();
  }

  getHeader(record, recordIndex, records) {
    if (recordIndex === 0 || record.division !== records[recordIndex - 1].division ) {
      return record.division;
    }
    return null;
  }

  filterDivision() {
    if (this.divisionFilter === 'all') {
      this.standings = this.allStandings;
    } else {
      this.standings = _.filter(this.allStandings, s => s.division === this.team.division);
    }
  }

}
