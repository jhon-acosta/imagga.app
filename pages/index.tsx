import axios from 'axios'
import { useEffect, useState } from 'react'
import { useUtilidades } from '@/assets/utils'
import { configs } from '@/assets/configs/enviroments'
import { Tag, Card, Image, Button, Divider, Skeleton, Typography } from 'antd'
import { ImageRandom, ImaggaResponse, NextPageWithLayout } from '@/types/global'

const username = configs.IMAGGA_API_KEY
const password = configs.IMAGGA_API_SECRET

const getImagenRandomURL = (page: number) =>
  `https://picsum.photos/v2/list?page=${page}&limit=3`

const getURLImage = (imageURL: string) =>
  'https://api.imagga.com/v2/tags?language=es&image_url=' +
  encodeURIComponent(imageURL)

const Inicio: NextPageWithLayout = () => {
  const { setError } = useUtilidades()

  const [isLaoading, setIsLaoading] = useState(true)
  const [imagenes, setImagenes] = useState<ImageRandom[]>([])

  const getPageRandom = (min: number, max: number) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms))

  const getImagenesRandomCategorizadas = async () => {
    try {
      setIsLaoading(true)
      const data = await axios.get<ImageRandom[]>(
        getImagenRandomURL(getPageRandom(1, 100))
      )
      const response = await Promise.all(
        data.data.map((imagen, index) =>
          delay(index * 1000).then(() =>
            axios.get<ImaggaResponse>(getURLImage(imagen.download_url), {
              headers: {
                Authorization:
                  'Basic ' +
                  Buffer.from(username + ':' + password).toString('base64'),
              },
            })
          )
        )
      )
      const formato = data.data.map((imagen, index) => {
        response[index].data.result.tags.length = 2
        return { ...imagen, tags: response[index].data.result.tags }
      })
      setImagenes(formato)
    } catch (error) {
      setError(error)
    } finally {
      setIsLaoading(false)
    }
  }

  useEffect(() => {
    getImagenesRandomCategorizadas()
  }, [])

  return (
    <div className="flex items-center justify-center !h-screen">
      <div className="grid gap-y-5">
        <Divider orientation="center">
          <Typography.Title level={3}>
            Categorización de imágenes random con Imagga
          </Typography.Title>
        </Divider>

        <div className="flex items-center justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {isLaoading
              ? [1, 2, 3].map((item) => (
                  <Skeleton
                    active
                    round
                    paragraph={{ rows: 17, width: 500 }}
                    key={item}
                  />
                ))
              : imagenes.map((imagen, index) => (
                  <Card
                    title={
                      <Typography.Link href={imagen.url} target="_blank">
                        {imagen.author}
                      </Typography.Link>
                    }
                    key={index}
                    loading={isLaoading}
                    actions={[
                      ...imagen.tags.map((tag, index) => (
                        <Tag color={index === 1 ? 'blue' : 'green'} key={index}>
                          {index + 1}. {tag.tag.es.toUpperCase()} -{' '}
                          {tag.confidence.toFixed(2)}%
                        </Tag>
                      )),
                    ]}
                  >
                    <Image width={500} height={500} src={imagen.download_url} />
                  </Card>
                ))}
          </div>
        </div>

        <div className="grid justify-center items-center">
          <Button
            onClick={getImagenesRandomCategorizadas}
            size="large"
            type="primary"
            loading={isLaoading}
          >
            Obtener imágenes random
          </Button>
          <Typography.Text type="secondary">
            Se obtiene 3 imágenes random para luego ser categorizadas con Imagga
          </Typography.Text>
        </div>
      </div>
    </div>
  )
}

export default Inicio
