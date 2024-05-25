const obtenerEntornos = () => ({
  IMAGGA_API_KEY: process.env.NEXT_PUBLIC_IMAGGA_API_KEY || '',
  IMAGGA_API_SECRET: process.env.NEXT_PUBLIC_IMAGGA_API_SECRET || '',
})

export const configs = obtenerEntornos()
