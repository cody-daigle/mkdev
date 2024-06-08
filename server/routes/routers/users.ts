import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const users = Router();
const prisma = new PrismaClient();

users.post('/', (req: any, res: any) => {
  const { newUser }: { newUser: { firstName: string; lastName: string } } =
    req.body;
  prisma.user
    .create({ data: newUser })
    .then((user: any) => {
      console.log(user);
      res.sendStatus(201);
    })
    .catch((err: { name: string }) => {
      console.error(err);
      res.sendStatus(500);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
});

users.get('/', (req: any, res: any) => {
  prisma.user
    .findMany()
    .then((users: {}[]) => {
      res.send(users);
    })
    .catch((err: { name: string }) => {
      console.error(err);
      res.sendStatus(500);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
});

// users.post('/', (req: any, res: any) => {
//   const loggedInUser = req.user;

//   // create a new user object
//   const newUser = {
//     firstName: loggedInUser.firstName,
//     lastName: loggedInUser.lastName,
//     email: loggedInUser.email,
//   };

//   prisma.user
//     .create({ data: newUser })
//     .then((user: any) => {
//       console.log(user);
//       res.sendStatus(201);
//     })
//     .catch((err: { name: string }) => {
//       console.error(err);
//       res.sendStatus(500);
//     })
//     .finally(async () => {
//       await prisma.$disconnect();
//     });
// });

export default users;
