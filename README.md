# Statistical Methods in Javascript

## Transparent Proxy Routes
This is a simply an exercise in writing a transparent proxy that implements various statistical methods on time series data, where the provided date is ISO 8601 compliant and the value is a floating point number. More specifically, the imagined data is in the below form and the provided endpoints are Normalization, Z-Score, and Linear Combination. These functions are well-solved in Python using its great scientific libraries, but I thought an implementation in Javascript might be a decent challenge. Well, here it is!

```sh
[ {"date": "2014-03-01", "value": 45.555}, {...} ]
```

On that note, in a production environment, I would absolutely favor either a Node web-server networked to a Python codebase for the statistical computation, or a Python web-server framework such as Django or Flask directly bundled with the Python compute. Using Python also provides the advantage of ease of integration into powerful systems such as PySpark, which I believe would be advantageous at scale for this type of system.

### Prerequisites
- [Node.js and npm](https://nodejs.org/en/)
- Data that meets the above form, either stored locally or (ideally) engaged from an API. Search the code for 'FILL IN HERE' to add the data location.

### Installing dependencies

```sh
npm install
```

### Running the app

The entry point for the web server is app.js. To start it up:

```sh
npm start
```

The port is set to 8080 and the app should be accessible upon start-up at the routes specified in the challenge.
