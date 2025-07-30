import jwt from "jsonwebtoken";

function checkToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) return res.status(401).json({msg: 'Acesso negado!'})

    try {
        const secret = process.env.SECRET
        const decoded = jwt.verify(token, secret)

        if (decoded) next()
    } catch (error) {
        return res.status(400).json({msg: "Token Inválido"})
    }

}

export default checkToken