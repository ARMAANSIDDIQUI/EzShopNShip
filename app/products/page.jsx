"use client"

import { useState, useMemo, useEffect } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { fetchProducts, categories } from "@/lib/dummy-data"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/hooks/use-wishlist"
import { ShoppingCart, Filter, Grid, List, Heart, Shirt, Smartphone, Home, Briefcase, Dumbbell, Book } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ProductsPage() {
  const { addItem } = useCart()
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 100000])
  const [sortBy, setSortBy] = useState("name")
  const [viewMode, setViewMode] = useState("grid")
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    async function getProducts() {
      try {
        const fetchedProducts = await fetchProducts()
        setProducts(fetchedProducts)
      } catch (err) {
        setError("Failed to fetch products. Please check your network connection.")
        console.error("Failed to fetch products:", err)
      } finally {
        setLoading(false)
      }
    }
    getProducts()
  }, [])

  const filteredProducts = useMemo(() => {
    if (loading || error) return []

    const filtered = products.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      return matchesSearch && matchesCategory && matchesPrice
    })

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating.rate - a.rating.rate
        case "name":
        default:
          return a.title.localeCompare(b.title)
      }
    })

    return filtered
  }, [products, searchQuery, selectedCategory, priceRange, sortBy, loading, error])

  const categoryIcons = {
    electronics: Smartphone,
    clothing: Shirt,
    'home-decoration': Home,
    accessories: Briefcase,
    'sports-and-outdoors': Dumbbell,
    books: Book,
  };

  const handleWishlistToggle = (product) => {
    const isWishlisted = wishlistItems.some(item => item.id === product.id);
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-destructive">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`lg:w-64 space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}
          >
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Filters</h3>

                {/* Search */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search</label>
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => {
                        const Icon = categoryIcons[category.id] || Book;
                        return (
                          <SelectItem key={category.id} value={category.id}>
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4" />
                              <span>{category.name}</span>
                            </div>
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={10000}
                    min={0}
                    step={10}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold">Products</h1>
                <p className="text-muted-foreground">{filteredProducts.length} products found</p>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name A-Z</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {filteredProducts.map((product, index) => {
                const isWishlisted = wishlistItems.some(item => item.id === product.id);

                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ y: -2 }}
                  >
                    {viewMode === "grid" ? (
                      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                        <div className="relative h-48 overflow-hidden group">
                          <Image
                            src={product.image || "https://placehold.co/600x400"}
                            alt={product.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <Badge className="absolute top-2 right-2">⭐ {product.rating.rate}</Badge>
                          <Button
                            size="sm"
                            variant={isWishlisted ? "default" : "secondary"}
                            className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleWishlistToggle(product)}
                          >
                            <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
                          </Button>
                        </div>
                        <CardContent className="p-4">
                          <Link href={`/products/${product.id}`}>
                            <h3 className="font-semibold mb-2 line-clamp-2 hover:text-primary cursor-pointer">
                              {product.title}
                            </h3>
                          </Link>
                          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{product.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-primary">${product.price}</span>
                            <Button size="sm" onClick={() => addItem(product)} className="gap-2">
                              <ShoppingCart className="h-4 w-4" />
                              Add
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-md">
                              <Image
                                src={product.image || "https://placehold.co/600x400"}
                                alt={product.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start mb-2">
                                <Link href={`/products/${product.id}`}>
                                  <h3 className="font-semibold hover:text-primary cursor-pointer line-clamp-1">
                                    {product.title}
                                  </h3>
                                </Link>
                                <Badge>⭐ {product.rating.rate}</Badge>
                              </div>
                              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{product.description}</p>
                              <div className="flex items-center justify-between">
                                <span className="text-xl font-bold text-primary">${product.price}</span>
                                <div className="flex gap-2">
                                  <Button size="sm" variant="outline" onClick={() => handleWishlistToggle(product)}>
                                    <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
                                  </Button>
                                  <Button size="sm" onClick={() => addItem(product)} className="gap-2">
                                    <ShoppingCart className="h-4 w-4" />
                                    Add to Cart
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
