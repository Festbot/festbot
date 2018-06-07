const statusPage = function(req, res) {
	const body = [
		`Processor architecture: ${process.arch}`,
		`Platform: ${process.platform}`,
		`Uptime: ${process.uptime()}`,
		`CPU usage (user): ${process.cpuUsage().user}`,
		`CPU usage (system): ${process.cpuUsage().system}`,
		`Memory usage (rss): ${process.memoryUsage().rss}`,
		`Memory usage (heapTotal): ${process.memoryUsage().heapTotal}`,
		`Memory usage (heapUsed): ${process.memoryUsage().heapUsed}`,
		`Memory usage (external): ${process.memoryUsage().external}`
	].join('<br />');

	res.status(200).send(body);
};

module.exports = { statusPage };
