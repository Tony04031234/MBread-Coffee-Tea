export interface ShareData {
  title: string
  text: string
  url: string
  image?: string
}

export class ShareService {
  // Check if native sharing is supported
  static isNativeShareSupported(): boolean {
    return typeof navigator !== 'undefined' && 'share' in navigator
  }

  // Native share (mobile devices)
  static async nativeShare(data: ShareData): Promise<boolean> {
    if (!this.isNativeShareSupported()) {
      return false
    }

    try {
      await navigator.share({
        title: data.title,
        text: data.text,
        url: data.url
      })
      return true
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        // User cancelled the share
        return false
      }
      console.error('Native share error:', error)
      return false
    }
  }

  // Copy to clipboard
  static async copyToClipboard(text: string): Promise<boolean> {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
        return true
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea')
        textArea.value = text
        textArea.style.position = 'fixed'
        textArea.style.left = '-999999px'
        textArea.style.top = '-999999px'
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        const result = document.execCommand('copy')
        document.body.removeChild(textArea)
        return result
      }
    } catch (error) {
      console.error('Copy to clipboard error:', error)
      return false
    }
  }

  // Share to Facebook
  static shareToFacebook(data: ShareData): void {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(data.url)}`
    this.openShareWindow(url, 'Facebook Share')
  }

  // Share to Twitter
  static shareToTwitter(data: ShareData): void {
    const text = `${data.text} ${data.url}`
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
    this.openShareWindow(url, 'Twitter Share')
  }

  // Share to WhatsApp
  static shareToWhatsApp(data: ShareData): void {
    const text = `${data.text} ${data.url}`
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`
    this.openShareWindow(url, 'WhatsApp Share')
  }

  // Share to Telegram
  static shareToTelegram(data: ShareData): void {
    const text = `${data.text} ${data.url}`
    const url = `https://t.me/share/url?url=${encodeURIComponent(data.url)}&text=${encodeURIComponent(data.text)}`
    this.openShareWindow(url, 'Telegram Share')
  }

  // Share to Zalo
  static shareToZalo(data: ShareData): void {
    const text = `${data.text} ${data.url}`
    const url = `https://zalo.me/pc?url=${encodeURIComponent(data.url)}&text=${encodeURIComponent(data.text)}`
    this.openShareWindow(url, 'Zalo Share')
  }

  // Share via Email
  static shareViaEmail(data: ShareData): void {
    const subject = encodeURIComponent(data.title)
    const body = encodeURIComponent(`${data.text}\n\n${data.url}`)
    const url = `mailto:?subject=${subject}&body=${body}`
    window.location.href = url
  }

  // Share via SMS
  static shareViaSMS(data: ShareData): void {
    const text = `${data.text} ${data.url}`
    const url = `sms:?body=${encodeURIComponent(text)}`
    window.location.href = url
  }

  // Open share window
  private static openShareWindow(url: string, title: string): void {
    const width = 600
    const height = 400
    const left = (window.screen.width - width) / 2
    const top = (window.screen.height - height) / 2
    
    window.open(
      url,
      title,
      `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
    )
  }

  // Generate share text for product
  static generateProductShareText(productName: string, productDescription: string, productUrl: string): ShareData {
    return {
      title: `${productName} - MBread Coffee & Tea`,
      text: `Khám phá "${productName}" tại MBread Coffee & Tea!\n\n${productDescription}\n\nĐặt món ngay tại:`,
      url: productUrl
    }
  }
}
