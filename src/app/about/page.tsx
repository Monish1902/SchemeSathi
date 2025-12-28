
import { ArrowRight, CheckCircle } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Logo from "@/components/logo";

const Feature = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-3">
    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
    <span className="text-muted-foreground">{children}</span>
  </li>
);


export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <section className="py-20 md:py-32 bg-primary/10">
            <div className="container-fluid mx-auto px-4 text-center">
                 <div className="flex justify-center items-center mb-6">
                    <Logo/>
                </div>
              <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4 font-headline">
                About scheme sathi
              </h1>
              <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-3xl mx-auto">
                Your trusted partner in navigating government schemes in Andhra Pradesh. We simplify the process of finding and applying for the benefits you deserve.
              </p>
            </div>
        </section>
        
        <section className="py-16 md:py-24">
            <div className="container-fluid mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold font-headline">Our Mission</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        At scheme sathi, our mission is to bridge the information gap between the citizens of Andhra Pradesh and the multitude of beneficial government schemes available. We believe that every citizen has the right to easily access and understand the support they are eligible for. Our platform is designed to empower individuals by providing clear, concise, and personalized information, making government services more accessible to everyone.
                    </p>
                    <h3 className="text-2xl font-bold font-headline pt-4">What We Do</h3>
                     <ul className="space-y-4">
                       <Feature>
                          <strong>Personalized Recommendations:</strong> We use your profile information to match you with the schemes that are most relevant to your needs.
                       </Feature>
                       <Feature>
                          <strong>Simplified Information:</strong> We break down complex government jargon into easy-to-understand language, so you know exactly what a scheme offers and how to get it.
                       </Feature>
                       <Feature>
                          <strong>Step-by-Step Guidance:</strong> Our platform provides clear instructions on eligibility criteria, required documents, and the application process for each scheme.
                       </Feature>
                       <Feature>
                          <strong>Centralized Hub:</strong> Find all the information you need in one place, saving you the time and effort of browsing multiple government websites.
                       </Feature>
                    </ul>
                </div>
                 <div>
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle>Ready to find your schemes?</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-muted-foreground">Create an account and complete your profile to unlock personalized recommendations and start your journey towards a better future.</p>
                             <Button size="lg" asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                                <Link href="/login">
                                Get Started <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
