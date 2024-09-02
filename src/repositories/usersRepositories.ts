import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const registerRepository = async (user: userModel) => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(user.password, salt);
  const userDB = await prisma.user.create(
    {
      data: {
        name: user.name,
        email: user.email,
        password: hashPassword
      }
    }
  );
  return userDB;
}

export const loginRepository = async (user: userModel) => {
  const userInfo = await prisma.user.findUnique({
    where: {
      email: user.email,
    }
  });
  return userInfo;
}

export const listUsersRepository = async () =>{
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true
    }
  });
  return users;
}

export const listUserRepository = async (id:string) =>{
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      }
    });
    return user;
}

export const updateUserRepository = async(id: string, body: userModel) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    }
  });
  if(!user){
    return false;
  }
  await prisma.user.update({
    where: {   
      id: id,
    },
    data: {
      name: body.name,
      email: body.email,
    }
  });
  return true;
}

export const deleteUserRepository = async (id: string) =>{
  const users = await prisma.user.findUnique({
    where: {
      id: id,
    }
  });
  if(users){
    await prisma.user.delete({
      where: {
        id: id,
      }
    })
    return true;
  } else {
    return false;
  }
}