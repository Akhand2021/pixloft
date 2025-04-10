import { Head } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import WelcomeHeader from '@/components/welcome/header';
import WelcomeFooter from '@/components/welcome/footer';

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
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <WelcomeHeader />
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