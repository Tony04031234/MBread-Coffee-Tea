import { createClient } from 'tinacms/dist/client'

const client = createClient({
  branch: process.env.NEXT_PUBLIC_EDIT_BRANCH || 'main',
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || '',
  token: process.env.TINA_TOKEN || '',
})

export const getMenuItems = async () => {
  try {
    const menuItems = await client.queries.menuItemConnection()
    return menuItems.data.menuItemConnection.edges.map((edge: any) => ({
      id: edge.node._sys.filename,
      name: edge.node.title,
      description: edge.node.description,
      price: edge.node.price,
      image: edge.node.image,
      category: edge.node.category,
      isPopular: edge.node.isPopular || false,
      ingredients: edge.node.ingredients,
      allergens: edge.node.allergens,
    }))
  } catch (error) {
    console.error('Error fetching menu items:', error)
    return []
  }
}

export const getCarouselSlides = async () => {
  try {
    const slides = await client.queries.heroCarouselConnection()
    return slides.data.heroCarouselConnection.edges.map((edge: any) => ({
      id: edge.node._sys.filename,
      title: edge.node.title,
      subtitle: edge.node.subtitle,
      image: edge.node.image,
      buttonText: edge.node.buttonText,
      buttonLink: edge.node.buttonLink,
      isActive: edge.node.isActive || false,
    }))
  } catch (error) {
    console.error('Error fetching carousel slides:', error)
    return []
  }
}

export const getPageContent = async (filename: string) => {
  try {
    const page = await client.queries.page({ relativePath: `${filename}.mdx` })
    return page.data.page
  } catch (error) {
    console.error('Error fetching page content:', error)
    return null
  }
}
