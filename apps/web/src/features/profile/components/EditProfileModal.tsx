"use client";

import { useState } from "react";
import { useProfile } from "../hooks/useProfile";
import { Button } from "@torihub/ui/components/button";
import { Input } from "@torihub/ui/components/input";
import { Label } from "@torihub/ui/components/label";
import { Card, CardContent, CardHeader, CardTitle } from "@torihub/ui/components/card";

export function EditProfileModal({ currentBio, onClose }: { currentBio: string, onClose: () => void }) {
  const [bio, setBio] = useState(currentBio || "");
  
  // Bring in the clean logic from our custom hook
  const { editBio, isPending, error } = useProfile();

  const handleSave = () => {
    // Pass the new bio and a callback to close the modal on success
    editBio(bio, onClose);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Input 
              id="bio" 
              value={bio} 
              onChange={(e) => setBio(e.target.value)} 
              placeholder="Tell the world about yourself..."
              disabled={isPending}
            />
          </div>
          
          {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={onClose} disabled={isPending}>Cancel</Button>
            <Button onClick={handleSave} disabled={isPending}>
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}