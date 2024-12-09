"use client";
import { Link } from "@/i18n/routing";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { User } from "@prisma/client";
import userProfileBg from "@/assets/user-profile-bg.svg";
import { useRouter } from "next/navigation";
import { logout } from "@/server/actions/auth.actions";
import { useTranslations } from "next-intl";

export default function UserControls({ user }: { user: User }) {
  const router = useRouter();
  const t = useTranslations();

  async function handleLogout() {
    const result = await logout();
    if (result.success) {
      router.refresh();
    }
  }
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage
            src={
              user.picture
                ? user.picture
                : !user.firstName || !user.lastName
                  ? undefined
                  : userProfileBg
            }
          />
          <AvatarFallback>
            {user.firstName && user.lastName ? (
              <span>
                {user.firstName![0].toUpperCase()}
                {user.lastName![0].toUpperCase()}
              </span>
            ) : (
              "RND"
            )}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="z-[220] p-4">
        <ul className="flex flex-col gap-2">
          <li>
            <Link href="/profile/info">{t("header.userControls.profile")}</Link>
          </li>
          {/* <li>
              <Link href="/profile/settings">Settings</Link>
            </li> */}
          <li>
            <form action={handleLogout}>
              <button>{t("header.userControls.logout")}</button>
            </form>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
}
