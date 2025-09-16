import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'

// Firebase Admin SDK configuration
const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID || "mbreadcoffeetea-75636",
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY || "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDKt82ell6OZ2C3\n+Ry5ik9xoRwQUIAXNRbvFPFokHbcK0Zio+5YjUB8CS1kFx/yQbfzlo9mEr5tWDhY\nQXvXHjwxSu6kEpUOIGANB6qs/FPLh30EkAOsRCl5Urg58k08lgICCjeRUMgCd6vF\nFzgPiXSvp2Zc66DZuaQ4VA6Q85JuvKL5WC8M5PuzxvrJfBLVXpWBen6/inTabWdR\n0JIXU7WFuQ4kL+Ji35t90FAjh2XY8AESTWbwXguXv9lHXjf+numzvDc2vWVq4acV\nKVbpnoKgzvP8tT/3CG+qrF3l8a932rnsrCZwoMCTKoZis24+SMoPFCsRSQoB9YwV\nl175DdaDAgMBAAECggEASCeaMat2JpvXSkSKG+SGGHzu/0OYBCqqahj7QGvDUuS4\nXd3ZtX05iay+klTE0zbfIf3iNsPPMh5nl8pfKRei9yyjupS+p1OQvLKQ5pe9v8EP\nF7OnCwcL+BogZse/BCSkvFMkqj2lo3MzGakFFEqp1OfxwHtCOp0gPch1ktSPt4gd\nBvyHLpIy2JTN/fGje+5cPfJhniOL4QyfxqPwYPYs0eAYvW3UYroqV2tr6YKGlJub\nJ8nxAK4PNEb+1hUWR0kYn18mkKHIVnXGKuL8QEEKDG68ZIwIeASlanPPKxhtTqTC\nE4fq5VGWBwVEpeqXBsL3a3ma+hDD5hMuD5Z+l/YZ0QKBgQDpL/TH+lm1s7Kpytvw\nnVsBU/HKrZT84JLv0+pE3UDGnPs3N+F6e23WGqywGzqJTD3Z09hrlk6WFBNxrK8R\nAsklLJSEiuQgwBUO0k3FsKhiSb3vfNS8Uc1gYbmt8irjZLYUcqTflx6sy1CuXHPP\nnIKOXvIvvqcSsM0lGT1yHuTfeQKBgQDejMJzOyJagL9E+C03SI3avWxwJ6Gq+n7P\neIDaohgjM57wmPA8jI8uhAKWqTlhhmfQtNkJrXRIPcDZSYpOpvGh+bKL/Sd+f+j0\n6/uLkWxGApOuSA52wstj7fIcHfd0CY0BTq35K5HHIPW7w2aZ8/Y2FhLgQKYBS2U4\nkQmUXxt62wKBgQCgdMdS9AnW5hgCjfxZzW1ZtJGkjVz/xOhW7tM9H6H7CPo0PNeC\nmHwz35cEdzgIUdYdlZBON9dLnfTjO5gbdHdEhTCNI6Vmg8X5tOyfI7g6KdPwf01D\naGaR86z47LJmVl6UI28gC7Sn4h9aW3O1YFTV8q9j+ySrz8zZwkxtwqRqwQKBgQCc\n2R3OstWibWzggfz0Ipl/mdNMNFJXu5YWSPqfnHBglugk79UZB4N+KCHe50N+vYh7\naoowrOPwaj15pr/ocPaJzv8MdI4aNLINtCekFQj3SqekxDoVb3KDalchg+k8CeMs\nEbTBkPh8HHm0LKIqTOuw8Nu62zVkYivjsyzKOkGW0wKBgQDjq5QHhPF/Cs0bfa+h\nZs9GRRrOUIAe1DMRVQV6RxnMX9/TlH4xUIpQsw+6skY5EiAoIPo6+iIX8N5xIYvs\nfMBcvwODDzc9Am9vborYjaMj2uGiUjBD7JA7jV8j+KC4tYCS/jv4RspGWRFp9pDW\nEJMI5I9aSpBUBlsAl8zzGVuEFA==\n-----END PRIVATE KEY-----\n",
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL || "firebase-adminsdk-fbsvc@mbreadcoffeetea-75636.iam.gserviceaccount.com"
  }),
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID || "mbreadcoffeetea-75636"
}

// Initialize Firebase Admin SDK
const adminApp = getApps().length === 0 ? initializeApp(firebaseAdminConfig) : getApps()[0]

// Initialize Firebase Admin Auth
export const adminAuth = getAuth(adminApp)

// Initialize Firebase Admin Firestore
export const adminDb = getFirestore(adminApp)

export default adminApp
