import { Group } from "@prisma/client";
import { GetServerSideProps } from "next";
import { apiClient } from "~/utils/apiClient";
type ServerSideProps = {
  group: Group;
};

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (
  context
) => {
  const id = parseInt(String(context.params?.id), 10);
  if (!Number.isFinite(id)) {
    return {
      notFound: true,
    };
  }

  const groupRes = await apiClient.group._groupId(id).get();

  return {
    props: {
      group: groupRes.body.group,
    },
  };
};

const GroupPage: React.VFC<ServerSideProps> = ({ group }) => {
  return <p>Group {group.name}</p>;
};
export default GroupPage;
