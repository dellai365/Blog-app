import { useEffect, useState } from "react"

const useFetch = (url) => {

    const [data, setData] = useState(null)
    const [isLoading, setisLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const abortCont = new AbortController()                       


        setTimeout(() => {
            fetch(url,{signal:abortCont.signal})
                .then(res => {
                    if (!res.ok) {
                        throw Error("pas de data")
                    }
                    return res.json();
                })
                .then(data => {
                    setData(data)
                    setisLoading(false)
                    setError(null)
                })
                .catch((err) => {
                    if (err.name === 'AbortError'){
                        console.log("fetch aborted")
                    }else{
                    setisLoading(false)
                    setError(err.message)
                    }
                }

                )


        },250

        )
        return ()=>abortCont.abort()
    }, [url])
    return{data,isLoading,error}

}

export default useFetch;