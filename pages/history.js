
import Head from "next/head";
import { request } from "../lib/datocms";
import { useQuerySubscription } from "react-datocms";
import TimeAgo from "react-timeago";
import ReactMarkdown from "react-markdown";
import { TransitionGroup, CSSTransition } from "react-transition-group";


const graphqlRequest = `query HomePage($limit: IntType) {
    pruebas(first: $limit) {
      title
    }
  }`;
  export async function getStaticProps() {
    const data = await request({
      query: graphqlRequest,
      variables: { limit: 10 }
    });
    return {
      props: { data }
    };
  }
  export default function Home({ data }) {
    return <div>{JSON.stringify(data, null, 2)}</div>;
  }