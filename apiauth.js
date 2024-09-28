import express from 'express'
import mongoose from 'mongoose';
import authMiddleware from './service.js';
import router from './src/routes/index.js';
import { getToken } from './utils.js';
const app = express();
 


// Set up multer with storage configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.set('strictPopulate', false);
mongoose.connect(
    'mongodb+srv://ritikkumar99590:ritikkumar@ritik.uxlfy6t.mongodb.net/mydatabaseauth',
    {
        'useNewUrlParser': true,
        'useUnifiedTopology': true
    }
).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});

app.use('/api',router)
 
app.listen(27017, () => {
    console.log('Server running on port 2000');
});




