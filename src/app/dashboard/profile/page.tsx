"use client";

import * as React from "react";
import { useUserProfile } from "@/hooks/use-user-profile";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfilePage() {
  const { profile, setProfile, loading } = useUserProfile();
  const [newProfilePicUrl, setNewProfilePicUrl] = React.useState(profile?.profilePictureUrl || "");

  const handlePictureSave = () => {
    if (profile) {
      setProfile({ ...profile, profilePictureUrl: newProfilePicUrl });
    }
  };

  React.useEffect(() => {
    if (profile?.profilePictureUrl) {
      setNewProfilePicUrl(profile.profilePictureUrl);
    }
  }, [profile]);

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

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
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
               <Avatar className="h-24 w-24">
                <AvatarImage src={profile?.profilePictureUrl} />
                <AvatarFallback className="text-3xl">{getInitials(profile?.fullName)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl font-headline">{profile?.fullName || 'Your Profile'}</CardTitle>
                <CardDescription>
                  This information is used to find schemes that match your profile.
                </CardDescription>
              </div>
            </div>
             <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Edit Profile Picture</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit profile picture</DialogTitle>
                  <DialogDescription>
                    Update your profile picture. Enter a URL for your new image.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="picture-url" className="text-right">
                      Image URL
                    </Label>
                    <Input
                      id="picture-url"
                      value={newProfilePicUrl}
                      onChange={(e) => setNewProfilePicUrl(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" onClick={handlePictureSave}>Save changes</Button>
                    </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
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
