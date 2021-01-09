import Head from "next/head";
import { GroupTreeView } from "~/components/GroupTreeView";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Vju</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main>
        <h1>Hello, world!</h1>
        <GroupTreeView />
      </main>
    </div>
  );
};

export default Home;
