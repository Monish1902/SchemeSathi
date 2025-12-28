"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type RecommendSchemesBasedOnProfileOutput } from "@/ai/flows/recommend-schemes-based-on-profile";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type SimpleSchemeCardProps = {
  scheme: RecommendSchemesBasedOnProfileOutput[0];
};

export function SimpleSchemeCard({ scheme }: SimpleSchemeCardProps) {
  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-lg">{scheme.schemeName}</CardTitle>
        <CardDescription className="text-xs pt-1">ID: {scheme.schemeId}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {scheme.shortDescription}
        </p>
        <div className="mt-auto">
          <div className="mb-4">
            <p className="text-sm font-medium">Benefit Amount</p>
            <p className="text-2xl font-bold text-primary">₹{scheme.benefitAmount.toLocaleString()}</p>
          </div>
          <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href={`/dashboard/scheme/${scheme.schemeId}`}>
              View Details <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
