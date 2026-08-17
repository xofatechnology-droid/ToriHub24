"use client";

import { useState } from "react";
import { Button } from "@torihub/ui/components/button";
import { EditProfileModal } from "./EditProfileModal";

export function ProfileActions({ currentBio }: { currentBio: string }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
        Edit Profile
      </Button>

      {isEditing && (
        <EditProfileModal 
          currentBio={currentBio} 
          onClose={() => setIsEditing(false)} 
        />
      )}
    </>
  );
}