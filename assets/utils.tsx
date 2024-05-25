import { App } from 'antd'

/**Otros recursos */
export function validarErrores(error: Record<string, any>) {
  console.error(error)
  switch (error.name) {
    // Error de JavaScript
    case 'ReferenceError':
    case 'TypeError':
    case 'SyntaxError':
      return `Ocurrió un error de JavaScript: ${error.message}`
    // Error de Axios
    case 'AxiosError':
      const statusCode = error?.response?.status
      /**Por existencia de keys */
      switch (true) {
        case !!error.response?.data?.message:
          return error.response?.data?.message
        case !!error.response?.data:
          return error.response?.data
        case !!error?.message:
          return error.message
      }
      /**Por estado */
      switch (statusCode) {
        // Error 400: Bad Request
        case 400:
          return `Ocurrió un error 400 (Bad Request): ${error.message}`
        // Error 401: Unauthorized
        case 401:
          return `Ocurrió un error 401 (Unauthorized): ${error.message}`
        // Error 403: Forbidden
        case 403:
          return `Ocurrió un error 403 (Forbidden): ${error.message}`
        // Error 404: Not Found
        case 404:
          return `Ocurrió un error 404 (Not Found): ${error.message}`
        // Error 500: Internal Server Error
        case 500:
          return `Ocurrió un error 500 (Internal Server Error): ${error.message}`
        // Otro error de Axios
        default:
          return `Ocurrió un error en la petición Axios: ${error.message}`
      }
    default:
      return `Ocurrió un error desconocido: ${error.message}`
  }
}

export const useUtilidades = () => {
  const { ...recursos } = App.useApp()
  return {
    ...recursos,
    setError: (error: unknown) => {
      const content = validarErrores(error as any)
      console.error('error', content)
      recursos.modal.error({ title: 'Proceso fallido', content })
    },
  }
}
