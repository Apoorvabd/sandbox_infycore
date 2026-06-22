import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the sandbox API!' });
});

router.post('/echo', (req, res) => {
    const { message } = req.body;
    res.json({ echo: message });
});

export default router;