import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-achievments',
  templateUrl: './achievments.page.html',
  styleUrls: ['./achievments.page.scss'],
})
export class AchievmentsPage implements OnInit {
  imageLevel1Blur: string = 'assets/img/achievements/level1_blur.png';
  imageLevel1: string = 'assets/img/achievements/level1.png';
  imageLevel2Blur: string = 'assets/img/achievements/level2_blur.png';
  imageLevel2: string = 'assets/img/achievements/level2.png';
  imageLevel3Blur: string = 'assets/img/achievements/level3_blur.png';
  imageLevel3: string = 'assets/img/achievements/level3.png';
  imageLevel4Blur: string = 'assets/img/achievements/level4_blur.png';
  imageLevel4: string = 'assets/img/achievements/level4.png';
  imageLevel5Blur: string = 'assets/img/achievements/level5_blur.png';
  imageLevel5: string = 'assets/img/achievements/level5.png';
  imageLevel6Blur: string = 'assets/img/achievements/level6_blur.png';
  imageLevel6: string = 'assets/img/achievements/level6.png';
  imageLevel7Blur: string = 'assets/img/achievements/level7_blur.png';
  imageLevel7: string = 'assets/img/achievements/level7.png';
  imageLevel8Blur: string = 'assets/img/achievements/level8_blur.png';
  imageLevel8: string = 'assets/img/achievements/level8.png';

  constructor() { }

  ngOnInit() {
  }

  getPicturePathForLevel(lvl: number){
    if(this.achievementAchived(lvl)){
      switch (lvl){
        case 1:
          return this.imageLevel1;
        case 2:
          return this.imageLevel2;
        case 3:
          return this.imageLevel3;
        case 4:
          return this.imageLevel4;
        case 5:
          return this.imageLevel5;
        case 6:
          return this.imageLevel6;
        case 7:
          return this.imageLevel7;
        case 8:
          return this.imageLevel8;
      }
    }
    switch (lvl){
      case 1:
        return this.imageLevel1Blur;
      case 2:
        return this.imageLevel2Blur;
      case 3:
        return this.imageLevel3Blur;
      case 4:
        return this.imageLevel4Blur;
      case 5:
        return this.imageLevel5Blur;
      case 6:
        return this.imageLevel6Blur;
      case 7:
        return this.imageLevel7Blur;
      case 8:
        return this.imageLevel8Blur;
    }
  }

  achievementAchived(lvl:number){
    //todo
    return false;
  }
}
