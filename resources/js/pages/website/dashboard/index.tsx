import { Head } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import WelcomeHeader from '@/components/welcome/header';
import WelcomeFooter from '@/components/welcome/footer';
import { router } from '@inertiajs/react';

interface Order {
    id: number;
    order_number: string;
    total: number;
    status: string;
    created_at: string;
}

interface User {
    id: number;
    name: string;
    email: string;
}

interface Props {
    user: User;
    orders: Order[];
}

export default function DashboardIndex({ user, orders }: Props) {
    const handleLogout = () => {
        router.post('/logout');
    }
    return (
        <>
                <WelcomeHeader />
            <Head title="Dashboard" />
            <div className="relative isolate overflow-hidden bg-slate-100 dark:bg-slate-900 py-24 sm:py-32 lg:px-0">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <p><strong>Name:</strong> {user.name}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                                <Button asChild>
                                    <Link href="/profile">Edit Profile</Link>
                                </Button>

                                <Button  className="mt-2 mx-2" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Orders</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {orders.length > 0 ? (
                                <div className="space-y-4">
                                    {orders.map((order) => (
                                        <div key={order.id} className="border-b pb-2">
                                            <p><strong>Order #:</strong> {order.order_number}</p>
                                            <p><strong>Total:</strong> ${order.total}</p>
                                            <p><strong>Status:</strong> {order.status}</p>
                                            <p><strong>Date:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
                                            <Button asChild variant="outline" className="mt-2">
                                                <Link href={`/orders/${order.id}`}>View Details</Link>
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>No orders found.</p>
                            )}
                            <Button asChild className="mt-4">
                                <Link href="/orders">View All Orders</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <WelcomeFooter />
        </>
    );
} 