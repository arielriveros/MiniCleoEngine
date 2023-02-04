import { Engine } from "./engine";

let engine = new Engine("engine");

// main application the browser runs
window.onload = () => {
    engine.initialize();
}

window.onresize = () => {
    engine.resize();
}
