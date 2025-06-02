const LoggerMiddleware = (req, res, next) => {
    const timestamp = new Date().toISOString(); //fecha
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl} - IP: ${req.ip}`); //log

    const start = Date.now(); //inicio del tiempo

    res.on('finish', () => { //cuando la respuesta se haya enviado
        const duration = Date.now() - start; //tiempo de duración
        console.log(`[${timestamp}] ${req.method} ${req.originalUrl} - IP: ${req.ip} - Duration: ${duration}ms`); //log con duración
    });

    next(); //llama al siguiente middleware o ruta
}

module.exports = LoggerMiddleware; //exporta el middleware