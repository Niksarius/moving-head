import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable";
import * as $ from 'jquery';

@Component({
  selector: 'moving-head',
  templateUrl: './moving-head.component.html',
  styleUrls: ['./moving-head.component.css']
})
export class MovingHeadComponent implements OnInit {
  auchVar = true;
  hahaVar = true;
  counter = 0;
  failCounter = 0;
  boomHidden = true;
  private subscription: Subscription;
  private hahaSubscription: Subscription;
  private boomSubscription: Subscription;
  speed = 1000;

  ngOnInit() {
    this.animateDiv();
  }

  onFailClick() {
    if (!this.boomHidden) {
      return;
    }
    this.hahaVar = false;
    this.failCounter++;
    let timer = TimerObservable.create(1000);
    this.hahaSubscription = timer.subscribe(t => {
      this.hahaVar = true;
      this.hahaSubscription.unsubscribe();
    });
  }

  onClick() {
    if (!this.boomHidden) {
      return;
    }
    this.counter++;
    if (this.counter % 10 === 0) {
      this.boom();
    } else {
      this.auchVar = false;
      this.hahaVar = true;
      let timer = TimerObservable.create(1000);
      this.subscription = timer.subscribe(t => {
        this.auchVar = true;
        this.subscription.unsubscribe();
      });
    }
  }

  boom() {
    if (this.speed - 200 > 50) {
      this.speed = this.speed - 200;
    } else {
      this.speed = 50;
    }
    this.boomHidden = false;
    let timer = TimerObservable.create(3000);
    this.boomSubscription = timer.subscribe(t => {
      this.boomHidden = true;
      this.boomSubscription.unsubscribe();
    });
  }

  makeNewPosition() {

    // Get viewport dimensions (remove the dimension of the div)
    var h = document.documentElement.clientHeight - 230;
    var w = document.documentElement.clientWidth - 150;

    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);

    return [nh, nw];
  }

  animateDiv() {
    let me = this;
    var newq = this.makeNewPosition();
    $('.main').animate({ top: newq[0], left: newq[1] }, this.speed, function () {
      me.animateDiv();
    });
  }
}
