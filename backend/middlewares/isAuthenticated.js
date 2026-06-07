import jwt from 'jsonwebtoken'

const isAuthenticated = async (req, res, next) => {
    try {
        const cookieToken = req.cookies?.token;
        const authHeader = req.headers.authorization || "";
        const token = cookieToken || (authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "");

        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            });
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY);
        if (!decode || !decode.userId) {
            return res.status(401).json({
                message: "Invalid token",
                success: false
            });
        }

        req.id = decode.userId;
        return next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "User not authenticated",
            success: false
        });
    }
};

export default isAuthenticated;