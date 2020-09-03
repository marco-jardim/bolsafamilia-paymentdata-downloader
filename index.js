const bent = require('bent');
const get = bent("http://www.portaltransparencia.gov.br", "buffer", 200, 201, 301, 302);


async function runScraper() {
    let result = await get("/download-de-dados/bolsa-familia-pagamentos/202001");
    console.log(result.byteLength);
}

const run = async () => {
    await runScraper();
}

run();