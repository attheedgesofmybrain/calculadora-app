import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public n1: number
  public n2: number
  public r: number

  constructor() {}

  public sum() {
    this.r = this.n1 + this.n2
  }
  public sub() {
    this.r = this.n1 - this.n2
  }
  public mul() {
    this.r = this.n1 * this.n2
  }
  public div() {
    this.r = this.n1 / this.n2
  }
  clean () {
    this.n1 = null
    this.n2 = null
    this.r = null
  }

}
