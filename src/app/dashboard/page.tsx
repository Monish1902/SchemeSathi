"use client";

import { useEffect, useState } from "react";
import { useUserProfile } from "@/hooks/use-user-profile";
import { getRecommendedSchemes } from "@/app/actions";
import { type RecommendSchemesBasedOnProfileOutput } from "@/ai/flows/recommend-schemes-based-on-profile";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileText, Award, CheckCircle, Info } from "lucide-react";
import { SchemeCard } from "@/components/dashboard/scheme-card";
import { schemes } from "@/lib/schemes";
import { SimpleSchemeCard } from "@/components/dashboard/simple-scheme-card";

export default function DashboardPage() {
  const { profile, loading: profileLoading } = useUserProfile();
  const [recommendations, setRecommendations] = useState<RecommendSchemesBasedOnProfileOutput>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const popularSchemes = schemes.slice(0, 5).map(s => ({
      schemeId: s.scheme_id,
      schemeName: s.scheme_name,
      shortDescription: s.scheme_description,
      benefitAmount: s.total_benefit_amount,
      matchPercentage: 0 // Not a match, just popular
  }));

  useEffect(() => {
    if (!profileLoading && profile) {
      setLoading(true);
      setError(null);
      getRecommendedSchemes(profile)
        .then(result => {
          if (result.error) {
            setError(result.error);
            setRecommendations([]);
          } else if (result.data && result.data.length > 0) {
            setRecommendations(result.data.slice(0, 5));
          } else {
            setRecommendations([]);
          }
        })
        .catch(err => {
          console.error(err);
          setError("An unexpected error occurred.");
          setRecommendations([]);
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (!profileLoading && !profile) {
      setLoading(false);
    }
  }, [profile, profileLoading]);

  const stats = [
    { title: "Eligible Schemes", value: recommendations.length, icon: FileText, color: "text-primary", link: "/dashboard/my-schemes?status=eligible" },
    { title: "Applied Schemes", value: 3, icon: Award, color: "text-accent", link: "/dashboard/my-schemes?status=applied" },
    { title: "Approved Schemes", value: 1, icon: CheckCircle, color: "text-green-500", link: "/dashboard/my-schemes?status=approved" },
  ];
  
  if (profileLoading) {
    return <DashboardSkeleton />;
  }
  
  if (!profile) {
    return (
      <Card className="text-center">
        <CardHeader>
          <CardTitle>Welcome to scheme sathi</CardTitle>
          <CardDescription>
            Please complete your profile to get personalized scheme recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/onboarding">Complete Profile</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">
        Welcome, {profile.fullName}!
      </h1>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map(stat => (
          <Link href={stat.link} key={stat.title}>
            <Card className="hover:bg-muted/80 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 text-muted-foreground ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {loading && stat.title === 'Eligible Schemes' ? <Skeleton className="h-8 w-12" /> : stat.value}
                </div>
                <p className="text-xs text-muted-foreground">Click to view</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <h2 className="text-2xl font-bold font-headline pt-4">
        {loading || recommendations.length > 0 ? "Recommended For You" : "Popular Schemes"}
      </h2>

      {error && (
        <Alert variant="destructive">
          <Info className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {loading && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(5)].map((_, i) => <SchemeCardSkeleton key={i} />)}
        </div>
      )}

      {!loading && recommendations.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recommendations.map(scheme => (
            <SchemeCard key={scheme.schemeId} scheme={scheme} />
          ))}
        </div>
      )}
      
      {!loading && recommendations.length === 0 && !error && (
         <div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {popularSchemes.map(scheme => (
                <SimpleSchemeCard key={scheme.schemeId} scheme={scheme} />
              ))}
            </div>
             <Card className="text-center py-8 mt-6">
                <CardContent>
                    <p className="text-sm text-muted-foreground">We couldn't find any schemes that perfectly match your profile right now. Try updating your profile for better recommendations.</p>
                    <Button variant="outline" className="mt-4" asChild>
                        <Link href="/dashboard/profile">Update Profile</Link>
                    </Button>
                </CardContent>
             </Card>
         </div>
      )}
    </div>
  );
}

const DashboardSkeleton = () => (
    <div className="space-y-6">
        <Skeleton className="h-10 w-1/2" />
        <div className="grid gap-4 md:grid-cols-3">
            {[...Array(3)].map((_, i) => (
                <Card key={i}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-4 rounded-full" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-8 w-12" />
                        <Skeleton className="h-3 w-32 mt-1" />
                    </CardContent>
                </Card>
            ))}
        </div>
        <Skeleton className="h-8 w-1/3 pt-4" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(5)].map((_, i) => <SchemeCardSkeleton key={i} />)}
        </div>
    </div>
);

const SchemeCardSkeleton = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </CardHeader>
    <CardContent className="space-y-4">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <div className="flex justify-between items-center pt-2">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-10 w-24" />
      </div>
    </CardContent>
  </Card>
);
