import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get stats from database
    const [
      totalOrders,
      totalRevenue,
      totalCustomers,
      totalMenuItems,
      pendingOrders,
      completedOrders
    ] = await Promise.all([
      prisma.order.count(),
      prisma.order.aggregate({
        _sum: {
          total: true
        }
      }),
      prisma.user.count({
        where: {
          role: 'CUSTOMER'
        }
      }),
      prisma.menuItem.count(),
      prisma.order.count({
        where: {
          status: 'PENDING'
        }
      }),
      prisma.order.count({
        where: {
          status: 'DELIVERED'
        }
      })
    ])

    const stats = {
      totalOrders,
      totalRevenue: totalRevenue._sum.total || 0,
      totalCustomers,
      totalMenuItems,
      pendingOrders,
      completedOrders
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
