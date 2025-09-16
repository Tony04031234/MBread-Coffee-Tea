'use client'

import { TinaCMS } from 'tinacms'
import { TinaEditProvider } from 'tinacms/dist/edit-state'

interface TinaProviderProps {
  children: React.ReactNode
}

const TinaProvider = ({ children }: TinaProviderProps) => {
  return (
    <TinaEditProvider
      editMode={
        <TinaCMS
          clientId={process.env.NEXT_PUBLIC_TINA_CLIENT_ID}
          branch={process.env.NEXT_PUBLIC_EDIT_BRANCH || 'main'}
          token={process.env.TINA_TOKEN}
        />
      }
    >
      {children}
    </TinaEditProvider>
  )
}

export default TinaProvider
