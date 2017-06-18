import {Injectable} from "@angular/core";
import {Storage} from "@ionic/storage";
import {Events} from "ionic-angular";

@Injectable()
export class UserSettingsService {
  items = [];
  constructor(private storage: Storage, public events: Events) {}

  favoriteTeam(team, tournamentId, tournamentName) {
    let item = { team: team, tournamentId: tournamentId, tournamentName: tournamentName };
    this.storage.set(team.id, JSON.stringify(item))
      .then(() => this.events.publish('favorites:changed'));
  }

  unfavoriteTeam(team) {
    this.storage.remove(team.id)
      .then(() => this.events.publish('favorites:changed'));
  }

  isFavoriteTeam(teamId) {
    return this.storage.get(teamId).then(
      value => !!value
    )
  }

  getAllFavorites() {
    let items = [];
    console.log('goodbye');
    return this.storage.forEach(val => {
      console.log('hello');
      items.push(JSON.parse(val));
    })
      .then(() => {
        this.items = items;
      });
  }
}
