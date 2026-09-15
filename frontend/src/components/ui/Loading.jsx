import React from 'react'

function Loading({description}) {
  return (
    <main className="min-h-screen bg-[#f7f9fb] px-5 py-6 md:px-8">
                <div className="mx-auto max-w-[1450px]">
                    <div className="flex min-h-[400px] items-center justify-center">
                        <div className="text-center">
                            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-[#00236f] border-t-transparent" />

                            <p className="text-sm text-slate-500">
                                {description || "Loading..."}
                            </p>
                        </div>
                    </div>
                </div>
            </main>
  )
}

export default Loading