"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCart } from "@/contexts/cart-context"
import { Check, CreditCard, Truck, MapPin, Package } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState("address")
  const [formData, setFormData] = useState({
    // Address
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    // Shipping
    shippingMethod: "standard",
    // Payment
    paymentMethod: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  })

  const indianStates = [
    { value: "AP", label: "Andhra Pradesh" },
    { value: "AR", label: "Arunachal Pradesh" },
    { value: "AS", label: "Assam" },
    { value: "BR", label: "Bihar" },
    { value: "CT", label: "Chhattisgarh" },
    { value: "GA", label: "Goa" },
    { value: "GJ", label: "Gujarat" },
    { value: "HR", label: "Haryana" },
    { value: "HP", label: "Himachal Pradesh" },
    { value: "JH", label: "Jharkhand" },
    { value: "KA", label: "Karnataka" },
    { value: "KL", label: "Kerala" },
    { value: "MP", label: "Madhya Pradesh" },
    { value: "MH", label: "Maharashtra" },
    { value: "MN", label: "Manipur" },
    { value: "ML", label: "Meghalaya" },
    { value: "MZ", label: "Mizoram" },
    { value: "NL", label: "Nagaland" },
    { value: "OR", label: "Odisha" },
    { value: "PB", label: "Punjab" },
    { value: "RJ", label: "Rajasthan" },
    { value: "SK", label: "Sikkim" },
    { value: "TN", label: "Tamil Nadu" },
    { value: "TS", label: "Telangana" },
    { value: "TR", label: "Tripura" },
    { value: "UK", label: "Uttarakhand" },
    { value: "UP", label: "Uttar Pradesh" },
    { value: "WB", label: "West Bengal" },
  ];

  const steps = [
    { id: "address", title: "Shipping Address", icon: MapPin },
    { id: "shipping", title: "Shipping Method", icon: Truck },
    { id: "payment", title: "Payment Information", icon: CreditCard },
    { id: "review", title: "Order Review", icon: Package },
  ]

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    const stepOrder = ["address", "shipping", "payment", "review"]
    const currentIndex = stepOrder.indexOf(currentStep)
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1])
    }
  }

  const handlePrevious = () => {
    const stepOrder = ["address", "shipping", "payment", "review"]
    const currentIndex = stepOrder.indexOf(currentStep)
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1])
    }
  }

  const handlePlaceOrder = () => {
    clearCart()
    router.push("/order-confirmation")
  }

  const shippingCost =
    formData.shippingMethod === "express"
      ? 9.99
      : formData.shippingMethod === "overnight"
      ? 24.99
      : 0

  const tax = total * 0.08
  const grandTotal = total + tax + shippingCost

  if (!items || items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <Button asChild>
            <a href="/products">Continue Shopping</a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          {/* Progress Steps */}
          <div className="flex justify-between mb-8 overflow-x-auto">
            {steps.map((step, index) => {
              const isActive = step.id === currentStep
              const isCompleted =
                steps.findIndex((s) => s.id === currentStep) > index
              const StepIcon = step.icon

              return (
                <div key={step.id} className="flex items-center flex-shrink-0">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      isCompleted
                        ? "bg-primary border-primary text-primary-foreground"
                        : isActive
                        ? "border-primary text-primary"
                        : "border-muted-foreground text-muted-foreground"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <StepIcon className="h-5 w-5" />
                    )}
                  </div>
                  <span
                    className={`ml-2 text-sm font-medium whitespace-nowrap ${
                      isActive
                        ? "text-primary"
                        : isCompleted
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 h-0.5 mx-4 flex-shrink-0 ${
                        isCompleted
                          ? "bg-primary"
                          : "bg-muted-foreground/30"
                      }`}
                    />
                  )}
                </div>
              )
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {steps.find((step) => step.id === currentStep)?.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {currentStep === "address" && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) =>
                              handleInputChange("firstName", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) =>
                              handleInputChange("lastName", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                        />
                      </div>

                      <div>
                        <label htmlFor="address" className="text-sm font-medium">Address</label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) =>
                            handleInputChange("address", e.target.value)
                          }
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label htmlFor="city" className="text-sm font-medium">City</label>
                          <Input
                            id="city"
                            value={formData.city}
                            onChange={(e) =>
                              handleInputChange("city", e.target.value)
                            }
                          />
                        </div>

                        <div>
                          <label htmlFor="state" className="text-sm font-medium">State</label>
                          <Select
                            value={formData.state}
                            onValueChange={(value) =>
                              handleInputChange("state", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                            <SelectContent>
                              {indianStates.map((state) => (
                                <SelectItem key={state.value} value={state.value}>
                                  {state.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label htmlFor="zipCode" className="text-sm font-medium">ZIP Code</label>
                          <Input
                            id="zipCode"
                            value={formData.zipCode}
                            onChange={(e) =>
                              handleInputChange("zipCode", e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === "shipping" && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <RadioGroup
                        value={formData.shippingMethod}
                        onValueChange={(value) =>
                          handleInputChange("shippingMethod", value)
                        }
                      >
                        <div className="flex items-center space-x-2 p-4 border rounded-lg">
                          <RadioGroupItem value="standard" id="standard" />
                          <label htmlFor="standard" className="flex-1 cursor-pointer">
                            <div className="flex justify-between">
                              <div>
                                <div className="font-medium">Standard Shipping</div>
                                <div className="text-sm text-muted-foreground">
                                  5-7 business days
                                </div>
                              </div>
                              <div className="font-medium">Free</div>
                            </div>
                          </label>
                        </div>

                        <div className="flex items-center space-x-2 p-4 border rounded-lg">
                          <RadioGroupItem value="express" id="express" />
                          <label htmlFor="express" className="flex-1 cursor-pointer">
                            <div className="flex justify-between">
                              <div>
                                <div className="font-medium">Express Shipping</div>
                                <div className="text-sm text-muted-foreground">
                                  2-3 business days
                                </div>
                              </div>
                              <div className="font-medium">$9.99</div>
                            </div>
                          </label>
                        </div>

                        <div className="flex items-center space-x-2 p-4 border rounded-lg">
                          <RadioGroupItem value="overnight" id="overnight" />
                          <label htmlFor="overnight" className="flex-1 cursor-pointer">
                            <div className="flex justify-between">
                              <div>
                                <div className="font-medium">Overnight Shipping</div>
                                <div className="text-sm text-muted-foreground">
                                  Next business day
                                </div>
                              </div>
                              <div className="font-medium">$24.99</div>
                            </div>
                          </label>
                        </div>
                      </RadioGroup>
                    </motion.div>
                  )}

                  {currentStep === "payment" && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <RadioGroup
                        value={formData.paymentMethod}
                        onValueChange={(value) =>
                          handleInputChange("paymentMethod", value)
                        }
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="card" id="card" />
                          <label htmlFor="card">Credit/Debit Card</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="paypal" id="paypal" />
                          <label htmlFor="paypal">PayPal</label>
                        </div>
                      </RadioGroup>

                      {formData.paymentMethod === "card" && (
                        <div className="space-y-4 mt-4">
                          <div>
                            <label htmlFor="nameOnCard">Name on Card</label>
                            <Input
                              id="nameOnCard"
                              value={formData.nameOnCard}
                              onChange={(e) =>
                                handleInputChange("nameOnCard", e.target.value)
                              }
                            />
                          </div>
                          <div>
                            <label htmlFor="cardNumber">Card Number</label>
                            <Input
                              id="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              value={formData.cardNumber}
                              onChange={(e) =>
                                handleInputChange("cardNumber", e.target.value)
                              }
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="expiryDate">Expiry Date</label>
                              <Input
                                id="expiryDate"
                                placeholder="MM/YY"
                                value={formData.expiryDate}
                                onChange={(e) =>
                                  handleInputChange("expiryDate", e.target.value)
                                }
                              />
                            </div>
                            <div>
                              <label htmlFor="cvv">CVV</label>
                              <Input
                                id="cvv"
                                placeholder="123"
                                value={formData.cvv}
                                onChange={(e) =>
                                  handleInputChange("cvv", e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {currentStep === "review" && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="font-semibold mb-2">Shipping Address</h3>
                        <p className="text-muted-foreground">
                          {formData.firstName} {formData.lastName}
                          <br />
                          {formData.address}
                          <br />
                          {formData.city}, {formData.state} {formData.zipCode}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Shipping Method</h3>
                        <p className="text-muted-foreground">
                          {formData.shippingMethod === "standard" &&
                            "Standard Shipping (5-7 days) - Free"}
                          {formData.shippingMethod === "express" &&
                            "Express Shipping (2-3 days) - $9.99"}
                          {formData.shippingMethod === "overnight" &&
                            "Overnight Shipping (Next day) - $24.99"}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Payment Method</h3>
                        <p className="text-muted-foreground">
                          {formData.paymentMethod === "card" &&
                            `Card ending in ${formData.cardNumber.slice(-4)}`}
                          {formData.paymentMethod === "paypal" && "PayPal"}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  <div className="flex justify-between pt-6">
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      disabled={currentStep === "address"}
                    >
                      Previous
                    </Button>
                    {currentStep === "review" ? (
                      <Button onClick={handlePlaceOrder}>Place Order</Button>
                    ) : (
                      <Button onClick={handleNext}>Next</Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between text-sm"
                      >
                        <span>
                          {item.title} × {item.quantity}
                        </span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>
                        {formData.shippingMethod === "standard" && "Free"}
                        {formData.shippingMethod === "express" && "$9.99"}
                        {formData.shippingMethod === "overnight" && "$24.99"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${(total * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold pt-2 border-t">
                      <span>Total</span>
                      <span className="text-primary">
                        $
                        {grandTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
