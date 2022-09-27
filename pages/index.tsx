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
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <Container>
          <>
            <Intro />
            {issues
              .filter((issue) => issue.state === "open")
              .map((issue, key) => (
                <Issue key={key} issue={issue} />
              ))}
            {issues
              .filter((issue) => issue.state === "closed")
              .map((issue, key) => (
                <Issue key={key} issue={issue} />
              ))}
          </>
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
