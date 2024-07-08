# Development
Pasos para levantar la app en desarrollo


1. Levantar la base de datos
```
docker compose up -d
```

2. Crear una copia de el .env.template y renombrarlo a .env
3. Reemplazar las variables de entorno
4. Ejecutar el comando ```npm install``` para reconstruir los módulos de node
5. Ejecutar el comando ```npm run dev``` para ejecutar aplicación en desarrollo
6. Ejecutar estos comandos de Prisma
```
npx prisma migrate dev
npx prisma generate
```
7. Ejecutar el SEED para [crear la base de datos local](localhost:3000/api/seed)


## Nota: Usuario por defecto - admin
__usuario:__  dany338+test1@gmail.com
__password:__ 123456


# Prisma commnads
```
npx prisma init
npx prisma migrate dev
npx prisma generate

```

# Prod

# Stage

#### video spanish
 - [video spanish](https://drive.google.com/file/d/1jke_xs3CJA0n_MCQ303oTV0w4tcQaI7e/view?usp=sharing)

#### video english
 - [video english](https://drive.google.com/file/d/14Zd4RYVaCo_-rXc8uEQvWPEU3Z0LQ7tx/view?usp=sharing)