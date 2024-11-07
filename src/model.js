export function loadModel(gl, shaderProgram, modelData) {
    // Create a buffer for the model's vertex positions.
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(modelData.vertices), gl.STATIC_DRAW);

    // Create an index buffer
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(modelData.indices), gl.STATIC_DRAW);

    // Get attribute locations
    const vertexPosition = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
    const vertexColor = gl.getAttribLocation(shaderProgram, 'aVertexColor');

    // Enable attributes
    gl.enableVertexAttribArray(vertexPosition);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 24, 0);

    gl.enableVertexAttribArray(vertexColor);
    gl.vertexAttribPointer(vertexColor, 3, gl.FLOAT, false, 24, 12);

    return {
        position: positionBuffer,
        indices: indexBuffer,
        vertexCount: modelData.indices.length,
    };
} 