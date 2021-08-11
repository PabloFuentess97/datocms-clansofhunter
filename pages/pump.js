import Head from "next/head";
import { request } from "../lib/datocms";
import { Image, useQuerySubscription } from "react-datocms";
import TimeAgo from "react-timeago";
import ReactMarkdown from "react-markdown";
import { TransitionGroup, CSSTransition } from "react-transition-group";

export async function getServerSideProps() {
  const graphqlRequest = {
    query: `
      query HomePage($limit: IntType) {
        pumps: allPumps(first: $limit, orderBy:_firstPublishedAt_DESC) {
          id
          asset
          name
          symbol
          swap
          chart
          
          
          _firstPublishedAt
          photos {
            responsiveImage(imgixParams: {auto: [format]}) {
              ...imageFields
            }
          }
          author {
            name
            avatar {
              responsiveImage(imgixParams: {auto: [format], w: 60}) {
                ...imageFields
              }
            }
          }
        }
      }

      fragment imageFields on ResponsiveImage {
        aspectRatio
        base64
        height
        sizes
        src
        srcSet
        width
        alt
        title
      }
    `,
    variables: { limit: 10 },
  };

  return {
    props: {
      subscription: {
        ...graphqlRequest,
        initialData: await request(graphqlRequest),
        token: process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN,
      },
    },
  };
}

export default function Home({ subscription }) {
  const { data, error, status } = useQuerySubscription(subscription);

  return (
    <div className="text-gray-700 body-font py-12 bg-gray-100 px-10">
      <Head>
        <title>ClansOfHunter | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-screen-sm mx-auto text-center">
        <p className="text-base leading-6 text-indigo-600 font-semibold tracking-wide uppercase">
          Real-times Updates 
        </p>
        <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-5xl sm:leading-10">
          ClansOfHunter
        </h3>
        <p className="mt-4 max-w-xl text-xl leading-7 text-gray-500 lg:mx-auto">
          Pump a random coin chosen by the server, no one will know the coin before 
        </p>
      </div>

      <div className="max-w-screen-sm mx-auto text-center mt-20 mb-12">
        {status === "connecting" ? (
          <div>Connecting to ClansOfHunter...</div>
        ) : status === "connected" ? (
          <div className="flex flex-col md:flex-row items-center justify-center">
            <span className="flex h-3 w-3 relative mb-3 md:mb-0 md:mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
            </span>
            <span>Connected to ClansOfHunter, receiving live updates!</span>
          </div>
        ) : (
          <div>Connection closed</div>
        )}
      </div>

          
      {error && (
        <div className="max-w-screen-sm my-12 mx-auto">
          <h1 className="title-font text-lg font-bold text-gray-900 mb-3">
            Error: {error.code}
          </h1>
          <div className="my-5">{error.message}</div>
          {error.response && (
            <pre className="bg-gray-100 p-5 mt-5 font-mono">
              {JSON.stringify(error.response, null, 2)}
            </pre>
          )}
        </div>
      )}

      
      
<div class="max-w-screen md:w-1/3 mx-auto">
    <div class="flex flex-row space-y-2 items-center justify-center h-full py-4 bg-gray-800 rounded-xl space-x-10">
      <div class="w-auto h-">
        <img class="flex-1 h-full rounded-lg" src="https://bscscan.com/token/images/pancakebunny_32.png" />
      </div>
      <div class="w-2/3 space-y-1">
        <p class="w-full text-2xl font-semibold text-white">Bunny Token</p>
        <p class="w-full text-1xl font-semibold text-white">BUNNY</p>
        <p class="w-full pb-8 text-sm tracking-wide leading-tight text-white">The card layouts can vary to support the types of content they contain.</p>
        <div class="rounded mr-auto space-y-5">
          <div class="opacity-95 border rounded-lg border-white px-4">
            <p class="m-auto inset-0 text-sm font-medium leading-normal text-center text-white py-2">License</p>
          </div>
          <div class="opacity-95 border rounded-lg border-white px-4">
            <p class="m-auto inset-0 text-sm font-medium leading-normal text-center text-white py-2">License</p>
          </div>
        </div>
      </div>
    </div>
  </div>




      <div className="max-w-screen-sm mx-auto my-12">
        {data && (
          <TransitionGroup>
            {data.pumps.map((pump) => (
              <CSSTransition
                key={pump.id}
                classNames={{
                  enter: "post-enter",
                  enterActive: "post-enter-active",
                  exit: "post-exit",
                  exitActive: "post-exit-active",
                }}
                timeout={{ enter: 1200, exit: 1200 }}
              >
                <div>
                  <div className="shadow-xl rounded-lg overflow-hidden bg-white">
                    {pump.photos.map((photo) => (
                      <Image
                        key={photo.responsiveImage.src}
                        className="w-full"
                        data={photo.responsiveImage}
                      />
                    ))}

                    {pump.asset && (
                      <div className="p-4 md:p-8 md:text-xl content">
                        <ReactMarkdown children={pump.asset} />
                      </div>
                    )}

                    {pump.name && (
                      <div className="p-4 md:p-8 md:text-xl content">
                        <ReactMarkdown children={pump.name} />
                      </div>
                    )}

                    {pump.symbol && (
                      <div className="p-4 md:p-8 md:text-xl content">
                        <ReactMarkdown children={pump.symbol} />
                      </div>
                    )}

                    {pump.swap && (
                      <div className="p-4 md:p-8 md:text-xl content">
                        <ReactMarkdown children={pump.swap} />
                      </div>
                    )}

                    {pump.chart && (
                      <div className="p-4 md:p-8 md:text-xl content">
                        <ReactMarkdown children={pump.chart} />
                      </div>
                    )}

                    
                  </div>
                  <div className="mt-4 grid grid-cols-2 text-xs md:text-sm text-gray-500 md:px-8 items-center pb-12">
                    <div className="flex items-center">
                      <Image
                        className="w-6 h-6 rounded-full mr-2 shadow"
                        data={pump.author.avatar.responsiveImage}
                      />
                      <div>{pump.author.name}</div>
                    </div>
                    <div className="text-right">
                      <TimeAgo date={pump._firstPublishedAt} />
                    </div>
                  </div>
                </div>
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </div>
    </div>
  );
}
