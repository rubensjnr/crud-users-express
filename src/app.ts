import express from 'express';
import publicRoutes from './routes/public';
import privateRoutes from './routes/private';
import auth from './middlewares/auth';

const createApp = () => {
    const app = express();
    
    app.use(express.json());
    app.use('/', publicRoutes);
    app.use('/', auth, privateRoutes);
    return app;
}
export default createApp;