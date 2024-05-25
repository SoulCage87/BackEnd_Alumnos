import { Sequelize } from "sequelize";

//Nombre BD, usuario, clave

const sequelize = new Sequelize('alumnos', 'postgres', 'Apex2077', {
    host: 'localhost',
    dialect: 'postgres',
}) 

export default sequelize