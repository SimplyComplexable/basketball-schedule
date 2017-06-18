import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {HttpService} from "../../app/services/http.service";
import _ from 'lodash';
import {GamePage} from "../game/game";
import moment from 'moment';
import {UserSettingsService} from "../../app/services/user-settings.service";

@IonicPage()
@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {
  private tournamentData: any;
  private games: any;
  private teamStanding: any = {};
  private dateFilter: string;
  private allGames: any[];
  private useDateFilter: boolean;
  private isFollowing: boolean = false;

  team: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private httpService: HttpService,
    private alertController: AlertController,
    private toastController: ToastController,
    private userSettingsService: UserSettingsService) {

    this.team = this.navParams.data;
  }

  ionViewDidLoad() {
    this.team = this.navParams.data;
    this.tournamentData = this.httpService.getCurrentTournament();

    this.games = _.chain(this.tournamentData.games)
      .filter(g => g.team1Id === this.team.id || g.team2Id === this.team.id)
      .map(
        g => {
          let isTeam1 = (g.team1Id === this.team.id);
          let opponentName = isTeam1 ? g.team2 : g.team1;
          let scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score);
          return {
            gameId: g.id,
            opponent: opponentName,
            time: Date.parse(g.time),
            location: g.location,
            locationUrl: g.locationUrl,
            scoreDisplay: scoreDisplay,
            homeAway: (isTeam1 ? 'vs.' : 'at')
          };
        }
      )
      .value();

    this.allGames = this.games;
    this.teamStanding = _.find(this.tournamentData.standings, { 'teamId': this.team.id });

    this.userSettingsService.isFavoriteTeam(this.team.id)
      .then(value => this.isFollowing = value);
  }

  private getScoreDisplay(isTeam1, team1Score, team2Score) {
    if (team1Score && team2Score) {
      let teamScore = (isTeam1 ? team1Score : team2Score);
      let opponentScore = (isTeam1 ? team2Score : team1Score);
      let winIndicator = teamScore > opponentScore ? 'W: ' : 'L: ';
      return winIndicator + teamScore + '-' + opponentScore;
    }
    return "N/A";
  }

  gameClicked(event, game) {
    let sourceGame = this.tournamentData.games.find(g => g.id === game.gameId);
    this.navCtrl.parent.parent.push(GamePage, sourceGame);
  }

  dateChanged() {
    if (this.useDateFilter) {
      this.games = _.filter(this.allGames, g => moment(g.time).isSame(this.dateFilter, 'day'));
    } else {
      this.games = this.allGames;
    }
  }

  getScoreDisplayBadgeClass(game) {
    return game.scoreDisplay.indexOf('W: ') === 0 ? 'primary' : 'danger';
  }

  getScoreWorL(game) {
    return game.scoreDisplay ? game.scoreDisplay[0] : '';
  }

  toggleFollow() {
    if (this.isFollowing) {
      let confirm = this.alertController.create({
        title: 'Unfollow?',
        message: 'Are you sure you want to remove this favorite?',
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              this.isFollowing = false;
              this.userSettingsService.unfavoriteTeam(this.team);

              let toast = this.toastController.create({
                message: 'You have unfollowed this team.',
                duration: 2000,
                position: 'bottom'
              });
              toast.present();
            }
          },
          { text: 'No' }
        ]
      });
      confirm.present();
    } else {
      this.isFollowing = true;
      this.userSettingsService.favoriteTeam(this.team, this.tournamentData.tournament.id, this.tournamentData.tournament.name);
    }
  }

  refreshAll(refresher) {
    this.httpService.refreshCurrentTournament()
      .subscribe(
        () => {
          refresher.complete();
          this.ionViewDidLoad();
        }
      )
  }

}
