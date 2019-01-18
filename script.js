let startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

let stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => stopwatch.resetTimer());

let saveButton = document.getElementById('save');
saveButton.addEventListener('click', () => stopwatch.saveTime());

let results = document.querySelector('.results');

let clearButton = document.getElementById('clear');
clearButton.addEventListener('click', () => stopwatch.clearTimers());


class Stopwatch {
	constructor(display) {
		this.running = false;
		this.display = display;
		this.reset();
		this.print(this.times);
	}

	reset() {
		this.times = {
			minutes: 0,
			seconds: 0,
			miliseconds: 0
		};
	}

	print() {
		this.display.innerText = this.format(this.times);
	}

	format(times) {
		return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
	}

	start() {
		if  (!this.running) { //czy timer nie jest juz uruchomiony
			this.running = true;
			this.watch = setInterval(() => this.step(), 10); // co 10 ms odpala metode step()
		}
	}

	step() {
		if (!this.running) return;
		this.calculate();
		this.print();
	}

	calculate() {
		this.times.miliseconds += 1;
		if (this.times.miliseconds >= 100) { // step co 10ms dlatego nie 1000
			this.times.seconds += 1;
			this.times.miliseconds =0;
		}
		if (this.times.seconds >= 60) {
			this.times.minutes += 1;
			this.times.seconds = 0;
		}
	}

	stop() {
		this.running = false;
		clearInterval(this.watch);
	}

	resetTimer() {
		this.reset();
		this.print();
	}

	saveTime() {
		if (this.times.minutes === 0 && this.times.seconds === 0 && this.times.miliseconds === 0) return;
		let li = document.createElement("li");
		let currentTime = this.format(this.times);
		li.setAttribute('class', 'list-item');
		li.appendChild(document.createTextNode(currentTime));
		results.appendChild(li);
	}

	clearTimers() {
		let results = document.querySelector('.results');
		while(results.firstChild) results.removeChild(results.firstChild);
	}

}

function pad0(value) {
	let result = value.toString();
	if (result.length < 2) {
		result = '0' + result;
	}
	return result;
}


const stopwatch = new Stopwatch(document.querySelector('.stopwatch'));