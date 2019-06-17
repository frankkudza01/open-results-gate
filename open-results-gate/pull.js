// Methods to pull various data from the databases
module.exports = {
	pullResults: (db, data, collection) => {
		const { confirmation, ...other } = data;
		const col = db.collection(collection); // define the results collection.
		col
			.find(...other)
			.then(docs => docs.toArray())
			.catch(error => console.log(error));
	},
	pullWithSwitch: (db, params) => {
		const col = db.collection(params[0]); // define the results collection.
		col
			.findOne({ number: query[i] })
			.then(docs => {
				console.log(docs);
				return docs;
			})
			.catch(error => console.log(error));
	}
};
