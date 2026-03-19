import Link from 'next/link';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Button, Card } from '@/components/ui';

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
            <Card className="p-8 text-center max-w-md">
                <div className="text-8xl font-bold gradient-text mb-4">404</div>
                <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
                <p className="text-muted-foreground mb-8">
                    Oops! The page you're looking for doesn't exist or has been moved.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/" className="flex-1">
                        <Button className="w-full">
                            <Home className="w-5 h-5" />
                            Go Home
                        </Button>
                    </Link>
                    <Link href="/contact" className="flex-1">
                        <Button variant="outline" className="w-full">
                            <Search className="w-5 h-5" />
                            Contact Us
                        </Button>
                    </Link>
                </div>
            </Card>
        </div>
    );
}
