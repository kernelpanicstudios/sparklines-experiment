function renderSparklines(dataStore) {
	d3.selectAll('.d3-sparkline').each(function() {
		var dataSetName = this.attributes['data-src'].value;
		var dataSet = dataStore.retrieve(dataSetName);

		if(dataSet !== false) {
			var x = d3.scale.linear().domain([0, dataSet.length()]).range([0, 45]);
			var y = d3.scale.linear().domain([dataSet.minValue(), dataSet.maxValue()]).range([0, 12]);

			var line = d3.svg.line()
			.x(function(d,i) {
				console.log("x: " + i);
				return x(i);
			})
			.y(function(d) {
				var yint = parseInt(d.Close, 10);

				console.log("y: " + yint);
				return y(yint);
			});

			d3.select(this).select('svg').remove(); // Probably a better way, but this is just a POC.

			d3.select(this).append('svg:svg').attr('width', '100%').attr('height', '100%').append('svg:path').attr('d', line(dataSet.getData()));
		}
	});
}

// Create our DataSet class.
function DataSet() {
    this._data = [];
}

DataSet.prototype.setData = function(data) {
    this._data = data;
    console.log('Number of records: ' + this._data.length);
    console.log('Structure of first object (with examples):');

    var firstObject = this._data[0];

    for(var prop in firstObject) {
        console.log('\t' + prop + "\t\t" + firstObject[prop]);
    }
};

DataSet.prototype.getData = function() {
    return this._data;
};

DataSet.prototype.length = function () {
	return this._data.length;
}

DataSet.prototype.minValue = function() {
    var min = 99999;

    for (var i = 0; i < this._data.length; ++i) {
        var value = parseInt(this._data[i].Close, 10);

        if (value < min) {
            min = value;
        }
    }

    console.log("Min Value: " + min);

    return min;
};

DataSet.prototype.maxValue = function() {
    var max = 0;

    for (var i = 0; i < this._data.length; ++i) {
        var value = parseInt(this._data[i].Close, 10);

        if (value > max) {
            max = value;
        }
    }

    console.log("Max Value: " + max);

    return max;
};

// Create our DataStore class.
function DataStore() {
    this._store = {};
}

DataStore.prototype.add = function(id, data) {
    // Check the instance
	if (!data instanceof DataSet) {
		console.warn('Cannot add non DataSet data to the DataStore!');
		return false;
	}

	this._store[id] = data;

	return true;
};

DataStore.prototype.retrieve = function (id) {
	if (!(id in this._store)) {
		return false;
	}

	return this._store[id];
};

var dataStore = new DataStore(); // Declare our DataStore

d3.json('http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22MSFT%22%20and%20startDate%20%3D%20%222013-08-01%22%20and%20endDate%20%3D%20%222013-08-31%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=', function(error, json) {
	if (error) return console.warn(error);

	var dataSet = new DataSet();
	dataSet.setData(json.query.results.quote);

	dataStore.add('MSFT', dataSet);

	renderSparklines(dataStore);
});

// Get our data
d3.json('http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22AAPL%22%20and%20startDate%20%3D%20%222013-08-01%22%20and%20endDate%20%3D%20%222013-08-31%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=', function(error, json) {
    if (error) return console.warn(error);

	var dataSet = new DataSet();
    dataSet.setData(json.query.results.quote);

	dataStore.add('AAPL', dataSet);

	renderSparklines(dataStore);
});
