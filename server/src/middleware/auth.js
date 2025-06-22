import jwt from 'jsonwebtoken';
const authMiidleWare = async (req, res, next) => {
    try {

        const token = req.cookies.token;
        if (token) {
            const verify = await jwt.verify(token, process.env.JWT_SECRET);
            req.username = verify.username;
            next();
        }
        else
            res.status(401).json({ error: 'Unauthorized' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
export default authMiidleWare;