import { client } from '../tina/__generated__/client'

export const getMenuItems = async () => {
  try {
    const menuItems = await client.request({
      query: `
        query {
          menuItemConnection {
            edges {
              node {
                _sys {
                  filename
                }
                title
                description
                price
                image
                category
                isPopular
                ingredients
                allergens
              }
            }
          }
        }
      `
    })
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
    const slides = await client.request({
      query: `
        query {
          heroCarouselConnection {
            edges {
              node {
                _sys {
                  filename
                }
                title
                subtitle
                image
                buttonText
                buttonLink
                isActive
              }
            }
          }
        }
      `
    })
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
    const page = await client.request({
      query: `
        query($relativePath: String!) {
          page(relativePath: $relativePath) {
            title
            description
            heroImage
            body
          }
        }
      `,
      variables: { relativePath: `${filename}.mdx` }
    })
    return page.data.page
  } catch (error) {
    console.error('Error fetching page content:', error)
    return null
  }
}
