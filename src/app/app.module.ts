import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule, NavController} from 'ionic-angular';

import { MyApp } from './app.component';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {MyTeamsPage} from "../pages/my-teams/my-teams";
import {GamePage} from "../pages/game/game";
import {TeamDetailPage} from "../pages/team-detail/team-detail";
import {TeamsPage} from "../pages/teams/teams";
import {TournamentsPage} from "../pages/tournaments/tournaments";
import {TeamHomePage} from "../pages/team-home/team-home";
import {StandingsPage} from "../pages/standings/standings";
import {HttpModule} from "@angular/http";
import {UserSettingsService} from "./services/user-settings.service";

@NgModule({
  declarations: [
    MyApp,
    MyTeamsPage,
    GamePage,
    TeamDetailPage,
    TeamsPage,
    TournamentsPage,
    TeamHomePage,
    StandingsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyTeamsPage,
    GamePage,
    TeamDetailPage,
    TeamsPage,
    TournamentsPage,
    TeamHomePage,
    StandingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserSettingsService
  ]
})
export class AppModule {}