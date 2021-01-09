import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { GlobalLayout } from "~/components/GlobalLayout";
import { GroupTreeView } from "~/components/GroupTreeView";
import "../styles/destyle.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <GlobalLayout
        treePanel={<GroupTreeView />}
        main={<Component {...pageProps} />}
      />
    </RecoilRoot>
  );
}

export default MyApp;
