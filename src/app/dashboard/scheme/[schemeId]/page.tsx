'use client';

import { useParams } from 'next/navigation';
import { schemes } from '@/lib/schemes';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, FileText, Calendar, ExternalLink, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const DetailItem = ({ icon, label, value }: { icon: React.ElementType, label: string, value: string }) => (
    <div className="flex items-start gap-3">
        <icon className="h-5 w-5 text-primary mt-1" />
        <div>
            <p className="font-semibold">{label}</p>
            <p className="text-muted-foreground">{value}</p>
        </div>
    </div>
);

const EligibilityItem = ({ criterion, value }: { criterion: string, value: string }) => {
    const formattedCriterion = criterion.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    return (
        <li className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span><strong>{formattedCriterion}:</strong> {value}</span>
        </li>
    );
};


export default function SchemeDetailPage() {
  const params = useParams();
  const schemeId = params.schemeId as string;
  const scheme = schemes.find((s) => s.scheme_id === schemeId);

  if (!scheme) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <Info className="w-16 h-16 text-destructive mb-4" />
            <h1 className="text-2xl font-bold mb-2">Scheme Not Found</h1>
            <p className="text-muted-foreground mb-6">The scheme you are looking for does not exist or has been moved.</p>
            <Button asChild>
                <Link href="/dashboard/schemes">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Go Back to All Schemes
                </Link>
            </Button>
        </div>
    );
  }

  return (
    <div className="space-y-6">
        <Button variant="outline" asChild>
            <Link href="/dashboard/schemes">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Schemes
            </Link>
        </Button>
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
              <div>
                <Badge variant="secondary" className="mb-2">{scheme.department_name}</Badge>
                <CardTitle className="text-3xl font-headline">{scheme.scheme_name}</CardTitle>
                <CardDescription className="text-lg mt-1">{scheme.scheme_category}</CardDescription>
              </div>
              <div className="text-right flex-shrink-0">
                  <p className="text-sm text-muted-foreground">Total Benefit Amount</p>
                  <p className="text-3xl font-bold text-primary">₹{scheme.total_benefit_amount.toLocaleString()}</p>
              </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
            <p className="text-base leading-relaxed">{scheme.scheme_description}</p>
             {scheme.application_deadline && (
                <Alert>
                    <Calendar className="h-4 w-4" />
                    <AlertTitle>Application Deadline</AlertTitle>
                    <AlertDescription>
                        The last date to apply for this scheme is <strong>{new Date(scheme.application_deadline).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong>.
                    </AlertDescription>
                </Alert>
            )}
        </CardContent>
      </Card>
      
      <div className="grid md:grid-cols-2 gap-6">
          <Card>
              <CardHeader>
                  <CardTitle>Eligibility Criteria</CardTitle>
              </CardHeader>
              <CardContent>
                  <ul className="space-y-3 text-sm">
                      {Object.entries(scheme.eligibility_criteria).map(([key, value]) => (
                          <EligibilityItem key={key} criterion={key} value={Array.isArray(value) ? value.join(', ') : String(value)} />
                      ))}
                  </ul>
              </CardContent>
          </Card>
          <Card>
              <CardHeader>
                  <CardTitle>Documents Required</CardTitle>
              </CardHeader>
              <CardContent>
                  <ul className="space-y-3 text-sm">
                      {scheme.required_documents.map(doc => (
                          <li key={doc} className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-accent" />
                              <span>{doc}</span>
                          </li>
                      ))}
                  </ul>
              </CardContent>
          </Card>
      </div>

       <Card>
          <CardHeader>
            <CardTitle>How to Apply</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
              <p className="text-muted-foreground">{scheme.how_to_apply}</p>
              <Button asChild>
                  <a href={scheme.official_website} target="_blank" rel="noopener noreferrer">
                      Visit Official Website <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
              </Button>
          </CardContent>
      </Card>

    </div>
  );
}
