import { FC } from 'react'
import { NextPage } from 'next'
import { AppProps } from 'next/app'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: FC
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

// api/imagga.ts
interface Tag {
  confidence: number
  tag: { es: string }
}

interface Result {
  tags: Tag[]
}

interface Status {
  text: string
  type: string
}

export interface ImaggaResponse {
  result: Result
  status: Status
}

// index.tsx
export interface ImageRandom {
  download_url: string
  author: string
  url: string
  // formato
  tags: Tag[]
}
