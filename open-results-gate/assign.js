module.exports = {
	extract: (text, option) => {
		let query = text.split('*');
		let params = [];
		for (let i = 0; i < query.length; i++) {
			switch (i) {
				case 0:
					switch (query[i]) {
						case 1:
							params.push('zimsec');
							break;
						case 2:
							params.push('university');
							break;
						case 3:
							params.push('emap');
							break;
						case 4:
							params.push('immigration');
							break;
						case 5:
							params.push('vid');
							break;
						case 6:
							params.push('labs');
							break;
					}
					break;
				case 1:
					switch (query[i]) {
						case 1:
							params.push('HIT');
							break;
						case 2:
							params.push('TelOne');
							break;
						case 3:
							params.push('UZ');
							break;
						default:
							params.push(query[i]);
							break;
					}
					break;
				case 2:
					params.push(query[i]);
					break;
				case 3:
					switch (query[i]) {
						case 1:
							params.push(option === 'zimsec' ? 'A' : 'Yes');
							break;
						case 2:
							params.push(option === 'zimsec' ? 'O' : 'No');
							break;
						default:
							params.push(query[i]);
							break;
					}
					break;
				case 4:
					switch (query[i]) {
						case 1:
							params.push(option === 'zimsec' ? 'november' : 'Yes');
							break;
						case 2:
							params.push(option === 'zimsec' ? 'june' : 'No');
							break;
						default:
							params.push(query[i]);
							break;
					}
					break;
				case 5:
					switch (query[i]) {
						case 1:
							params.push('Yes');
							break;
						case 2:
							params.push('No');
							break;
						default:
							params.push(query[i]);
							break;
					}
					break;
				case 6:
					switch (query[i]) {
						case 1:
							params.push('Yes');
							break;
						case 2:
							params.push('No');
							break;
					}
			}
		}

		console.log(params);
		return params;
	}
};
