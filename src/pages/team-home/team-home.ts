import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TeamDetailPage} from "../team-detail/team-detail";
import {StandingsPage} from "../standings/standings";
import {MyTeamsPage} from "../my-teams/my-teams";

@IonicPage()
@Component({
  selector: 'page-team-home',
  templateUrl: 'team-home.html',
})
export class TeamHomePage {

  private team: any;
  teamDetailPage = TeamDetailPage;
  standingsPage = StandingsPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.team = this.navParams.data;
  }

  goHome() {
    this.navCtrl.popToRoot();
  }
}
