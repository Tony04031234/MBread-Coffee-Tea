// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";
var config_default = defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  // Get this from tina.io
  token: process.env.TINA_TOKEN || "",
  // Get this from tina.io
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "menuItem",
        label: "Menu Items",
        path: "content/menu",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true
          },
          {
            type: "number",
            name: "price",
            label: "Price (VND)",
            required: true
          },
          {
            type: "image",
            name: "image",
            label: "Image",
            required: true
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: [
              { label: "Coffee", value: "coffee" },
              { label: "Tea", value: "tea" },
              { label: "Pastry", value: "pastry" },
              { label: "Special", value: "special" }
            ],
            required: true
          },
          {
            type: "boolean",
            name: "isPopular",
            label: "Is Popular",
            description: "Show this item in the featured section"
          },
          {
            type: "string",
            name: "ingredients",
            label: "Ingredients",
            description: "List of ingredients (optional)",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "allergens",
            label: "Allergens",
            description: "List of allergens (optional)",
            ui: {
              component: "textarea"
            }
          }
        ]
      },
      {
        name: "page",
        label: "Pages",
        path: "content/pages",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "image",
            name: "heroImage",
            label: "Hero Image"
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true
          }
        ]
      },
      {
        name: "heroCarousel",
        label: "Hero Carousel",
        path: "content/carousel",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "subtitle",
            label: "Subtitle"
          },
          {
            type: "image",
            name: "image",
            label: "Background Image",
            required: true
          },
          {
            type: "string",
            name: "buttonText",
            label: "Button Text"
          },
          {
            type: "string",
            name: "buttonLink",
            label: "Button Link"
          },
          {
            type: "boolean",
            name: "isActive",
            label: "Is Active",
            description: "Show this slide in the carousel"
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
