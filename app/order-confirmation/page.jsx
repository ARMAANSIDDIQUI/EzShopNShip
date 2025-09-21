"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Package, Truck, Home } from "lucide-react"
import Link from "next/link"

export default function OrderConfirmationPage() {
  const orderNumber = "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase()

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="h-12 w-12 text-green-600" />
          </motion.div>

          <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Thank you for your purchase. Your order has been successfully placed.
          </p>

          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="text-left space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">Order Number:</span>
                  <span className="text-primary font-mono">{orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Estimated Delivery:</span>
                  <span>5-7 business days</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Shipping Method:</span>
                  <span>Standard Shipping</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Timeline */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-6">What happens next?</h2>
            <div className="flex justify-between items-center max-w-md mx-auto">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-2">
                  <CheckCircle className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="text-sm font-medium">Order Placed</span>
              </div>
              <div className="flex-1 h-0.5 bg-muted mx-2" />
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-2">
                  <Package className="h-6 w-6 text-muted-foreground" />
                </div>
                <span className="text-sm font-medium">Processing</span>
              </div>
              <div className="flex-1 h-0.5 bg-muted mx-2" />
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-2">
                  <Truck className="h-6 w-6 text-muted-foreground" />
                </div>
                <span className="text-sm font-medium">Shipped</span>
              </div>
              <div className="flex-1 h-0.5 bg-muted mx-2" />
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-2">
                  <Home className="h-6 w-6 text-muted-foreground" />
                </div>
                <span className="text-sm font-medium">Delivered</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/profile">View Order Details</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}