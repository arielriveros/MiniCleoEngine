# **MiniCleo Engine**

MiniCleo is a very small and simple game engine library intended for very small and simple 3D games written in TypeScript. It utilizes the Three.js library for rendering and the Ammo.js library for physics simulation and collision detection.

# Features
* 3D rendering using Three.js on any HTML5 canvas.
* Physics simulation and collision detecton using Ammo.js
* Entity-component based architecture
* _TBD_

# Installation
First, install the engine library using `npm` at the _minicleo_ directory:

~~~
cd ./minicleo   # Position yourself at the minicleo directory
npm install     # Install all the dependencies
npm run build   # Build the library int the build directory
~~~

Then, build a game using the engine library. This library isn't published so it must be symbollically linked to the game dependencies. To do this, position yourself at the game directory and run the following commands:

~~~
cd ./game               # Position yourself at the game directory
npm install             # Install all the dependencies
npm link ../minicleo/   # Symbollically link the engine library
npm run build           # Build the game
~~~

# Development
While developing a game or the engine itself, it is recommended to use ```npm run dev``` to build the library and watch for changes. After that, the game can be run using ```npm run dev``` which will launch a webpack development server the http://localhost:8080/

# Requirements

* Node.js 14.16 or higher
* npm ver 6.14.11 or higher
* Any device that supports WebGL and HTML5 pages.

# Usage

This section will remain empty while features are being developed. For now, please refer to the source code of the examples in the game.

# License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

# Acknowledgments

* [Three.js](https://threejs.org/) - 3D rendering library for the web.
* [Ammo.js](https://github.com/kripken/ammo.js/) - Physics simulation and collision detection library based on the Bullet Physics library.