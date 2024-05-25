## Imagga.app dockerizada

### Docker

Seguir los siguientes pasos para levantar el servicio WebApp:

```bash
# 1. Ubicado en la raíz del proyecto, ejecutar:
docker build -t imagga.app --build-arg NEXT_PUBLIC_IMAGGA_API_KEY=acc_898eb6dc68c2943 --build-arg NEXT_PUBLIC_IMAGGA_API_SECRET=4bc511002aa829f6ba4a53a5e4a83690 .
```

- `docker build`: Este es el comando principal para construir una imagen de Docker a partir de un conjunto de instrucciones definidas en un archivo Dockerfile.

- `-t`: La opción -t (abreviatura de --tag) se utiliza para etiq uetar la imagen con un nombre específico. En este caso, la imagen será etiquetada como imagga.app.

- `--build-arg NEXT_PUBLIC_IMAGGA_API_KEY=acc_898eb6dc68c2943`: Establece una variable de entorno dentro del contenedor llamada NEXT_PUBLIC_IMAGGA_API_KEY con el valor respectivo.

- `--build-arg NEXT_PUBLIC_IMAGGA_API_SECRET=4bc511002aa829f6ba4a53a5e4a83690`: Establece una variable de entorno dentro del contenedor llamada NEXT_PUBLIC_IMAGGA_API_SECRET con el valor respectivo.

- `.`: El punto (.) indica que el contexto de construcción es el directorio actual. Docker utilizará este directorio para encontrar el Dockerfile y cualquier archivo que se mencione en el Dockerfile.

En la etapa anterior, la imagen ya se encuentra creada.

```bash
# 2. Para levantar un contenedor, ejecutar:
docker run -d -p 3000:3000 --name imagga.app imagga.app
```

- `docker run`: Comando principal para ejecutar un contenedor.

- `-d`: Ejecuta el contenedor en segundo plano (modo desacoplado).

- `-p 3000:3000`: Publica el puerto 3000 del contenedor en el puerto 3000 del host. Esto permite que puedas acceder a la aplicación desde tu máquina local en el puerto 3000.

- `--name imagga.app`: Asigna un nombre al contenedor. En este caso, el contenedor se llamará _imagga.app_.

- `imagga.app`: Especifica la imagen de Docker que se usará para crear el contenedor. Esta debe ser una imagen previamente construida y etiquetada como imagga.app.

### Docker Compose

Se utiliza la siguiente configuración:

```yml
# docker-compose.yml
services:
  imagga.app:
    image: imagga.app
    build:
      context: .
      dockerfile: Dockerfile
      args:
        NEXT_PUBLIC_IMAGGA_API_KEY: acc_898eb6dc68c2943
        NEXT_PUBLIC_IMAGGA_API_SECRET: 4bc511002aa829f6ba4a53a5e4a83690
    ports:
      - '3000:3000'
```

- Se define el nombre del contenedor a ser levantado `imagga.app`
- Se utilizará la imagen `imagga.app`, construida a partir del Dockerfile en el directorio actual.
- Se pasan argumentos de compilación al Dockerfile para definir las variables de entorno `NEXT_PUBLIC_IMAGGA_API_KEY` y `NEXT_PUBLIC_IMAGGA_API_SECRET`.
- El puerto 3000 del contenedor se mapea al puerto 3000 del host para permitir el acceso a la aplicación desde fuera del contenedor.

```bash
# Ejecutar
docker-compose up -d
```

_NOTA_: Cabe destacar que las variables de entorno son de naturaleza confidencial. En este caso, las claves se han adjuntado con fines académicos.
