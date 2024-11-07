import { handleInput } from './input.js';
import { initializeFrameBuffer, renderFrame } from './frameBuffer.js';
import { loadShaders } from './shaders/vertex.glsl';
import { loadFragmentShaders } from './shaders/fragment.glsl';
import { loadModel } from './model.js';
import { loadTexture } from './texture.js';

// Initialize WebGL context
const canvas = document.getElementById('gameCanvas');
const gl = canvas.getContext('webgl');

if (!gl) {
    alert('WebGL not supported');
}

// Load shaders
async function initShaders() {
    const vertexShaderSource = await fetch('/src/shaders/vertex.glsl').then(res => res.text());
    const fragmentShaderSource = await fetch('/src/shaders/fragment.glsl').then(res => res.text());

    const vertexShader = loadShaders(gl, vertexShaderSource);
    const fragmentShader = loadFragmentShaders(gl, fragmentShaderSource);

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert('Unable to initialize the shader program.');
        return null;
    }

    gl.useProgram(shaderProgram);
    return shaderProgram;
}

// Initialize textures
async function initTextures() {
    const paddleTexture = await loadTexture(gl, '/assets/textures/paddle.png');
    return { paddleTexture };
}

// Initialize models
function initModels(shaderProgram) {
    const paddleModel = loadModel(gl, shaderProgram, {
        // Define paddle model vertices and attributes
        vertices: [
            // Positions        // Colors
             0.5,  0.5, 0.0,     1.0, 0.0, 0.0,
            -0.5,  0.5, 0.0,     0.0, 1.0, 0.0,
            -0.5, -0.5, 0.0,     0.0, 0.0, 1.0,
             0.5, -0.5, 0.0,     1.0, 1.0, 0.0,
        ],
        indices: [
            0, 1, 2,
            0, 2, 3,
        ],
    });

    return { paddleModel };
}

// Initialize frame buffer
function init() {
    initializeFrameBuffer(gl);
}

async function start() {
    const shaderProgram = await initShaders();
    const textures = await initTextures();
    const models = initModels(shaderProgram);
    init();

    // Game loop
    function gameLoop() {
        handleInput();
        renderFrame(gl, shaderProgram, models, textures);
        requestAnimationFrame(gameLoop);
    }

    gameLoop();
}

start(); 