import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Sprout, HandHeart, GraduationCap, PersonStanding, Accessibility, Briefcase, Users, HeartPulse, School } from "lucide-react";
import { schemes } from "@/lib/schemes";
import { type Scheme } from "@/lib/types";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const categories = [
  { name: "For Farmers", icon: Sprout, key: "For Farmers" },
  { name: "For Women", icon: HandHeart, key: "For Women" },
  { name: "For Youth/Students", icon: GraduationCap, key: "For Youth/Students" },
  { name: "For Senior Citizens", icon: PersonStanding, key: "For Senior Citizens" },
  { name: "For Disabled Persons", icon: Accessibility, key: "For Disabled Persons" },
  { name: "For Unemployed", icon: Briefcase, key: "For Unemployed" },
  { name: "For Minorities", icon: Users, key: "For Minorities" },
  { name: "Healthcare Schemes", icon: HeartPulse, key: "Healthcare Schemes" },
  { name: "Education Schemes", icon: School, key: "Education Schemes" },
];

const SchemeCard = ({ scheme }: { scheme: Scheme }) => (
  <Card className="flex flex-col">
    <CardHeader>
      <CardTitle className="text-lg">{scheme.scheme_name}</CardTitle>
      <CardDescription className="text-sm">{scheme.scheme_description.substring(0, 100)}...</CardDescription>
    </CardHeader>
    <CardContent className="flex-grow flex flex-col justify-between">
       <div>
        <div className="text-sm text-muted-foreground mb-4">
          <p><strong>Benefit:</strong> ₹{scheme.total_benefit_amount.toLocaleString()}</p>
        </div>
      </div>
      <Button asChild variant="outline" className="mt-auto">
        <Link href={`/dashboard/scheme/${scheme.scheme_id}`}>View Details</Link>
      </Button>
    </CardContent>
  </Card>
);

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero');
  const featuredSchemes = schemes.slice(0, 6);
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-primary/10 py-20 md:py-32">
            <div className="container-fluid mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4 font-headline">
                Discover Government Schemes You're Eligible For
              </h1>
              <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-3xl mx-auto">
                Andhra Pradesh Government Welfare Programs at Your Fingertips
              </p>
              <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/login">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
        </section>


        {/* Featured Schemes */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container-fluid mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 font-headline">Featured Schemes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredSchemes.map((scheme) => (
                <SchemeCard key={scheme.scheme_id} scheme={scheme} />
              ))}
            </div>
          </div>
        </section>

        {/* Scheme Categories */}
        <section className="py-16 md:py-24 bg-secondary/50">
          <div className="container-fluid mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 font-headline">Scheme Categories</h2>
            <Tabs defaultValue={categories[0].key} className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 h-auto">
                {categories.map((category) => (
                  <TabsTrigger key={category.key} value={category.key} className="flex-col h-20 gap-2">
                    <category.icon className="h-6 w-6" />
                    <span className="text-xs text-center">{category.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              {categories.map((category) => (
                <TabsContent key={category.key} value={category.key}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                    {schemes
                      .filter((s) => s.scheme_category === category.key)
                      .slice(0, 3)
                      .map((scheme) => (
                        <SchemeCard key={scheme.scheme_id} scheme={scheme} />
                      ))}
                      {schemes.filter((s) => s.scheme_category === category.key).length === 0 && (
                        <p className="col-span-full text-center text-muted-foreground">No schemes available in this category yet.</p>
                      )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
