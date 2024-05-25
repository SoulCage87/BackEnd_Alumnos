import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";  

const Alumno = sequelize.define('Alumno', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'alumno',
    timestamps: false
});

export default Alumno;