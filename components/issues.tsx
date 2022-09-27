import Issue from "../interfaces/post";

type Props = {
  issue: Issue;
};

const Issue = ({ issue }: Props) => {
  return (
    <section>
      <h1>{issue.title}</h1>
      <h3>{issue.state}</h3>
      <h2>{issue.description}</h2>
    </section>
  );
};

export default Issue;
