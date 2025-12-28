"use client";

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Inbox } from 'lucide-react';
import { schemes } from '@/lib/schemes'; // Using mock data
import type { Scheme } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const statusMap = {
  eligible: { title: "Eligible Schemes", badge: "secondary" },
  applied: { title: "Applied Schemes", badge: "default" },
  approved: { title: "Approved Schemes", badge: "success" },
} as const;

type Status = keyof typeof statusMap;

// Mock data for scheme statuses
const mySchemesData: (Scheme & { status: Status, appliedOn: string, approvedOn?: string })[] = [
  { ...schemes[1], status: 'eligible', appliedOn: "" },
  { ...schemes[3], status: 'eligible', appliedOn: "" },
  { ...schemes[4], status: 'eligible', appliedOn: "" },
  { ...schemes[0], status: 'applied', appliedOn: '2024-05-10' },
  { ...schemes[7], status: 'applied', appliedOn: '2024-06-01' },
  { ...schemes[8], status: 'applied', appliedOn: '2024-06-15' },
  { ...schemes[5], status: 'approved', appliedOn: '2024-03-20', approvedOn: '2024-04-15' },
];

function MySchemesContent() {
    const searchParams = useSearchParams();
    const status = (searchParams.get('status') || 'eligible') as Status;
  
    const { title } = statusMap[status] || statusMap.eligible;
  
    const filteredSchemes = mySchemesData.filter((scheme) => scheme.status === status);
  
    const getStatusBadge = (status: Status) => {
        switch (status) {
            case 'eligible': return <Badge variant="secondary">Eligible</Badge>;
            case 'applied': return <Badge variant="default">Applied</Badge>;
            case 'approved': return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Approved</Badge>;
            default: return <Badge>Unknown</Badge>;
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                 <Button variant="outline" size="icon" asChild>
                    <Link href="/dashboard">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold font-headline">{title}</h1>
                    <p className="text-muted-foreground">Track and manage your schemes.</p>
                </div>
            </div>

            <Card>
                <CardContent className="p-0">
                    {filteredSchemes.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Scheme Name</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Applied On</TableHead>
                                    <TableHead>Approved On</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredSchemes.map((scheme) => (
                                    <TableRow key={scheme.scheme_id}>
                                        <TableCell className="font-medium">{scheme.scheme_name}</TableCell>
                                        <TableCell>{getStatusBadge(scheme.status)}</TableCell>
                                        <TableCell>{scheme.appliedOn ? new Date(scheme.appliedOn).toLocaleDateString() : '-'}</TableCell>
                                        <TableCell>{scheme.approvedOn ? new Date(scheme.approvedOn).toLocaleDateString() : '-'}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={`/dashboard/scheme/${scheme.scheme_id}`}>View Details</Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="text-center p-12">
                            <Inbox className="mx-auto h-12 w-12 text-muted-foreground" />
                            <h3 className="mt-4 text-lg font-medium">No Schemes Found</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                You don't have any schemes in the "{status}" category.
                            </p>
                             <Button variant="default" className="mt-6" asChild>
                                <Link href="/dashboard/schemes">Explore Schemes</Link>
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

export default function MySchemesPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <MySchemesContent />
        </Suspense>
    );
}
