'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiX, 
  FiCopy, 
  FiShare2, 
  FiFacebook, 
  FiTwitter, 
  FiMail, 
  FiMessageSquare,
  FiCheck
} from 'react-icons/fi'
import { ShareService, ShareData } from '@/lib/share'

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  shareData: ShareData
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, shareData }) => {
  const [copied, setCopied] = useState(false)
  const [isNativeShareSupported] = useState(ShareService.isNativeShareSupported())

  const handleNativeShare = async () => {
    const success = await ShareService.nativeShare(shareData)
    if (success) {
      onClose()
    }
  }

  const handleCopyLink = async () => {
    const success = await ShareService.copyToClipboard(shareData.url)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const shareOptions = [
    {
      id: 'facebook',
      name: 'Facebook',
      icon: <FiFacebook className="text-blue-600" />,
      action: () => ShareService.shareToFacebook(shareData)
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: <FiTwitter className="text-blue-400" />,
      action: () => ShareService.shareToTwitter(shareData)
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: <FiMessageSquare className="text-green-500" />,
      action: () => ShareService.shareToWhatsApp(shareData)
    },
    {
      id: 'telegram',
      name: 'Telegram',
      icon: <FiMessageSquare className="text-blue-500" />,
      action: () => ShareService.shareToTelegram(shareData)
    },
    {
      id: 'zalo',
      name: 'Zalo',
      icon: <FiMessageSquare className="text-blue-600" />,
      action: () => ShareService.shareToZalo(shareData)
    },
    {
      id: 'email',
      name: 'Email',
      icon: <FiMail className="text-gray-600" />,
      action: () => ShareService.shareViaEmail(shareData)
    },
    {
      id: 'sms',
      name: 'SMS',
      icon: <FiMessageSquare className="text-green-600" />,
      action: () => ShareService.shareViaSMS(shareData)
    }
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-xl p-6 max-w-md mx-4 w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-serif font-bold text-primary-800">
                Chia sẻ sản phẩm
              </h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Share Content Preview */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">{shareData.title}</h4>
              <p className="text-sm text-gray-600 mb-2">{shareData.text}</p>
              <p className="text-xs text-gray-500 break-all">{shareData.url}</p>
            </div>

            {/* Native Share Button (Mobile) */}
            {isNativeShareSupported && (
              <button
                onClick={handleNativeShare}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 mb-4"
              >
                <FiShare2 />
                <span>Chia sẻ</span>
              </button>
            )}

            {/* Copy Link Button */}
            <button
              onClick={handleCopyLink}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 mb-6"
            >
              {copied ? <FiCheck className="text-green-600" /> : <FiCopy />}
              <span>{copied ? 'Đã sao chép!' : 'Sao chép liên kết'}</span>
            </button>

            {/* Social Media Options */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Chia sẻ trên:</h4>
              <div className="grid grid-cols-2 gap-3">
                {shareOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      option.action()
                      onClose()
                    }}
                    className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="text-xl">{option.icon}</div>
                    <span className="text-sm font-medium text-gray-700">{option.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                Chia sẻ sản phẩm yêu thích với bạn bè và gia đình
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ShareModal
