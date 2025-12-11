'use client'

import { useRef, useState, useEffect } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { motion } from 'framer-motion'
import { FiSmartphone, FiGlobe, FiDownload } from 'react-icons/fi'

const QRCodeSection = () => {
  const websiteUrl = 'https://www.mbreadcoffeetea.com/'
  const containerRef = useRef<HTMLDivElement>(null)
  const [logoImage, setLogoImage] = useState<HTMLImageElement | null>(null)

  // Preload logo image for download
  useEffect(() => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      setLogoImage(img)
    }
    img.onerror = () => {
      console.warn('Failed to load logo image')
    }
    img.src = '/mbread-logo.jpg'
  }, [])

  const handleDownload = () => {
    try {
      // Find the SVG element within the container
      const svgElement = containerRef.current?.querySelector('svg') as SVGSVGElement
      if (!svgElement) {
        alert('Không tìm thấy mã QR. Vui lòng thử lại.')
        return
      }
      downloadSVGAsPNG(svgElement)
    } catch (error) {
      console.error('Error downloading QR code:', error)
      alert('Có lỗi xảy ra khi tải xuống. Vui lòng thử lại.')
    }
  }

  const downloadSVGAsPNG = (svgElement: SVGSVGElement) => {
    // Get SVG dimensions from attributes or use default
    const width = parseInt(svgElement.getAttribute('width') || '256', 10)
    const height = parseInt(svgElement.getAttribute('height') || '256', 10)

    // Create a higher resolution canvas for better quality
    const scale = 4 // 4x resolution for crisp PNG (1024x1024 output)
    const canvas = document.createElement('canvas')
    canvas.width = width * scale
    canvas.height = height * scale
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Fill white background
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Clone SVG and remove the image element (we'll draw it separately)
    const clonedSvg = svgElement.cloneNode(true) as SVGSVGElement
    
    // Remove image elements from SVG (we'll draw logo separately)
    const imageElements = clonedSvg.querySelectorAll('image')
    imageElements.forEach((imgEl) => imgEl.remove())
    
    // Ensure SVG has proper attributes for rendering
    if (!clonedSvg.getAttribute('xmlns')) {
      clonedSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    }
    clonedSvg.setAttribute('width', width.toString())
    clonedSvg.setAttribute('height', height.toString())

    // Serialize SVG to string (without logo)
    const svgData = new XMLSerializer().serializeToString(clonedSvg)
    
    // Create image from SVG
    const qrImg = new Image()
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const svgUrl = URL.createObjectURL(svgBlob)

    qrImg.onload = () => {
      // Scale context for high resolution
      ctx.scale(scale, scale)
      
      // Draw QR code (without logo) to canvas
      ctx.drawImage(qrImg, 0, 0, width, height)

      // Reset transform for logo drawing
      ctx.setTransform(1, 0, 0, 1, 0, 0)

      // Draw logo on top if available
      if (logoImage) {
        const logoSize = 48 * scale // Match the size used in QRCodeSVG (48px * scale)
        const logoX = (width * scale) / 2 - logoSize / 2
        const logoY = (height * scale) / 2 - logoSize / 2
        
        // Draw logo with white background circle for better visibility
        const logoBgSize = logoSize + 8 // Slightly larger background
        const logoBgX = (width * scale) / 2 - logoBgSize / 2
        const logoBgY = (height * scale) / 2 - logoBgSize / 2
        
        // Draw white circular background
        ctx.fillStyle = '#ffffff'
        ctx.beginPath()
        ctx.arc(
          (width * scale) / 2,
          (height * scale) / 2,
          logoBgSize / 2,
          0,
          2 * Math.PI
        )
        ctx.fill()
        
        // Draw logo
        ctx.drawImage(logoImage, logoX, logoY, logoSize, logoSize)
      }

      // Convert canvas to blob and download
      canvas.toBlob((blob) => {
        if (blob) {
          const downloadUrl = URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = downloadUrl
          link.download = 'mbread-qr-code.png'
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          URL.revokeObjectURL(downloadUrl)
        }
        URL.revokeObjectURL(svgUrl)
      }, 'image/png', 1.0) // Maximum quality
    }

    qrImg.onerror = () => {
      URL.revokeObjectURL(svgUrl)
      alert('Có lỗi xảy ra khi tạo hình ảnh. Vui lòng thử lại.')
    }

    qrImg.src = svgUrl
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="section-padding bg-gradient-to-br from-primary-50 to-cream-50"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full mb-4"
          >
            <FiSmartphone className="text-2xl text-white" />
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-800 mb-4">
            Quét mã QR để truy cập website
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sử dụng camera điện thoại để quét mã QR và truy cập nhanh vào website MBread Coffee & Tea
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          {/* QR Code Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="card p-8 bg-white shadow-xl"
          >
            <div className="flex flex-col items-center">
              {/* QR Code with Logo Space */}
              <div className="relative p-6 bg-white rounded-xl border-4 border-primary-100">
                <div ref={containerRef} data-qr-svg>
                  <QRCodeSVG
                    value={websiteUrl}
                    size={256}
                    level="H"
                    includeMargin={true}
                    fgColor="#1a472a"
                    bgColor="#ffffff"
                    imageSettings={{
                      src: '/mbread-logo.jpg',
                      height: 48,
                      width: 48,
                      excavate: true,
                    }}
                  />
                </div>
              </div>
              
              {/* Website URL */}
              <div className="mt-6 flex items-center gap-2 text-primary-700 mb-4">
                <FiGlobe className="text-lg" />
                <span className="font-medium text-sm md:text-base break-all">
                  {websiteUrl}
                </span>
              </div>

              {/* Download Button */}
              <button
                onClick={handleDownload}
                className="btn-primary flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-200 hover:shadow-lg"
              >
                <FiDownload className="text-lg" />
                <span>Tải xuống QR Code (PNG)</span>
              </button>
            </div>
          </motion.div>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6 max-w-md"
          >
            <div className="card p-6 bg-white/80 backdrop-blur-sm">
              <h3 className="text-xl font-serif font-semibold text-primary-800 mb-4">
                Hướng dẫn sử dụng
              </h3>
              <ol className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    1
                  </span>
                  <span>Mở ứng dụng Camera trên điện thoại của bạn</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    2
                  </span>
                  <span>Đưa camera vào mã QR ở trên</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    3
                  </span>
                  <span>Nhấn vào thông báo hiển thị để mở website</span>
                </li>
              </ol>
            </div>

            {/* Alternative Link */}
            <div className="card p-6 bg-primary-50 border-2 border-primary-200">
              <p className="text-sm text-gray-600 mb-2">
                Hoặc truy cập trực tiếp:
              </p>
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-700 hover:text-primary-800 font-medium text-base break-all underline decoration-2 underline-offset-2 hover:decoration-primary-600 transition-colors"
              >
                {websiteUrl}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default QRCodeSection
