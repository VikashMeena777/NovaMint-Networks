'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw, Home, AlertTriangle } from 'lucide-react';
import { Button, Card } from '@/components/ui';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Application error:', error);
    }, [error]);

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
            <Card className="p-8 text-center max-w-md">
                <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle className="w-8 h-8 text-destructive" />
                </div>

                <h1 className="text-2xl font-bold mb-2">Something Went Wrong</h1>
                <p className="text-muted-foreground mb-8">
                    We apologize for the inconvenience. An unexpected error has occurred.
                </p>

                {error.digest && (
                    <div className="bg-muted/50 rounded-lg p-3 mb-6">
                        <p className="text-xs text-muted-foreground">Error ID: {error.digest}</p>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                    <Button onClick={reset} className="flex-1">
                        <RefreshCw className="w-5 h-5" />
                        Try Again
                    </Button>
                    <Link href="/" className="flex-1">
                        <Button variant="outline" className="w-full">
                            <Home className="w-5 h-5" />
                            Go Home
                        </Button>
                    </Link>
                </div>
            </Card>
        </div>
    );
}
