const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>
	res.json({ message: 'Welcome To Open Results. Leverage the power of USSD' })
);

module.exports = router;
