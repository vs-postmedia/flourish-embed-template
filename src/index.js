// LIBS
import 'intersection-observer';
import scrollama from 'scrollama';

// CSS
import normalize from './css/normalize.css';
import postmedia from './css/postmedia.css';
import colours from './css/colors.css';
import fonts from './css/fonts.css';
import css from './css/main.css';


// JS
const init = async () => {
	// instantiate the scrollama
	const scroller = scrollama();
	const iframe = document.querySelector('.scrollyteller .chart > iframe');

	// setup the instance, pass callback functions
	scroller
		.setup({
			offset: 0.75,
			step: '.step',
		})
		.onStepEnter(resp => {
			// { element, index, direction }
			iframe.src = iframe.src.replace(/#slide-.*/, '') + '#slide-' + resp.index;
		})
		.onStepExit(resp => {
			// { element, index, direction }
		});

	// setup resize event
	window.addEventListener("resize", scroller.resize);
};

init();