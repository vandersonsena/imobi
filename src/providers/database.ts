import { Injectable } from '@angular/core';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class DatabaseProvider {

  constructor(private sqlite: SQLite) {
    console.log('Hello DatabaseProvider Provider');
  }

  /**
   * Cria um banco caso não exista ou pega um banco existente com o nome no parametro
   */
  public getDB() {
    return this.sqlite.create({
      name: 'imobi.db',
      location: 'default'
    });
  }

  /**
   * Cria a estrutura inicial do banco de dados
   */
  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {

        // Criando as tabelas
        this.createTables(db);

        // Inserindo dados padrão
        //this.insertDefaultItems(db);

      })
      .catch(e => console.log(e));
  }

  /**
   * Criando as tabelas no banco de dados
   * @param db
   */
  private createTables(db: SQLiteObject) {
    // Criando as tabelas
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS form (id integer primary key AUTOINCREMENT NOT NULL, telefone TEXT)']
    ])
      .then(() => console.log('Tabelas criadas'))
      .catch(e => console.error('Erro ao criar as tabelas ' + e));
  }


  public insert(tel: any) {

    return this.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into form (telefone) values (?)';
        let data = [tel];

        return db.executeSql(sql, data)
          .catch((e) => console.log(e));
      })
      .catch((e) =>console.error(e));
  }

  public get() {
    return this.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from form';

        return db.executeSql(sql, [])
          .then((data: any) => {
            return data.rows.length;
          })
          .catch((e) => alert(e.rows.length));
      })
      .catch((e) => console.error(e));
  }

}
