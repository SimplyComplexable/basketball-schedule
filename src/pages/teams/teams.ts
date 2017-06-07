import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {TeamHomePage} from "../team-home/team-home";
import {HttpService} from "../../app/services/http.service";
import _ from 'lodash';

@IonicPage()
@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {
  private allTeams: any;
  private allTeamDivisions: any;
  private teams = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private httpService: HttpService,
    private loadingController: LoadingController) {}

  ionViewDidLoad() {
    let selectedTournament = this.navParams.data;

    let loader = this.loadingController.create({
      content: 'Getting data..'
    });
    loader.present().then(() => {
      this.httpService.getTournamentData(selectedTournament.id)
        .subscribe(
          data => {
            this.allTeams = data.teams;
            this.allTeamDivisions = _.chain(data.teams)
              .groupBy('division')
              .toPairs()
              .map(item => _.zipObject(['divisionName', 'divisionTeams'], item))
              .value();
            this.teams = this.allTeamDivisions;
            console.log(this.teams);
            loader.dismiss();
          }
        );
    });
  }

  itemTapped($event, team) {
    this.navCtrl.push(TeamHomePage, team);
  }

}
