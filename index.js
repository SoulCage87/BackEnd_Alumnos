import express from 'express'
import sequelize from './config/database.js'
import Alumno from './models/Alumno.js'
import Asignatura from './models/Asignatura.js'

sequelize.sync({ force: false })
    .then(() => {
        console.log('Tablas sincronizadas');
    })
    .catch((error) => {
        console.error('Error al sincronizar las tablas:', error);
    });

const app = express();
const port = 3000

app.use(express.json());


app.get('/alumnos', async (req, res) => {
    try {
        const items = await Alumno.findAll();
        res.status(200).send(items);
    } catch (error) {
        res.status(500).json(error)
    }
})

app.post('/alumnos', async (req, res) => {
    try {
        const item = await Alumno.create(req.body);
        res.status(200).send(item);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.put('/alumnos/:id', async (req, res) => {
    try {
        const item = await Alumno.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send('Item not found');
        }
        await item.update(req.body);
        res.status(200).send(item);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.delete('/alumnos/:id', async (req, res) => {
    try {
        const item = await Alumno.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send('Item not found');
        }
        await item.destroy();
        res.status(200).send('Item deleted');
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/asignatura/:idAlumno', async (req, res) => {
    try {
        const idAlumno = req.params.idAlumno

        const sql = `SELECT  
                       asignatura.id as ID,
                       asignatura.nombreA AS asignatura_nombre,
                       alumno.nombre AS alumno_nombre,
                       alumno.apellido AS alumno_apellido
                       FROM 
                       asignatura
                       INNER JOIN 
                       alumno ON asignatura.idAlumno = alumno.id 
                       WHERE alumno.id = ${idAlumno}`

        const [results, metadata] = await sequelize.query(sql,idAlumno);

        res.json(results);


    } catch (error) {
        res.status(500).send(error)
    }
})

app.post('/asignatura', async (req, res) => {
    try {
        const { nombreA, idAlumno } = req.body;

        const sql = `
            INSERT INTO asignatura (nombreA, idAlumno)
            VALUES (:nombreA, :idAlumno)
        `;

        const [results] = await sequelize.query(sql, {
            replacements: { nombreA, idAlumno },
            type: sequelize.QueryTypes.INSERT
        });

        res.status(201).json({ message: 'Asignatura creada correctamente', results });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.delete('/asignatura/:id', async (req, res) => {
    try {
        const id = req.params.id  
    const item = await Asignatura.findByPk(id)
    if(!item){
      return res.status(404).send('item no found ')
    }
  await item.destroy()
  res.status(200).send('Item deleted');
    } catch (error) {
        res.status(400).send(error.message)
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
