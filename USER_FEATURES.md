# User Features & Restrictions Guide

This document outlines the different features available to signed-in users vs non-signed-in users in the MBread Coffee & Tea application.

## 🔐 Authentication Required Features

### **Signed-In Users Can:**

#### 1. **Order Management**
- ✅ Place orders through the cart system
- ✅ View order history (`/orders`)
- ✅ Track order status in real-time
- ✅ View detailed order information
- ✅ Cancel pending orders (if allowed)
- ✅ Save favorite items for quick reordering

#### 2. **Profile Management**
- ✅ View and edit personal profile (`/profile`)
- ✅ Update contact information
- ✅ Manage delivery addresses
- ✅ View loyalty points balance
- ✅ Track account activity

#### 3. **Loyalty Program**
- ✅ Earn points with each purchase
- ✅ View points balance and history
- ✅ Redeem points for rewards
- ✅ Get exclusive member discounts
- ✅ Receive birthday offers

#### 4. **Personalized Experience**
- ✅ Personalized menu recommendations
- ✅ Order history for quick reordering
- ✅ Saved payment methods
- ✅ Delivery address book
- ✅ Order preferences and notes

#### 5. **Admin Features (Admin Users Only)**
- ✅ Access admin dashboard (`/admin`)
- ✅ Manage all orders (`/admin/orders`)
- ✅ Update order statuses
- ✅ View customer information
- ✅ Access sales analytics
- ✅ Manage menu items
- ✅ Handle customer support

### **Non-Signed-In Users Can:**

#### 1. **Basic Browsing**
- ✅ View the homepage
- ✅ Browse the menu (`/menu`)
- ✅ View about page (`/about`)
- ✅ View gallery (`/gallery`)
- ✅ View franchise information (`/franchise`)
- ✅ View contact information (`/contact`)

#### 2. **Guest Ordering**
- ✅ Add items to cart
- ✅ View cart contents
- ✅ Modify cart quantities
- ✅ **Can place orders** (guest checkout)
- ✅ **Fill in contact information**
- ❌ **Cannot track orders** (no account)
- ❌ **No order history**

#### 3. **Authentication Prompts**
- 🔒 Profile links redirect to sign-in
- 🔒 Order history requires authentication
- 🔒 Admin features require authentication

## 🚫 Restrictions for Non-Signed-In Users

### **Cannot Access:**
- Personal profile and settings
- Order history and tracking
- Loyalty points system
- Admin features
- Personalized recommendations
- Saved addresses and payment methods

### **Limited Functionality:**
- Cart is session-based only (lost on page refresh)
- No order tracking capabilities
- No personalized experience
- No loyalty rewards

## 🎯 User Experience Flow

### **For New Visitors:**
1. Browse menu and add items to cart
2. **Option A:** Place order as guest (fill in contact info)
3. **Option B:** Sign up or sign in for enhanced features
4. Complete order with saved information
5. Access full features (if signed in)

### **For Returning Users:**
1. Sign in automatically (if remembered)
2. Access personalized dashboard
3. Quick reorder from history
4. Full order management capabilities
5. Loyalty rewards and points

### **For Admin Users:**
1. Sign in with admin credentials
2. Access admin dashboard
3. Manage orders and customers
4. View analytics and reports
5. Handle customer support

## 🔧 Technical Implementation

### **Authentication Checks:**
```typescript
// Check if user is signed in
const { data: session, status } = useSession()

// Redirect if not authenticated
if (status === 'unauthenticated') {
  router.push('/auth/signin')
  return
}

// Check user role
if (session?.user?.role !== 'ADMIN') {
  // Show limited features
}
```

### **Protected Routes:**
- `/profile` - Requires authentication
- `/orders` - Requires authentication
- `/admin/*` - Requires admin role
- `/ordering` - Requires authentication for checkout

### **Conditional UI Elements:**
- Cart buttons show different text based on auth status
- Navigation menu shows different options
- Order buttons are disabled for non-authenticated users
- Profile dropdown only appears for signed-in users

## 📱 Mobile Experience

### **Signed-In Users:**
- Full mobile cart functionality
- Touch-friendly order management
- Mobile-optimized profile page
- Push notifications for order updates

### **Non-Signed-In Users:**
- Limited mobile cart (view only)
- Prominent sign-in prompts
- Mobile-optimized authentication flow
- Clear call-to-action buttons

## 🎨 UI/UX Considerations

### **Visual Indicators:**
- Different button styles for authenticated vs non-authenticated states
- Clear messaging about what requires authentication
- Smooth transitions between states
- Consistent branding across all user types

### **Accessibility:**
- Screen reader friendly authentication prompts
- Keyboard navigation for all features
- High contrast mode support
- Clear error messages and validation

## 🔄 Future Enhancements

### **Planned Features:**
- Social login (Google, Facebook)
- Guest checkout option
- Mobile app integration
- Advanced loyalty program
- Subscription-based ordering
- Real-time order tracking
- Push notifications
- Multi-language support

### **Analytics Integration:**
- Track user behavior patterns
- A/B testing for conversion optimization
- User engagement metrics
- Order completion rates
- Feature usage statistics
