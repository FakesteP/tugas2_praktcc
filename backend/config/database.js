import { Sequelize } from 'sequelize';

const db = new Sequelize('note_hafizh', 'root', 'slemanmagelang', {
  host: '34.66.179.32',
  dialect: 'mysql',
})

export default db
