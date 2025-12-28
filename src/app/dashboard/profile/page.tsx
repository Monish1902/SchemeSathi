"use client";

import { useUserProfile } from "@/hooks/use-user-profile";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

export default function ProfilePage() {
  const { profile, loading } = useUserProfile();

  const ProfileDetail = ({ label, value }: { label: string, value: React.ReactNode }) => (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b">
      <p className="text-sm text-muted-foreground">{label}</p>
      {loading ? <Skeleton className="h-5 w-32 mt-1 sm:mt-0" /> : <p className="text-sm font-medium">{value || 'N/A'}</p>}
    </div>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-headline">My Profile</CardTitle>
            <Button variant="outline" size="icon">
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit Profile</span>
            </Button>
          </div>
          <CardDescription>
            This information is used to find schemes that match your profile.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileDetail label="Full Name" value={profile?.fullName} />
          <ProfileDetail label="Date of Birth" value={profile?.dob} />
          <ProfileDetail label="Gender" value={profile?.gender} />
          <ProfileDetail label="Caste Category" value={profile?.casteCategory} />
          <ProfileDetail label="Annual Family Income" value={profile?.annualIncome ? `₹${profile.annualIncome.toLocaleString()}` : 'N/A'} />
          <ProfileDetail label="Farmer" value={profile?.isFarmer} />
          <ProfileDetail label="Occupation" value={profile?.occupation} />
          <ProfileDetail label="Disability Status" value={profile?.hasDisability} />
          <ProfileDetail label="State" value={profile?.state} />
          <ProfileDetail label="District" value={profile?.district} />
        </CardContent>
      </Card>
    </div>
  );
}
