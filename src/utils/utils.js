export const request = async (url, method = 'GET', data = null) => {
  try {
    const headers = {};
    let body;

    if (data) {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(data);
    }

    const response = await fetch(url, {
      method,
      headers,
      body
    })

    return await response.json()

  } catch (error) {
    const message = `ALERT! Function "request" (utils.js) : Request error url=${url} method=${method} : ${error.message}`
    console.log(message);
    throw Error({ message })
  }
}

export const formatDate = (date) => `${date.slice(6)}.${date.slice(4,6)}.${date.slice(0,4)}`;

export const formatDateRevers = (date) => `${date.slice(6)}${date.slice(3,5)}${date.slice(0,2)}`;

export const convertNewDate = (newDate) => {
  const _dateY = newDate.getFullYear().toString();
  let month = newDate.getMonth() + 1;
  let _dateM = month < 10 ? '0' + month : '' + month;
  let day = newDate.getDate();
  let _dateD = day < 10 ? '0' + day : '' + day;
  return _dateY + _dateM + _dateD;
}

export const convertServerResponse = (chartsData) => {
  let resultSetToArray = [];

  for (const elem of chartsData) {
    delete elem.id;
    delete elem.date;
  }

  console.log('chartsData ::: =======================');
  console.log(chartsData);
  console.log('------------------------------------------------------------- Цикл ***');

  let _tempArray = [];
  let _tempSet = new Set();

  for (const elem of chartsData) {

    let _elemArr = Object.entries(elem);
    console.log('Object.entries(elem)');
    console.log(Object.entries(elem));

    for (let i = 0; i < _elemArr.length - 1; i++) {
      let _tempArr = [];
      if (_elemArr[i][0].slice(0,2) === _elemArr[i+1][0].slice(0,2)
        && _elemArr[i][0].slice(2) === 'work'
        && _elemArr[i+1][0].slice(2) === 'color') {
        _tempArr.push(_elemArr[i][1]);
        _tempArr.push(_elemArr[i+1][1]);
        // console.log(`${_elemArr[i][1]} -- ${_elemArr[i+1][1]}`);
        console.log(_tempArr);
        _tempArray.push(_tempArr);
        _tempSet.add(JSON.stringify(_tempArr));
      }
    }
  }

  console.log('_tempArray');
  console.log(_tempArray);
  console.log('_tempSet');
  console.log(_tempSet);
  console.log('------------------------------------------------------------- ***');

  _tempSet.forEach((elem, key, _tempSet) => {
    resultSetToArray.push(JSON.parse(elem))
  })

  console.log('resultSetToArray');
  console.log(resultSetToArray);

  for (const elem of resultSetToArray) {
    elem.push(0);
  }

  console.log('resultSetToArray + 0');
  console.log(resultSetToArray);

  for (const elemA of _tempArray) {
    for (const elemS of resultSetToArray) {
      if (elemA[0] === elemS[0] && elemA[1] === elemS[1]) {
        elemS[2] += 1;
      }
    }
  }

  console.log('resultSetToArray + number');
  console.log(resultSetToArray)

  return resultSetToArray;
}

