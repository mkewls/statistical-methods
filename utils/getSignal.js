const http = require('http');

/*
   Base API route assumes multiple data sources (different signals) and thus
   uses a <signalID> parameter taken from the proxy endpoints to make the
   API request here. Also I assume response in JSON =>
        [ {"date": "2015-11-27", "value": 54.3 }, {...} ]
        where 'date' is valid ISO 8601, 'value' is float
*/

const getSignal = (signalID) => {
  return new Promise((resolve, reject) => {
    http.get(
      /* FILL IN HERE, e.g., http://example.com/api/data/<signalID> */, baseAPI => {
        let data = '',
            status = baseAPI.statusCode;

        if (status !== 200) {
          reject(new Error(`Failed to retrieve data with status: ${status}`));
        }
        // on success
        baseAPI.setEncoding('utf8');
        baseAPI
          .on('data', (chunk) => {
            data += chunk;
          });
        baseAPI
          .on('end', () => {
            formattedData = JSON.parse(data);
            resolve(formattedData);
          })
          .on('error', err => {
            reject(new Error(`Error: ${err.message}`));
          });
      });
  });
}

module.exports = getSignal;
