import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';

import {NavController} from 'ionic-angular';
import {Sqlite} from '../../providers/sqlite';
@Component({selector: 'page-home', templateUrl: 'home.html'})
export class HomePage {
  public todos = [];
  public text : any;
  constructor(public navCtrl : NavController, public sqliteService : Sqlite, protected platform : Platform) {
    //First We need to ready the Platform
    this
      .platform
      .ready()
      .then(() => {
        this
          .sqliteService
          .getRows()
          .then(s => {
            this.todos = this.sqliteService.arr;
          });
      })
  }
  //Adding the Function
  add(i) {
    this
      .sqliteService
      .addItem(i)
      .then(s => {
        this.todos = this.sqliteService.arr;
        this.text = '';
      });
  }
  //Deleting function
  delete(i) {
    this
      .sqliteService
      .del(i)
      .then(s => {
        this.todos = this.sqliteService.arr;
      });
  }
  //updating function
  update(id, todo) {
    var prompt = window.prompt('Update', todo);
    this
      .sqliteService
      .update(id, prompt)
      .then(s => {
        this.todos = this.sqliteService.arr;
      });
  }

}
