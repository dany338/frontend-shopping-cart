import bcryptjs from "bcryptjs";

interface SeedUser {
  email: string;
  password: string;
  name: string;
  roles: ['admin'] | ['user'],
  image?: string;
}

interface SeedData {
  users: SeedUser[];
}

export const initialData: SeedData = {
  users: [
    {
      email: 'dany338+test1@gmail.com',
      name: 'Daniel Gallo',
      password: bcryptjs.hashSync('123456'),
      roles: ['admin'],
      image: '/images/users/avatar.webp'
    },
    {
      email: 'test1@google.com',
      name: 'Test No 1',
      password: bcryptjs.hashSync('123456'),
      roles: ['user'],
      image: '/images/users/trabajador.png'
    },
  ],
}