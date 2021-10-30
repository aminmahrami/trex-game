console.log("__::script_loaded::__");

const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreElement = document.getElementById("score");
const backgroundAudio = document.getElementById("background-audio");
const jumpAudio = document.getElementById("jump-audio");
const gameoverAudio = document.getElementById("gameover-audio");

let score = 0;
scoreElement.innerHTML = `Score: ${score}`;

let interval;
let firstLoad = true;

const jump = () => {
	jumpAudio.play();

	if (firstLoad) {
		backgroundAudio.play();
		cactus.classList.add("cactus-move");
		checkAliveInterval();
		firstLoad = false;
	}

	// Prevent jump, if already jumping
	if (dino.classList.contains("jump")) {
		return;
	}

	dino.classList.add("jump");
	setTimeout(() => dino.classList.remove("jump"), 300);
};

const gameOver = () => {
	cactus.classList.remove("cactus-move");
	cactus.style.left = "50px";
	backgroundAudio.pause();
	gameoverAudio.play();

	clearInterval(interval);

	setTimeout(() => {
		const shouldRestart = confirm("Gameover, restart?");
		if (shouldRestart) {
			restart();
		}
	}, 500);
};

const isAlive = () => {
	const dinoY = parseInt(
		window.getComputedStyle(dino).getPropertyValue("top")
	);
	const cactusX = parseInt(
		window.getComputedStyle(cactus).getPropertyValue("left")
	);

	if (cactusX < 40 && cactusX > 0 && dinoY >= 140) {
		return false;
	}

	return true;
};

const increaseScore = () => {
	score = score + 0.3;
	scoreElement.innerHTML = `Score: ${Math.floor(score)}`;
};

const restart = () => {
	cactus.classList.add("cactus-move");
	score = 0;
	checkAliveInterval();
	backgroundAudio.play();
};

document.addEventListener("keydown", () => jump());

const checkAliveInterval = () =>
	(interval = setInterval(
		() => (isAlive() ? increaseScore() : gameOver()),
		10
	));
