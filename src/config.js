const dev = {
    API_URL: 'https://localhost:5001/api', // URL de tu backend
};

const prod = {
    API_URL: 'https://your-production-url/api', // Cambia esto a la URL de producción cuando despliegues
};

const config = process.env.NODE_ENV === 'development' ? dev : prod;

export default config;