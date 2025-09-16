import { TinaCMS } from 'tinacms'
import { TinaEditProvider } from 'tinacms/dist/edit-state'

const TinaAdmin = () => {
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
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            TinaCMS Admin
          </h1>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 mb-4">
              Welcome to TinaCMS! You can now edit your content visually.
            </p>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-gray-900">Menu Items</h3>
                <p className="text-sm text-gray-600">
                  Edit your coffee, tea, and pastry items
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold text-gray-900">Pages</h3>
                <p className="text-sm text-gray-600">
                  Manage your website pages and content
                </p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-semibold text-gray-900">Hero Carousel</h3>
                <p className="text-sm text-gray-600">
                  Update your homepage carousel slides
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TinaEditProvider>
  )
}

export default TinaAdmin
