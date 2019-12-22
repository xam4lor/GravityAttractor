function runSimulator(simulator) {
	let max_v = 0.5;
	let max_p = 8000;

	simulator
		.setEngineConfig((engineConf) => {
			engineConf.runner.UPDATE_FPS = 600;
			engineConf.runner.simulationSpeed = 1;

			engineConf.plotter.scale = {x: 10000, y: 10000, squareByX: true};
			engineConf.plotter.displayGrid = false;
		})
		.setCustomConfig((customConf) => {
			customConf.massDrawSize = Math.pow(10, -21);
			customConf.trackLength  = 50;
			customConf.constants = {
				G: 6.61 * Math.pow(10, -11)
			};
		})
		//.addObjects(Particle, 1, Math.pow(10, 30), true, 0, 0, 0, 0, {r:255, g:0, b:0, a:0.5}, false)
		.addObjects(
			Particle, 100, Math.pow(10, 25), false,
			["_RUN_F", random, -max_p, max_p], ["_RUN_F", random, -max_p, max_p],
			["_RUN_F", random, -max_v, max_v], ["_RUN_F", random, -max_v, max_v],
			["_RUN_F", random, 0, 255], ["_RUN_F", random, 0, 255], ["_RUN_F", random, 0, 255], 1,
			false
		);
}
