export const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '나의 api설명서',
      version: '1.0.0',
    },
  },
  apis: ['./swagger/*.swagger.js'], // files containing annotations as above
};
