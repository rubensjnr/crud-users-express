import {Request, Response} from 'express';
import * as usersServices from '../services/usersServices';

export const registerController =  async (req:Request, res:Response)=>{
  try{
    const user: userModel = req.body;
    const data = await usersServices.registerService(user);
    res.status(data.statusCode).json(data.body);
  }
  catch (err){
    res.status(500).json({message: "Erro no servidor, tente novamente!"})
  }
};

export const loginController =  async (req:Request, res:Response)=>{
  try{
    const user: userModel = req.body;
    const data = await usersServices.loginService(user);
    res.status(data.statusCode).json(data.body);
  }
  catch (err){
    res.status(500).json({message: "Erro no servidor, tente novamente!"})
  }
};

export const listUsersController = async (req: Request, res: Response) => {
    try{ 
      const data = await usersServices.listUsersService();
      res.status(data.statusCode).json(data.body);
    }
    catch(err){
      res.status(500).json({message: "Falha no servidor"})
    }
}

export const listUserController = async (req: Request, res: Response) => {
  try{
    const id = req.params.id;
    const data = await usersServices.listUserService(id);
    res.status(data.statusCode).json(data.body);
  }
  catch(err){
    res.status(500).json({message: "Falha no servidor"})
  }
}

export const updateUserController = async (req: Request, res: Response) =>{
  try{
    const id = req.params.id;
    const user = req.body;
    const data = await usersServices.updateUserService(id,user);
    res.status(data.statusCode).json(data.body);
  }
  catch(err){
    res.status(500).json({message: "Falha no servidor"})
  }
}

export const deleteUserController = async (req: Request, res: Response) => {
  try{
    const id = req.params.id;
    const data = await usersServices.deleteUserService(id);
    return res.status(data.statusCode).json(data.body);
  }
  catch(err){
    res.status(500).json({message: "Falha no servidor"})
  }
}