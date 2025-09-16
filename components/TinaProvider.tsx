'use client'

interface TinaProviderProps {
  children: React.ReactNode
}

const TinaProvider = ({ children }: TinaProviderProps) => {
  return <>{children}</>
}

export default TinaProvider
