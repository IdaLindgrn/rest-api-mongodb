require('dotenv').config()
const danceClass = require ("../src/models/DanceClass")
const mongoose = require('mongoose')
// @ts-ignore
const springTerm2023MockData = require('./mockdata/springTerm2023.json')
// @ts-ignore
const fallTermMock2023Data = require('./mockdata/fallTerm2023.json')

const seedDbMockdata = async (connectionString) => {
	let conn
	try {
		mongoose.set('strictQuery', false)
		conn = await mongoose.connect(connectionString)

		// POPULATE DATA ACCOORDING TO YOUR MODELS
		await danceClass.deleteMany();
		await danceClass.create(springTerm2023MockData);
		await danceClass.create(fallTermMock2023Data);
		

		console.log('The database is successfully populated')
	} catch (error) {
		console.error(error)
	} finally {
		if (conn) conn.disconnect()
		process.exit(0)
	}
}

seedDbMockdata(process.env.MONGO_URI)