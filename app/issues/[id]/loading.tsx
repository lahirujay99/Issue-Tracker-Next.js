import { Box, Card, Flex, Heading } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingIssueDetail = () => {
  // const skeleton = [1, 2, 3, 4];
  return (
    <Box className="max-w-xl">
      <Heading as="h2">
        <Skeleton />
      </Heading>
      <Flex className="space-x-4" my="2">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className="prose mt-4">
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default LoadingIssueDetail;
