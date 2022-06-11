import { useRouter } from "next/router";
import useSWR from "swr";
import Loading from "../components/Loading";
import fetcher from "../utils/fetcher";
import Head from '../components/head'
import { CLIENT_ID, REDIRECT_URI } from "../variable/login";

export default function CheckAccount () {
  const router = useRouter()
  const { data, error } = useSWR('/api/AccountCheck', fetcher)
  if (error) {
    window.location.replace(`https://auth.gbsw.hs.kr/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`)
    return (
      <>
        <Head />
      </>
    )
  }
  if (!data) {
    return (<Loading />)
  } else {
    if (data.Success == false) {
      window.location.replace(`https://auth.gbsw.hs.kr/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`)
      return (
        <>
        </>
      )
    } else {
      router.push('/')
      return (
        <>
        </>
      )
    }
  }
}