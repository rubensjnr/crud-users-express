import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import * as usersRepositories from '../repositories/usersRepositories'
import * as httpStatus from '../utils/httpStatusCode';

const JWT_SECRET = process.env.JWT_SECRET;

export const registerService = async (user:userModel) =>{
  const data = await usersRepositories.registerRepository(user)

  if(!data){
    return httpStatus.badRequest({message: "Cadastro Invalido, tente novamente!"});
  } else {
    return httpStatus.created({message: "Usuário registrado com sucesso! ",data});
  }
}

export const loginService = async (userInfo: userModel) => {
  const data = await usersRepositories.loginRepository(userInfo);
  if(!data){
    return await httpStatus.notFound({message: "Usuário não encontrado!"});
  }

  const isMatch = await bcrypt.compare(userInfo.password,data.password);

  if(!isMatch){
    return httpStatus.badRequest({message: "Senha inválida!"});
  }

  if(!JWT_SECRET){
    throw new Error("JWT_SECRET não está definido.");
  }
  const token = jwt.sign({id: data.id}, JWT_SECRET, {
    expiresIn: '2h'
  });
  return httpStatus.ok(token);
}

export const listUsersService = async () =>{
  const data = await usersRepositories.listUsersRepository();
  if(!data){
    return httpStatus.ok({message: "Lista de usuários vazia"})
  }
  else {
    return httpStatus.ok(data);
  }
}

export const listUserService = async (id:string) =>{
    const user = await usersRepositories.listUserRepository(id);

    if(!user){
      return httpStatus.noContent({message: "Usuário não encontrado"})
    }
    else {
      return httpStatus.ok(user);
    }
}

export const updateUserService = async (id:string, body: userModel) => {
  const update = usersRepositories.updateUserRepository(id,body);
  if(!update){
    return httpStatus.noContent({message: "Usuário não encontrado"})
  }
  else {
    return httpStatus.ok({mensage: "Usuário atualizado com sucesso!"});
  }
}

export const deleteUserService = async (id: string) =>{
  const user = usersRepositories.deleteUserRepository(id);
  if(!user){
    return httpStatus.noContent({message: "Usuário não encontrado"})
  } 
  else {
    return httpStatus.ok({mensage: "Usuário deletado com sucesso!"});
  }
}