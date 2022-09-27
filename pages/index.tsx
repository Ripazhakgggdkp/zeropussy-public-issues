import Container from "../components/container";
import Intro from "../components/intro";
import Layout from "../components/layout";
import { getAllPosts } from "../lib/api";
import Head from "next/head";
import { CMS_NAME } from "../lib/constants";
import Post from "../interfaces/post";
import Issue from "../components/issues";

type Props = {
  issues: Post[];
};

export default function Index({ issues }: Props) {
  return (
    <>
      <Layout>
        <Head>
          <title>ZeroPussy Backlog</title>
        </Head>
        <div className="text-8xl font-extralight mb-5 sticky top-0 bg-white opacity-100 p-5">
          Backlog
        </div>
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-3 mb-10">
            {issues
              .filter((issue) => issue.state === "open")
              .map((issue, key) => (
                <Issue key={key} issue={issue} />
              ))}
          </div>
        </Container>
        <div className="text-8xl font-extralight mb-5 sticky top-0 bg-white p-5">
          Closed
        </div>
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-3 mb-10">
            {issues
              .filter((issue) => issue.state === "closed")
              .map((issue, key) => (
                <Issue key={key} issue={issue} />
              ))}
          </div>
        </Container>
      </Layout>
    </>
  );
}
export async function getStaticProps(): Promise<{ props: Props }> {
  const posts = await getAllPosts();
  return {
    props: {
      issues: posts,
    },
  };
}
