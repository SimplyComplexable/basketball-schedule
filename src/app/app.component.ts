import { Component, ViewChild } from '@angular/core';
import {Events, LoadingController, Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {TournamentsPage} from "../pages/tournaments/tournaments";
import {MyTeamsPage} from "../pages/my-teams/my-teams";
import {HttpService} from "./services/http.service";
import {UserSettingsService} from "./services/user-settings.service";
import {TeamHomePage} from "../pages/team-home/team-home";

@Component({
  templateUrl: 'app.html',
  providers: [
    HttpService
  ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = MyTeamsPage;
  favoriteTeams: any[] = [];

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private userSettingsService: UserSettingsService,
    private loadingController: LoadingController,
    private httpService: HttpService,
    private events: Events) {
    this.initializeApp();

    // used for an example of ngFor and navigation

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.refreshFavorites();
      this.events.subscribe('favorites:changed',
        () => this.refreshFavorites()
      );
    });
  }

  goHome() {
    this.nav.push(MyTeamsPage);
  }

  goToTournaments() {
    this.nav.push(TournamentsPage);
  }

  goToTeam(team) {
    let loader = this.loadingController.create({
      content: 'Getting data...',
      dismissOnPageChange: true
    });
    loader.present();
    this.httpService.getTournamentData(team.tournamentId)
      .subscribe(
        () => this.nav.push(TeamHomePage, team.team)
      )
  }

  refreshFavorites() {
    this.userSettingsService.getAllFavorites()
      .then(() => this.favoriteTeams = this.userSettingsService.items);
  }
}
