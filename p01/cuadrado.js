            function initWebGL(canvas) {
                var gl;
                try 
                {
                    gl = canvas.getContext("experimental-webgl") || canvas.getContext("experimental-webgl");
                } 
                catch (e)
                {
                    var msg = "Error creating WebGL Context!: " + e.toString();
                    alert(msg);
                    throw Error(msg);
                }

                return gl;        
             }

            function initViewport(gl, canvas)
            {
                gl.viewport(0, 0, canvas.width, canvas.height);
            }

            var projectionMatrix, modelViewMatrix;

            function initMatrices()
            {
        	   // Matriz de transformación para el cuadrado - translación negativa en Z de la cámara
        	   modelViewMatrix = new Float32Array(
        	           [1, 0, 0, 0,
        	            0, 1, 0, 0, 
        	            0, 0, 1, 0, 
        	            0, 0, -3.333, 1]);
               
               // Matriz de proyección (para un campo de visión de 45 grados)
        	   projectionMatrix = new Float32Array(
        	           [2.41421, 0, 0, 0,
        	            0, 2.41421, 0, 0,
        	            0, 0, -1.002002, -1, 
        	            0, 0, -0.2002002, 0]);
        	
            }

            // Creación de los datos de los vértices para el dibujado de un cuadrado
            function createHexagone(gl) {
                var vertexBuffer;
            	vertexBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
                var verts = [
                     0.5,  0.5,  0.0,
                    -0.5,  0.5,  0.0,
                     0.5, -0.5,  0.0,
                    -0.5, -0.5,  0.0
                ];
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
                var square = {buffer:vertexBuffer, vertSize:3, nVerts:4, primtype:gl.TRIANGLE_STRIP};
                return square;
            }

            function createShader(gl, str, type) {
                var shader;
                if (type == "fragment") {
                    shader = gl.createShader(gl.FRAGMENT_SHADER);
                } else if (type == "vertex") {
                    shader = gl.createShader(gl.VERTEX_SHADER);
                } else {
                    return null;
                }
                
                gl.shaderSource(shader, str);
                gl.compileShader(shader);

                if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                    alert(gl.getShaderInfoLog(shader));
                    return null;
                }

                return shader;
            }
            
        	var vertexShaderSource =
        		
        		"    attribute vec3 vertexPos;\n" +
        		"    uniform mat4 modelViewMatrix;\n" +
        		"    uniform mat4 projectionMatrix;\n" +
        		"    void main(void) {\n" +
        		"		// Retorna el valor del vértice transformado y proyectado\n" +
        		"        gl_Position = projectionMatrix * modelViewMatrix * \n" +
        		"            vec4(vertexPos, 1.0);\n" +
        		"    }\n";

        	var fragmentShaderSource = 
        		"    void main(void) {\n" +
        		"    // Retorna el color del pixel: siempre se obtiene blanco\n" +
                "    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n" +
            	"}\n";


            var shaderProgram, shaderVertexPositionAttribute, shaderProjectionMatrixUniform, shaderModelViewMatrixUniform;

            function initShader(gl) {

            	// se carga y compila el fragment shader y vertex shader
                //var fragmentShader = getShader(gl, "fragmentShader");
                //var vertexShader = getShader(gl, "vertexShader");
                var fragmentShader = createShader(gl, fragmentShaderSource, "fragment");
                var vertexShader = createShader(gl, vertexShaderSource, "vertex");

                // se vinculan ambos shaders en el mismo programa
                shaderProgram = gl.createProgram();
                gl.attachShader(shaderProgram, vertexShader);
                gl.attachShader(shaderProgram, fragmentShader);
                gl.linkProgram(shaderProgram);

                // se obtienen los apuntadores a los parametros de shader
                shaderVertexPositionAttribute = gl.getAttribLocation(shaderProgram, "vertexPos");
                gl.enableVertexAttribArray(shaderVertexPositionAttribute);
                
                shaderProjectionMatrixUniform = gl.getUniformLocation(shaderProgram, "projectionMatrix");
                shaderModelViewMatrixUniform = gl.getUniformLocation(shaderProgram, "modelViewMatrix");

                
                if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
                    alert("Could not initialise shaders");
                }
            }

             function draw(gl, obj) {

                 // se limpia el fondo (con negro)
                 gl.clearColor(0.0, 0.0, 0.0, 1.0);
                 gl.clear(gl.COLOR_BUFFER_BIT);

            	 // se establece el buffer de vértices que se dibujará
                 gl.bindBuffer(gl.ARRAY_BUFFER, obj.buffer);

                 // se establecer el programa shader que se usará
                 gl.useProgram(shaderProgram);

         		// se conectan los parámetros del shader: posición de vértices y matrices de proyección/modelo
                 gl.vertexAttribPointer(shaderVertexPositionAttribute, obj.vertSize, gl.FLOAT, false, 0, 0);
                 gl.uniformMatrix4fv(shaderProjectionMatrixUniform, false, projectionMatrix);
                 gl.uniformMatrix4fv(shaderModelViewMatrixUniform, false, modelViewMatrix);

                 // se dibuja el objeto
                 gl.drawArrays(obj.primtype, 0, obj.nVerts);
              }
                  
            function onLoad() {
                var canvas = document.getElementById("webglcanvas");
                var gl = initWebGL(canvas);
                initViewport(gl, canvas);
                initMatrices();
                var square = createHexagone(gl);
                initShader(gl);
                draw(gl, square);
            }