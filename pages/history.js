import Head from "next/head";
import { request } from "../lib/datocms";
import { Image, useQuerySubscription } from "react-datocms";
import TimeAgo from "react-timeago";
import ReactMarkdown from "react-markdown";
import { TransitionGroup, CSSTransition } from "react-transition-group";


const HOMEPAGE_QUERY = `query HomePage($limit: IntType) {
    pruebas(first: $limit) {
      title
    }
  }`;
  export async function getStaticProps() {
    const data = await request({
      query: HOMEPAGE_QUERY,
      variables: { limit: 10 }
    });
    return {
      props: { data }
    };
  }
  export default function Home({ data }) {
    return <div>{JSON.stringify(data, null, 2)}</div>;
  }