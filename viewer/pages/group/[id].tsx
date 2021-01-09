import { GetServerSideProps } from "next";
type ServerSideProps = {
  id: number;
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

  return {
    props: {
      id,
    },
  };
};

const GroupPage: React.VFC<ServerSideProps> = ({ id }) => {
  return <p>Group {id}</p>;
};
export default GroupPage;
