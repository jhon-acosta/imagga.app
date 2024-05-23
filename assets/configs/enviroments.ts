const obtenerEntornos = () => ({
  IMAGGA_API_KEY: process.env.NEXT_PUBLIC_IMAGGA_API_KEY || '',
  IMAGGA_API_SECRET: process.env.NEXT_PUBLIC_IMAGGA_API_SECRET || '',
  HOST_API: process.env.NEXT_PUBLIC_HOST_API || 'http://127.0.0.1:3001',
})

export const configs = obtenerEntornos()
