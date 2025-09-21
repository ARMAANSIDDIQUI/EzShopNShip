import { AdminSidebar } from "@/components/admin-sidebar"

export default function AdminLayout({
  children,
}) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}