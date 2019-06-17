const menus = require('./menus');

module.exports = {
	service: option => {
		switch (option) {
			case '1' || 1:
				return 'zimsec';
			case '2' || 2:
				return 'admissions';
			case '3' || 3:
				return 'emap';
			case '4' || 4:
				return 'immigration';
			case '5' || 5:
				return 'vid';
			case '6' || 6:
				return 'labs';
			default:
				return null;
		}
	},
	stepone: option => {
		switch (option) {
			case 'zimsec':
				return menus.zimsec.getCandidate;
			case 'admissions':
				return menus.admission.getUniversity;
			case 'emap':
				return menus.emap.getCandidate;
			case 'immigration':
				return menus.immigration.getNumber;
			case 'vid':
				return menus.vid.getTemporaryLicenseNumber;
			case 'labs':
				return menus.labs.getLab;
			default:
				return null;
		}
	},

	steptwo: option => {
		switch (option) {
			case 'zimsec':
				return menus.zimsec.getCenter;
			case 'admissions':
				return menus.admission.getRef;
			case 'emap':
				return menus.emap.getCenter;
			case 'immigration':
				return menus.immigration.getId;
			case 'vid':
				return menus.vid.getId;
			case 'labs':
				return menus.labs.getTest;
			default:
				return null;
		}
	},

	stepthree: option => {
		switch (option) {
			case 'zimsec':
				return menus.zimsec.getLevel;
			case 'admissions':
				return menus.admission.getId;
			case 'emap':
				return menus.emap.getDob;
			default:
				return null;
		}
	},

	stepfour: option => {
		switch (option) {
			case 'zimsec':
				return menus.zimsec.getSitting;
			case 'emap':
				return menus.emap.getMobile;
			default:
				return null;
		}
	},

	stepfive: option => {
		switch (option) {
			case 'zimsec':
				return menus.zimsec.getYear;
			default:
				return null;
		}
	}
};
