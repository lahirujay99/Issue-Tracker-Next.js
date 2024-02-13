import { prisma } from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssueChart from "./IssueChart";
import { Flex } from "@radix-ui/themes";

export default async function Home() {
  const open = await prisma.issue.count({
    where: { status: "OPEN" },
  });
  const in_progress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const close = await prisma.issue.count({
    where: { status: "CLOSE" },
  });
  return (
    <Flex direction="column" gap="3">
      <LatestIssues />
      <IssueSummary open={open} inProgress={in_progress} closed={close} />
      <IssueChart open={open} inProgress={in_progress} closed={close} />
    </Flex>
  );
}
