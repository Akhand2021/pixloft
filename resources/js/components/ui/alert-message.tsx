import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';

interface AlertMessageProps {
    message: ReactNode;
    type?: 'success' | 'error' | 'warning';
    duration?: number;
    onClose?: () => void;
}

export function AlertMessage({
    message,
    type = 'success',
    duration = 5000,
    onClose,
}: AlertMessageProps) {
    const [show, setShow] = useState(true);

    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => {
                setShow(false);
                onClose?.();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    if (!show) return null;

    const icons = {
        success: <CheckCircle2 className="h-4 w-4" />,
        error: <XCircle className="h-4 w-4" />,
        warning: <AlertCircle className="h-4 w-4" />,
    };

    const variants = {
        success: 'default',
        error: 'destructive',
        warning: 'default',
    } as const;

    return (
        <Alert variant={variants[type]}>
            {icons[type]}
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    );
} 