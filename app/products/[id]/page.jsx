"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { fetchProducts } from "@/lib/dummy-data"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/hooks/use-wishlist"
import { ShoppingCart, Heart, Star, Minus, Plus, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ProductDetailPage() {
  const params = useParams()
  const { addItem } = useCart()
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist()
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const isWishlisted = wishlistItems.some((item) => item.id === product?.id);

  useEffect(() => {
    async function getProduct() {
      try {
        const allProducts = await fetchProducts()
        const foundProduct = allProducts.find((p) => p.id === Number.parseInt(params.id))
        if (foundProduct) {
          setProduct(foundProduct)
        } else {
          setError("Product not found.")
        }
      } catch (err) {
        setError("Failed to fetch product. Please check your network connection.")
        console.error("Failed to fetch product:", err)
      } finally {
        setLoading(false)
      }
    }
    getProduct()
  }, [params.id])

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addItem(product)
      }
    }
  }

  const handleWishlistToggle = () => {
    if (!product) return;

    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const reviews = [
    {
      id: 1,
      user: "John D.",
      rating: 5,
      comment: "Excellent product! Highly recommended.",
      date: "2024-01-15",
    },
    {
      id: 2,
      user: "Sarah M.",
      rating: 4,
      comment: "Good quality, fast shipping.",
      date: "2024-01-10",
    },
    {
      id: 3,
      user: "Mike R.",
      rating: 5,
      comment: "Perfect! Exactly what I was looking for.",
      date: "2024-01-05",
    },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Loading product details...</p>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background text-center flex flex-col items-center justify-center text-destructive">
        <h1 className="text-2xl font-bold mb-4">{error || "Product not found"}</h1>
        <Link href="/products">
          <Button>Back to Products</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/products" className="hover:text-foreground flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Products
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.title}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted group">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            {/* Thumbnail images would go here in a real app */}
          </motion.div>

          {/* Product Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating.rate)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating.rate} ({product.rating.count} reviews)
                </span>
              </div>
              <p className="text-4xl font-bold text-primary mb-6">${product.price}</p>
            </div>

            <div className="space-y-4">
              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <label className="font-medium">Quantity:</label>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <Button variant="ghost" size="sm" onClick={() => setQuantity(quantity + 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button size="lg" onClick={handleAddToCart} className="flex-1 gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  size="lg"
                  variant={isWishlisted ? "default" : "outline"}
                  onClick={handleWishlistToggle}
                  className="gap-2"
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
                  {isWishlisted ? "Wishlisted" : "Wishlist"}
                </Button>
              </div>
            </div>

            {/* Product Features */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Product Features</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• High-quality materials</li>
                  <li>• Fast shipping available</li>
                  <li>• 30-day return policy</li>
                  <li>• Customer support included</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
              <TabsTrigger value="qa">Q&A</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Product Description</h3>
                  <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                  <div className="mt-6">
                    <h4 className="font-medium mb-2">Specifications</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Material: Premium quality</li>
                      <li>• Dimensions: Standard size</li>
                      <li>• Weight: Lightweight design</li>
                      <li>• Warranty: 1 year manufacturer warranty</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{review.user}</h4>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="qa" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Questions & Answers</h3>
                  <div className="space-y-4">
                    <div className="border-b pb-4">
                      <h4 className="font-medium mb-2">Q: Is this product durable?</h4>
                      <p className="text-muted-foreground">
                        A: Yes, this product is made with high-quality materials designed to last.
                      </p>
                    </div>
                    <div className="border-b pb-4">
                      <h4 className="font-medium mb-2">Q: What's the return policy?</h4>
                      <p className="text-muted-foreground">A: We offer a 30-day return policy for all products.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
