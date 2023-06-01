import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  public likedGames: string[] = [];
  constructor() {
    this.likedGames = this.getLikedGames();
  }
  getLikedGames(): string[] {
    const likedGames = localStorage.getItem('likedGames');
    return JSON.parse(likedGames || '[]');
  }

  clearLikedGames() {
    this.likedGames = [];
    localStorage.removeItem('likedGames');
  }

  removeLikedGame(game: string) {
    const likedGames = this.getLikedGames();
    const index = likedGames.indexOf(game);
    if (index > -1) {
      likedGames.splice(index, 1);
    }
    localStorage.setItem('likedGames', JSON.stringify(likedGames));
    this.likedGames = likedGames;
  }
}
