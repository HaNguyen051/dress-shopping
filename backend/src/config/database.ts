import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('your_db_name', 'your_username', 'your_password', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

export default sequelize;