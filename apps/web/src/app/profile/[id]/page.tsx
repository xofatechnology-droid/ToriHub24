import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { fetchUserProfile } from "@/features/profile/api/fetchUserProfile";
import { ProfileHeader } from "@/features/profile/components/ProfileHeader";
import { ProfileFeed } from "@/features/profile/components/ProfileFeed";
import { ProfileActions } from "@/features/profile/components/ProfileActions"; // We'll extract the edit button here

export default async function ProfilePage({ params }: { params: { id: string } }) {
  // 1. Fetch the user profile from the database
  const result = await fetchUserProfile(params.id);

  if (!result.success || !result.data) {
    notFound(); // Triggers the Next.js 404 page if user doesn't exist
  }

  const profile = result.data;

  // 2. Check if the currently logged-in user is viewing their OWN profile
  const cookieStore = await cookies();
  const currentUserId = cookieStore.get("session_token")?.value;
  const isOwnProfile = currentUserId === profile.id;

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {/* Top section: Header + Edit/Follow Button */}
      <div className="relative">
        <ProfileHeader user={profile} />
        
        {/* We only show the "Edit Profile" button if it's their own profile */}
        {isOwnProfile && (
          <div className="absolute top-6 right-6">
             {/* This handles toggling the EditProfileModal we built earlier */}
            <ProfileActions currentBio={profile.bio || ""} />
          </div>
        )}
      </div>

      {/* Bottom section: User's posts */}
      <ProfileFeed posts={profile.posts} userName={profile.name} />
    </div>
  );
}