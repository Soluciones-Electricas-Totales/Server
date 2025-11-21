import dotenv from 'dotenv';

const eliminacionCuenta = async (req, res) => {
    dotenv.config();

    try {
        const htmlStyle = `
           <style>
        .form-container {
            max-width: 400px;
            margin: 50px auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-family: Arial, sans-serif;
        }
        
        .form-group {
            margin-bottom: 15px;
        }
        
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        
        input[type="email"] {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
        }
        
        button {
            background-color: #007bff;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            width: 100%;
        }
        
        button:hover {
            background-color: #0056b3;
        }
        
        .message {
            margin-top: 15px;
            padding: 10px;
            border-radius: 4px;
            display: none;
        }
        
        .success {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        
        .error {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
    </style>
        `

        const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Mi Página</title>
            ${htmlStyle}
        </head>
        <body>
            <div class="form-container">
        <h2>Elimiar cuenta y datos personales</h2>
        <form id="emailForm">
            <div class="form-group">
                <label for="email">Correo electrónico:</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    placeholder="tucorreo@ejemplo.com"
                >
            </div>
            Tenga en cuenta que por seguridad se enviarán las instrucciones a su correo para continuar con este procedimiento
            <hr>
            <button type="submit">Enviar</button>
        </form>
        <div id="message" class="message"></div>
    </div>

    <script>
        document.getElementById('emailForm').addEventListener('submit', function(e) {
            e.preventDefault(); // Evita que el formulario se envíe de forma tradicional
            
            const email = document.getElementById('email').value;
            const messageDiv = document.getElementById('message');
            
            // Validación básica del email
            if (!validateEmail(email)) {
                showMessage('Por favor, ingresa un correo electrónico válido.', 'error');
                return;
            }
            
            // Aquí llamas a tu endpoint
            sendToEndpoint(email);
        });
        
        function validateEmail(email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        }
        
        function showMessage(text, type) {
            const messageDiv = document.getElementById('message');
            messageDiv.textContent = text;
            messageDiv.className = 'message ' + type;
            messageDiv.style.display = 'block';
        }
        
        function sendToEndpoint(email) {
            // REEMPLAZA ESTA URL CON TU ENDPOINT REAL
            const endpointURL = 'https://tu-api.com/api/subscribe';
            
            // Datos a enviar
            const data = {
                email: email,
                timestamp: new Date().toISOString()
            };
            
            // Mostrar mensaje de carga
            showMessage('Enviando...', 'success');
            
            // Llamada al endpoint usando Fetch API
            fetch(endpointURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta del servidor');
                }
                return response.json();
            })
            .then(data => {
                showMessage('¡Revisa tu bandeja de entrada!.', 'success');
                document.getElementById('emailForm').reset(); // Limpiar formulario
            })
            .catch(error => {
                console.error('Error:', error);
                showMessage('Hubo un error al enviar el correo. Por favor, intenta nuevamente.', 'error');
            });
        }
    </script>
        </body>
        </html>
    `;

        res.send(htmlContent)

    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

export default eliminacionCuenta;

