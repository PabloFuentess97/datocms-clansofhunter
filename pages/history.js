
import { request } from "../lib/datocms";



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