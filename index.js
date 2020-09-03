const Fs = require('fs')  
const Path = require('path')  
const Axios = require('axios')
const moment = require("moment")

async function downloadFile (date) {  
  const url = "http://www.portaltransparencia.gov.br/download-de-dados/bolsa-familia-pagamentos/" + date;
  const path = Path.resolve(__dirname, 'files', date + '_BolsaFamilia_Pagamentos.zip')
  const writer = Fs.createWriteStream(path)

  const response = await Axios({
    url,
    method: 'GET',
    responseType: 'stream'
  })

  response.data.pipe(writer)

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}

for (year = 2013; year < moment().year(); year++) {
    for (month = 1; month <= 12; month++) {
        let date = "" + year + (( '0' + month).substr( -2 ));
        console.log(date)
        downloadFile(date)  
    }
}

for (month = 0; month < moment().month(); month++) {
    let date = "" + moment().year() + (( '0' + (month + 1)).substr( -2 ));
    console.log(date)
    downloadFile(date) 
}

// downloadFile()  