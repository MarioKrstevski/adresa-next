import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getUser } from "@/lib/auth";
import { updateUserInfo } from "@/server/actions/user.actions";

export default async function ProfileInfoPage() {
  // we always expect user because of the layout auth
  const user = await getUser();
  // if (!user) {
  //   redirect("/signin?redirect=/profile/info");
  // }
  return (
    <div className="ml-4 mt-4 rounded-lg bg-white p-8 shadow">
      <h3 className="mb-3 text-2xl font-semibold">Profile Info</h3>
      <form
        className="py-2"
        action={async (formData: FormData) => {
          "use server";
          const result = await updateUserInfo(formData);
          // Handle result.success and result.error as needed
        }}
      >
        <div className="mb-2 flex flex-col gap-3">
          <Label htmlFor="firstName">
            First name <span className="text-red-500">*</span>
          </Label>
          <Input
            required
            id="firstName"
            defaultValue={user?.firstName || ""}
            name="firstName"
            placeholder="Your first name"
          />
        </div>

        <div className="mb-2 flex flex-col gap-3">
          <Label htmlFor="lastName">
            Last name <span className="text-red-500">*</span>
          </Label>
          <Input
            required
            id="lastName"
            name="lastName"
            defaultValue={user?.lastName || ""}
            placeholder="Your last name"
          />
        </div>

        <h3 className="mb-3 mt-5 text-2xl font-semibold">Contact Info</h3>

        <div className="mb-2 flex flex-col gap-3">
          <Label htmlFor="phone">
            Telephone <span className="text-red-500">*</span>
          </Label>
          <Input
            required
            id="phone"
            name="phone"
            defaultValue={user?.phone || ""}
            placeholder="(389)77 777 777 "
          />
        </div>

        <div className="mb-2 flex flex-col gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            required
            id="email"
            name="email"
            defaultValue={user?.email || ""}
            disabled
          />
        </div>

        <Button>Save</Button>
      </form>
    </div>
  );
}
