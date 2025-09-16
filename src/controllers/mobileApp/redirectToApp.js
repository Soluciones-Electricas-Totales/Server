import dotenv from 'dotenv';

const redirectToApp = async (req, res) => {
    dotenv.config();

    try {
        const htmlStyle = `
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    min-height: 100vh;
                    background: linear-gradient(135deg, #256ec7ff, #00112aff);
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    color: white;
                    text-align: center;
                }

                .loader {
                    width: 80px;
                    height: 80px;
                    position: relative;
                    margin-bottom: 30px;
                }

                .loader:before, .loader:after {
                    content: '';
                    border-radius: 50%;
                    position: absolute;
                    inset: 0;
                    box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.3) inset;
                }
                .loader:after {
                    box-shadow: 0 2px 0 #ffffff inset;
                    animation: rotate 2s linear infinite;
                }

                @keyframes rotate {
                    0% {  transform: rotate(0deg) }
                    100% { transform: rotate(360deg) }
                }

                .text {
                    font-size: 24px;
                    font-weight: 500;
                    letter-spacing: 1px;
                    animation: pulse 1.5s ease-in-out infinite;
                }

                @keyframes pulse {
                    0% { opacity: 0.7; }
                    50% { opacity: 1; }
                    100% { opacity: 0.7; }
                }

                .dots:after {
                    content: '';
                    animation: dots 1.5s infinite;
                }

                @keyframes dots {
                    0%, 20% { content: '.'; }
                    40% { content: '..'; }
                    60%, 100% { content: '...'; }
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
            <div class="loader"></div>
            <div class="text">Redirigiendo<span class="dots"></span></div>
            <script>

                function getOS() {
                    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

                    if (/android/i.test(userAgent)) {
                        return "Android";
                    }

                    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
                        return "iOS";
                    }

                    return "unknown";
                }

                const deepLinkUrl = '${process.env.APPLICATION_DEEPLINK}://plans';
                const appStoreUrl = '${process.env.APPLICATION_APPSTORE_URL}';
                const playStoreUrl = '${process.env.APPLICATION_PLAY_STORE_URL}';

                window.location.href = deepLinkUrl;

                setTimeout(function () {

                    // Redirigir a la tienda correspondiente
                    const os = getOS();
                    if (os === 'iOS') {
                        window.location.href = appStoreUrl;
                    } else if (os === 'Android') {
                        window.location.href = playStoreUrl;
                    } else {
                        //statusEl.textContent = "";
                    }
                }, 2000);

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

export default redirectToApp;

