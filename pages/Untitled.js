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