export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col min-h-screen py-2 justify-center items-center">
      <h1 className="text-2xl mb-4">Profile</h1>
      <p className="text-4xl">Profile of {params.id}</p>
    </div>
  );
}
