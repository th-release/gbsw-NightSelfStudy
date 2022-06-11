import { REDIRECT_URI, CLIENT_ID } from '../variable/login';
import { useRouter } from 'next/router'
import useSWR from 'swr'
import fetcher from '../utils/fetcher';
import Loading from '../components/Loading';
import Head from '../components/head'
export default function Callback () {
  const router = useRouter()
  const url = new URL(router.asPath, 'https://nss.gbsw.hs.kr')
  const code = url.searchParams.get('code')

  const { data, error } = useSWR('/api/login?code=' + code, fetcher);
  if (error){
    window.location.replace(`https://auth.gbsw.hs.kr/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`)
    return (
      <>
      </>
    )
    }
    if(!data || !data?.success){
        return(
          <Loading/>
        ) 
    }
  if (data.success) { 
    document.cookie = 'NssToken=' + data.token
    router.replace('/Account')
  }
  return (
    <div className="box1">
      <Head/>
      <span style={{fontSize: '23px'}}>연결 중...</span><br/>
      <span className={"block_mb-3"}>인터넷 연결 상태를 확인해주세요.</span>
    </div>
  )
}