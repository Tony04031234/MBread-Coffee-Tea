#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

console.log('🚀 Initializing TinaCMS for MBread Coffee & Tea...')

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local')
if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env.local file...')
  const envExample = fs.readFileSync(path.join(process.cwd(), 'env.example'), 'utf8')
  fs.writeFileSync(envPath, envExample)
  console.log('✅ .env.local created from env.example')
  console.log('⚠️  Please update the TinaCMS environment variables in .env.local')
} else {
  console.log('✅ .env.local already exists')
}

// Check if content directories exist
const contentDirs = ['content/menu', 'content/pages', 'content/carousel', 'public/uploads']
contentDirs.forEach(dir => {
  const dirPath = path.join(process.cwd(), dir)
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
    console.log(`📁 Created directory: ${dir}`)
  } else {
    console.log(`✅ Directory exists: ${dir}`)
  }
})

console.log('\n🎉 TinaCMS initialization complete!')
console.log('\nNext steps:')
console.log('1. Set up your TinaCMS Cloud account at https://tina.io/')
console.log('2. Update environment variables in .env.local')
console.log('3. Run: npm run tinacms')
console.log('4. Visit: http://localhost:3000/admin/tina')
console.log('5. Start adding content!')
