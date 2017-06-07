import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {TournamentsPage} from "../tournaments/tournaments";
import {TeamHomePage} from "../team-home/team-home";
import {HttpService} from "../../app/services/http.service";
import {UserSettingsService} from "../../app/services/user-settings.service";

@IonicPage()
@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.html',
})
export class MyTeamsPage {

  favorites = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private httpService: HttpService,
    private loadingController: LoadingController,
    private userSettingsService: UserSettingsService) {}

  ionViewDidEnter() {
    this.favorites = this.userSettingsService.getAllFavorites();
  }

  navigateToTournaments() {
    this.navCtrl.push(TournamentsPage);
  }

  favoriteClicked(event, favorite) {
    let loader = this.loadingController.create({
      content: 'Getting data...',
      dismissOnPageChange: true
    });
    loader.present();
    this.httpService.getTournamentData(favorite.tournamentId)
      .subscribe(
        t => this.navCtrl.push(TeamHomePage, favorite.team)
      );
  }

}
