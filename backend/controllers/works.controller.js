const getAllWorksBackend = (req, res) => {
  try {
    let worksBackend = [];
    console.log('------------------- getAllWorksBackend -- step 1 -----------------------');
    console.log(worksBackend);

    // запрос к БД
    database.query(`SELECT * FROM works`,
      (err, results, fields) => {
        console.log('------------------- err ----------------------');
        console.log(err);
        console.log('------------------- results -- ответ от БД ---');
        console.log(results);
        // console.log(fields);// мета-данные полей
        if (err) {
          //возвращаем объект с ошибкой на фронт
          res.status(500).json({ error: `*** ERROR-500 --> getAllWorksBackend (try) : ${err}` })
        } else {
          worksBackend = results.map(w => ({
            id: w.id.toString(),
            work: w.work,
            bgColor: w.bgcolor
          }));
          console.log('------------------- getAllWorksBackend -- step 2 -----------------------');
          console.log(worksBackend);
          //возвращаем обработанный массив на фронт
          res.status(200).json(worksBackend);
        }
      })
  } catch (err) {
    console.log('------------------- error catch getAllWorksBackend -----------------------');
    console.log(err);
    //возвращаем объект с ошибкой на фронт
    res.status(500).json({ error: `*** ERROR-500 --> getAllWorksBackend (catch) : ${err}` })
  }
  // database.end();
}




module.exports = { getAllWorksBackend  }

// module.exports = { getAllWorksBackend, removeWorkBackend, insertWorkBackend, getWorkBackend, updateWorkBackend  }
