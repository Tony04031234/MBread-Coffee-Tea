import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, password } = await request.json()

    // Validation
    if (!name || !email || !phone || !password) {
      return NextResponse.json(
        { message: 'Vui lòng điền đầy đủ thông tin' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Mật khẩu phải có ít nhất 6 ký tự' },
        { status: 400 }
      )
    }

    // Mock registration - replace with your actual registration logic
    const user = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      role: 'CUSTOMER',
      points: 0,
      createdAt: new Date().toISOString()
    }

    return NextResponse.json(
      { 
        message: 'Đăng ký thành công!',
        user
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { message: 'Đã xảy ra lỗi, vui lòng thử lại' },
      { status: 500 }
    )
  }
}
