"use client"

import { useState } from "react"
import { Search, Eye, Package, Truck, CheckCircle, Clock } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function AdminOrdersPage() {
  const mockOrders = [
    { id: "ORD-001", customer: "John Doe", items: 2, total: 129.97, status: "delivered", date: "2024-01-15" },
    { id: "ORD-002", customer: "Jane Smith", items: 1, total: 199.99, status: "shipped", date: "2024-01-20" },
    { id: "ORD-003", customer: "Mike Johnson", items: 3, total: 245.50, status: "packed", date: "2024-01-22" },
    { id: "ORD-004", customer: "Emily White", items: 1, total: 45.00, status: "placed", date: "2024-01-23" },
    { id: "ORD-005", customer: "Robert Brown", items: 4, total: 320.75, status: "shipped", date: "2024-01-24" },
    { id: "ORD-006", customer: "Susan Davis", items: 1, total: 89.99, status: "delivered", date: "2024-01-25" },
    { id: "ORD-007", customer: "Michael Green", items: 2, total: 55.00, status: "placed", date: "2024-01-26" },
  ]

  const [orders, setOrders] = useState(mockOrders)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "packed":
        return "bg-yellow-100 text-yellow-800"
      case "placed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "delivered":
        return CheckCircle
      case "shipped":
        return Truck
      case "packed":
        return Package
      case "placed":
        return Clock
      default:
        return Clock
    }
  }

  return (
    <div className="p-6 md:p-8 space-y-6 bg-background min-h-screen text-foreground">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Order Management</h1>
          <p className="text-muted-foreground">Track and manage customer orders</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="placed">Placed</SelectItem>
                <SelectItem value="packed">Packed</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Orders ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredOrders.length === 0 ? (
            <div className="flex justify-center items-center h-48 text-muted-foreground">
              <p>No orders found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => {
                const StatusIcon = getStatusIcon(order.status)
                const statusColorClass = getStatusColor(order.status)

                return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border rounded-lg transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <div className={`p-2 rounded-full ${statusColorClass.replace("text-", "bg-")}`}>
                        <StatusIcon className={`h-5 w-5 ${statusColorClass}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold">{order.id}</h3>
                        <p className="text-sm text-muted-foreground">{order.customer}</p>
                      </div>
                    </div>

                    <div className="flex-1 text-sm text-muted-foreground w-full sm:w-auto mt-2 sm:mt-0">
                      <p>{order.items} item{order.items > 1 ? "s" : ""}</p>
                      <p className="text-xs">Ordered on {order.date}</p>
                    </div>

                    <div className="text-left sm:text-right w-full sm:w-auto mt-2 sm:mt-0">
                      <p className="font-bold text-lg">${order.total.toFixed(2)}</p>
                      <Badge className={statusColorClass}>{order.status.toUpperCase()}</Badge>
                    </div>

                    <div className="flex items-center gap-2 mt-4 sm:mt-0">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
