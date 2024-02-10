import { prisma } from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import IssueStatusBadge from "../../components/IssueStatusBadge";
import Link from "../../components/Link";
import IssueAction from "./IssueAction";
import { Status } from "@prisma/client";

const Issuespage = async ({
  searchParams,
}: {
  searchParams: { status: Status };
}) => {
  const statesus = Object.values(Status);
  const isValid = statesus.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const issues = await prisma.issue.findMany({
    where: { status: isValid },
  });

  return (
    <div>
      <IssueAction />

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created At
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell className="max-w-52">
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden my-1">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default Issuespage;
