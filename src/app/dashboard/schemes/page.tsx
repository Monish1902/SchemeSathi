'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { schemes } from '@/lib/schemes';
import { type Scheme } from '@/lib/types';
import { Search } from 'lucide-react';

const SimpleSchemeCard = ({ scheme }: { scheme: Scheme }) => (
  <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
    <CardHeader>
      <CardTitle className="text-lg">{scheme.scheme_name}</CardTitle>
      <CardDescription>{scheme.scheme_category}</CardDescription>
    </CardHeader>
    <CardContent className="flex-grow flex flex-col justify-between">
      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
        {scheme.scheme_description}
      </p>
      <div className="mt-auto">
        <div className="mb-4">
          <p className="text-sm font-medium">Benefit Amount</p>
          <p className="text-2xl font-bold text-primary">₹{scheme.total_benefit_amount.toLocaleString()}</p>
        </div>
        <Button asChild className="w-full">
          <Link href={`/dashboard/scheme/${scheme.scheme_id}`}>View Details</Link>
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default function AllSchemesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSchemes = schemes.filter(
    (scheme) =>
      scheme.scheme_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.scheme_description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.scheme_category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <div>
            <h1 className="text-3xl font-bold font-headline">All Schemes</h1>
            <p className="text-muted-foreground">Browse all available government schemes.</p>
        </div>
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search schemes..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredSchemes.length > 0 ? (
          filteredSchemes.map((scheme) => (
            <SimpleSchemeCard key={scheme.scheme_id} scheme={scheme} />
          ))
        ) : (
          <p className="col-span-full text-center text-muted-foreground">
            No schemes found matching your search.
          </p>
        )}
      </div>
    </div>
  );
}
