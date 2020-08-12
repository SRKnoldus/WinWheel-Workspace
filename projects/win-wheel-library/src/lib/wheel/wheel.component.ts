import { Component, OnInit } from '@angular/core';
import {TimelineMax, TweenMax} from 'gsap';
import Winwheel from 'winwheel';
// declare let Winwheel: any;

@Component({
  selector: 'lib-wheel',
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.css']
})
export class WheelComponent implements OnInit {
  theWheel: any;
  wheelPower = 0;
  wheelSpinning = false;
  winningSegment: string;
  buttonImage = '../assets/images/spin_off.png';

  constructor() { }

  ngOnInit(): void {
    this.theWheel = new Winwheel({
      numSegments: 8,
      outerRadius: 212,
      centerX: 217,
      centerY: 219,
      textFontSize: 28,
      segments:
        [
          {fillStyle: '#eae56f', text: 'Prize 1'},
          {fillStyle: '#89f26e', text: 'Prize 2'},
          {fillStyle: '#7de6ef', text: 'Prize 3'},
          {fillStyle: '#e7706f', text: 'Prize 4'},
          {fillStyle: '#eae56f', text: 'Prize 5'},
          {fillStyle: '#89f26e', text: 'Prize 6'},
          {fillStyle: '#7de6ef', text: 'Prize 7'},
          {fillStyle: '#e7706f', text: 'Prize 8'}
        ],
      animation:
        {
          type: 'spinToStop',
          duration: 5,
          spins: 8,
          callbackFinished: this.alertPrize.bind(this)
        },
      pointerGuide:
        {
          display: true,
          strokeStyle: 'red',
          lineWidth: 3
        }
    });
  }

  powerSelected(powerLevel): void {
    if (this.wheelSpinning === false) {
      document.getElementById('pw1').className = '';
      document.getElementById('pw2').className = '';
      document.getElementById('pw3').className = '';
      if (powerLevel >= 1) {
        document.getElementById('pw1').className = 'pw1';
      }
      if (powerLevel >= 2) {
        document.getElementById('pw2').className = 'pw2';
      }
      if (powerLevel >= 3) {
        document.getElementById('pw3').className = 'pw3';
      }
      this.wheelPower = powerLevel;
      this.buttonImage = '../assets/images/spin_on.png';
      document.getElementById('spin_button').className = 'clickable';
    }
  }

  startSpin(): void {
    if (this.wheelSpinning === false) {
      if (this.wheelPower === 1) {
        this.theWheel.animation.spins = 3;
      } else if (this.wheelPower === 2) {
        this.theWheel.animation.spins = 8;
      } else if (this.wheelPower === 3) {
        this.theWheel.animation.spins = 15;
      }
    }
    this.buttonImage = '../assets/images/spin_off.png';
    document.getElementById('spin_button').className = '';
    this.theWheel.startAnimation(new TweenMax(new TimelineMax()));
    this.wheelSpinning = true;
  }

  resetWheel(): void {
    this.theWheel.stopAnimation(false);
    this.theWheel.rotationAngle = 0;
    this.theWheel.draw();
    document.getElementById('pw1').className = '';
    document.getElementById('pw2').className = '';
    document.getElementById('pw3').className = '';
    this.wheelSpinning = false;
  }

  alertPrize(): void {
    this.winningSegment = this.theWheel.getIndicatedSegment().text;
    alert('You have won ' + this.theWheel.getIndicatedSegment().text);
  }

  getSegment(e): void {
    const clickedSegment = this.theWheel.getSegmentAt(e.clientX, e.clientY);
    console.log('Segment clicked -', clickedSegment);
  }

  calculatePrize(): void {
    const stopAt = (91 + Math.floor((Math.random() * 43)));
    console.log('Stop at angle must lie between 90 and 135 degrees - ', stopAt);
    this.theWheel.animation.stopAngle = stopAt;
    this.startSpin();
  }

}
