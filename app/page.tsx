import { prisma } from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";

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
    <Grid columns={{ initial: "1", md: "2" }} gap="4">
      <Flex direction="column" gap="4">
        <IssueSummary open={open} inProgress={in_progress} closed={close} />
        <IssueChart open={open} inProgress={in_progress} closed={close} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "view a summary of project issues",
};
