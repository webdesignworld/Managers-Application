

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import Link from "next/link";
import challenges from "@/data/challenges";
import { Challenge } from "@/types/challenges";
import { Button } from "../ui/button";
import { Edit2, Trash2 } from "lucide-react";

interface ChallengesTableProps {
  limit?: number;
  title?: string;
}

const ChallengesTable = ({ limit, title }: ChallengesTableProps) => {
  return (
    <>
      <div className="mt-10">
        <h3 className="text-2xl mb-4 font-semibold">
          {title ? title : "Challenges"}
        </h3>
        <Link href="/challenge-form">
          <button className="bg-purple-500 hover:bg-blue-700 text-white font-bold py-2 ml-4 px-4 text-xs rounded-md">
            New Challenge
          </button>
        </Link>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead className="hidden md:table-cell text-right">
                Created at
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {challenges.map((challenge) => (
              <TableRow key={challenge.id}>
                <TableCell>{challenge.title}</TableCell>
                <TableCell>{challenge.category}</TableCell>
                <TableCell>{challenge.level}</TableCell>
                <TableCell className="hidden md:table-cell text-right">
                  {challenge.createdAt}
                </TableCell>
                <TableCell className="flex items-center gap-2 justify-end">
                  {/* Edit Button */}
                  <Link href={`/challenges-form-edit/${challenge.id}`}>
                    <button className="bg-purple-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-xs rounded-md">
                      <Edit2 size={16} />
                    </button>
                  </Link>

                  {/* Delete Button */}
                  <Link href={`/challenges/delete/${challenge.id}`}>
                    <button className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-xs rounded-md">
                      <Trash2 size={16} />
                    </button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ChallengesTable;
