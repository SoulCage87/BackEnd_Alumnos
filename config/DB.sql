-- Active: 1705367913692@@127.0.0.1@5432@alumnos@public
CREATE TABLE alumno(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL
)

INSERT INTO asignatura
( nombreA, idAlumno)
VALUES
( 'Español', 3)

CREATE TABLE asignatura(
    id SERIAL PRIMARY KEY,
    nombreA VARCHAR(50) NOT NULL,
    idAlumno int REFERENCES alumno(id)
)


SELECT  
                       asignatura.nombreA AS asignatura_nombre,
                       alumno.nombre AS alumno_nombre,
                       alumno.apellido AS alumno_apellido
                       FROM 
                       asignatura
                       INNER JOIN 
                       alumno ON asignatura.idAlumno = alumno.id 
                       WHERE alumno.id = 3
