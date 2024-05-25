import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Alumno from './Alumno.js';

const Asignatura = sequelize.define('Asignatura', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombreA: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idAlumno: {
        type: DataTypes.INTEGER,
        references: {
            model: Alumno,
            key: 'id'
        }
    }
}, {
    tableName: 'Asignatura',
    timestamps: false
});

Alumno.hasMany(Asignatura, { foreignKey: 'idAlumno' });
Asignatura.belongsTo(Alumno, { foreignKey: 'idAlumno' });

export default Asignatura;