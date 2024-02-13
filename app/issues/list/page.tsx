import Pagination from "@/app/components/Pagination";
import { prisma } from "@/prisma/client";
import { Status } from "@prisma/client";
import IssueAction from "./IssueAction";
import IssueTable, { IssueQuery, columnNames } from "./IssueTable";
import { Flex } from "@radix-ui/themes";

interface Props {
  searchParams: IssueQuery;
}

const Issuespage = async ({ searchParams }: Props) => {
  const statesus = Object.values(Status);
  const status = statesus.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where = { status };

  const sortBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const issues = await prisma.issue.findMany({
    where,
    orderBy: sortBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="3">
      <IssueAction />
      <IssueTable issues={issues} searchParams={searchParams} />
      <Pagination
        pageSize={pageSize}
        itemCount={issueCount}
        currentPage={page}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export default Issuespage;
