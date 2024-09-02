import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req: Request | any, res: Response, next: NextFunction) => {

  const token = req.headers.authorization;
  if(!token){
    return res.status(401).json({message: "Acesso negado ou acesso expirado!"})
  }
  try{
    if(!JWT_SECRET){
      throw new Error("JWT_SECRET não está definido.");
    }
    const decoded = jwt.verify(token.replace('Bearer ',''), JWT_SECRET);

    if (typeof decoded === 'object' && 'id' in decoded) {
      req.userId = decoded.id as string;
    } else {
      throw new Error("Token inválido!");
    }
    next();
  }
  
  catch(err){
    return res.status(401).json({message: "Não autorizado, token invalido!"})
  }
}

export default auth;