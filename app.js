const canvas = document.querySelector(".canvas");
const text = document.querySelector(".text");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext("2d");
const frameCount = 364;

const currentFrame = (index) => `./video2/${(index + 1).toString()}.jpg`;
const images = [];
let skate = { frame: 0 };

for (let i = 0; i < frameCount; i++) {
	const img = new Image();
	img.src = currentFrame(i);
	images.push(img);
}

gsap.to(skate, {
	frame: frameCount - 1,
	snap: "frame",
	ease: "none",
	reversed: true,
	scrollTrigger: {
		scrub: true,
		pin: "canvas",
		end: "500%",
	},
	onUpdate: render,
});

gsap.fromTo(
	text,
	{ x: 0, opacity: 0 },
	{
		opacity: 1,

		scrollTrigger: {
			scrub: true,
			// start: "2500",
			// end: "4500",
			start: "40%",
			end: "70%",
		},
		onComplete: () => {
			gsap.to(text, { opacity: 0 });
		},
	}
);

images[0].onload = render;

function render() {
	context.canvas.width = images[0].width;
	context.canvas.height = images[0].height;
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.drawImage(images[skate.frame], 0, 0);
}
