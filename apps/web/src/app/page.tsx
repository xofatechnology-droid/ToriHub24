import { Button, Card, CardHeader, CardTitle, CardContent, CardFooter } from "@torihub/ui";
import { db } from "@torihub/db";

export default async function Home() {
  // Example of using your local DB package (Will be empty until we seed the database)
  const userCount = await db.user.count().catch(() => 0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Welcome to ToriHub24</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            Your monorepo is successfully configured and running.
          </p>
          <div className="p-4 bg-gray-100 rounded-md">
            <p className="text-sm font-medium">Total Registered Users: {userCount}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button variant="outline">Learn More</Button>
          <Button>Join Community</Button>
        </CardFooter>
      </Card>
    </div>
  );
}