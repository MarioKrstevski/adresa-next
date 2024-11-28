import { Listing, User } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { displayPrice } from "@/lib/utils";
import { Eye, Edit, Trash2 } from "lucide-react";
import Link from "next/link";

interface AdminListingsTableProps {
  listings: (Listing & {
    owner: User;
  })[];
}

export default function AdminListingsTable({
  listings,
}: AdminListingsTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created By</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listings.map((listing) => (
            <TableRow key={listing.id}>
              <TableCell>{listing.listingNumber}</TableCell>
              <TableCell className="max-w-[200px] truncate">
                {listing.title || `${listing.type}, ${listing.area}m²`}
              </TableCell>
              <TableCell>{displayPrice(listing.price)}</TableCell>
              <TableCell className="capitalize">{listing.type}</TableCell>
              <TableCell>
                <Badge variant={listing.isVisible ? "default" : "secondary"}>
                  {listing.isVisible ? "Active" : "Draft"}
                </Badge>
              </TableCell>
              <TableCell>{listing.owner.email}</TableCell>
              <TableCell>
                {new Date(listing.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Link href={`/listing/${listing.listingNumber}`}>
                    <Button size="icon" variant="ghost">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link
                    href={`/listing/edit/${listing.listingNumber}/whatever`}
                  >
                    <Button size="icon" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <form
                    action={async () => {
                      "use server";
                      // Delete action will be implemented
                    }}
                  >
                    <Button size="icon" variant="ghost" type="submit">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
