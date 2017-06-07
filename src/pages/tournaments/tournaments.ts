import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {TeamsPage} from "../teams/teams";
import {HttpService} from "../../app/services/http.service";

@IonicPage()
@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
})
export class TournamentsPage {
  private tournaments: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private httpService: HttpService,
    private loadingController: LoadingController) {}

  ionViewDidLoad() {
    let loader = this.loadingController.create({
      content: "Getting tournaments..."
    });

    loader.present().then(() => {
      this.httpService.getTournaments()
        .then(
          data => {
            this.tournaments = data;
            loader.dismiss();
          }
        )
        .catch(
          err => console.error(err)
        )
    });
  }

  itemTapped(event, tournament) {
    this.navCtrl.push(TeamsPage,tournament);
  }
}
