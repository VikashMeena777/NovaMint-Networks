import { Loader2 } from 'lucide-react';

export default function Loading() {
    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
                <p className="text-muted-foreground">Loading...</p>
            </div>
        </div>
    );
}
