const AuthService = require('../../infrastructure/services/AuthService');

const authService = new AuthService();

function authMiddleware(roles = []) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Token não fornecido." });
    }

    const [, token] = authHeader.split(' ');
    const decoded = authService.verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ message: "Token inválido." });
    }

    req.user = { id: decoded.id, role: decoded.role };

    // Se a rota exige roles específicas, verificamos se o usuário a possui
    if (roles.length > 0 && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Acesso negado." });
    }
    
    next();
  };
}

module.exports = authMiddleware;