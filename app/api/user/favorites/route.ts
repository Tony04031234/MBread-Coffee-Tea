import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { FavoritesService } from '@/lib/favorites'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Vui lòng đăng nhập để xem danh sách yêu thích' },
        { status: 401 }
      )
    }

    const favorites = await FavoritesService.getUserFavorites(session.user.id)

    return NextResponse.json({ favorites })
  } catch (error) {
    console.error('Error getting user favorites:', error)
    return NextResponse.json(
      { message: 'Đã xảy ra lỗi, vui lòng thử lại' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Vui lòng đăng nhập để xóa món yêu thích' },
        { status: 401 }
      )
    }

    const { productId } = await request.json()

    if (!productId) {
      return NextResponse.json(
        { message: 'Thiếu thông tin sản phẩm' },
        { status: 400 }
      )
    }

    const success = await FavoritesService.removeFromFavorites(session.user.id, productId)

    if (success) {
      return NextResponse.json({ message: 'Đã xóa khỏi danh sách yêu thích' })
    } else {
      return NextResponse.json(
        { message: 'Không thể xóa món yêu thích' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Error removing favorite:', error)
    return NextResponse.json(
      { message: 'Đã xảy ra lỗi, vui lòng thử lại' },
      { status: 500 }
    )
  }
}
