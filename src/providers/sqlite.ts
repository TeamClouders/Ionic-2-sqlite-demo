import {Injectable} from '@angular/core';
/*
  Generated class for the Sqlite provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
declare var window : any;
@Injectable()
export class Sqlite {
  public text : string = "";
  public db = null;
  public arr = [];
  constructor() {}
 /**
  * 
  * Open The Datebase
  */
  openDb() {
    this.db = window
      .sqlitePlugin
      .openDatabase({name: 'todo.db', location: 'default'});
    this
      .db
      .transaction((tx) => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS Todo (id integer primary key,todoItem text)');
      }, (e) => {
        console.log('Transtion Error', e);
      }, () => {
        console.log('Populated Datebase OK..');
      })
  }
  /**
   * 
   * @param addItem for adding: function
   */
  addItem(i) {
    return new Promise(resolve => {
      var InsertQuery = "INSERT INTO Todo (todoItem) VALUES (?)";
      this
        .db
        .executeSql(InsertQuery, [i], (r) => {
          console.log('Inserted... Sucess..', i);
          this
            .getRows()
            .then(s => {
              resolve(true)
            });
        }, e => {
          console.log('Inserted Error', e);
          resolve(false);
        })
    })
  }

  //Refresh everytime

  getRows() {
    return new Promise(res => {
      this.arr = [];
      let query = "SELECT * FROM Todo";
      this
        .db
        .executeSql(query, [], rs => {
          if (rs.rows.length > 0) {
            for (var i = 0; i < rs.rows.length; i++) {
              var item = rs
                .rows
                .item(i);
              this
                .arr
                .push(item);
            }
          }
          res(true);
        }, (e) => {
          console.log('Sql Query Error', e);
        });
    })

  }
  //to delete any Item
  del(id) {
    return new Promise(resolve => {
      var query = "DELETE FROM Todo WHERE id=?";
      this
        .db
        .executeSql(query, [id], (s) => {
          console.log('Delete Success...', s);
          this
            .getRows()
            .then(s => {
              resolve(true);
            });
        }, (err) => {
          console.log('Deleting Error', err);
        });
    })

  }
  //to Update any Item
  update(id, txt) {
    return new Promise(res => {
      var query = "UPDATE Todo SET todoItem=?  WHERE id=?";
      this
        .db
        .executeSql(query, [
          txt, id
        ], (s) => {
          console.log('Update Success...', s);
          this
            .getRows()
            .then(s => {
              res(true);
            });
        }, (err) => {
          console.log('Updating Error', err);
        });
    })

  }

}
