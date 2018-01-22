import {Component, Input, OnInit} from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ],
})

export class DashboardComponent implements OnInit {
  @Input() heroes: Hero[];
  currentHero: Hero;
  currentStyles: {};
  angle = 0;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => {
        this.heroes = heroes['data']['results'].slice(1, 9);
      });
  }

  gallerySpin(sign: string): void {
    !sign ? this.angle += 45 : this.angle -= 45;
    this.currentStyles = {
      '-webkit-transform': `rotateY(${this.angle}deg)`,
      '-moz-transform:': `rotateY(${this.angle}deg)`,
      'transform:': `rotateY(${this.angle}deg)`
    };
  }

  showInfo(hero): void {
    this.currentHero = hero;
  }
}
