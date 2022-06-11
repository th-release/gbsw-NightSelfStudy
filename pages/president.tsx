import { CLIENT_ID, REDIRECT_URI } from '../variable/login'
import Head from '../components/head'
import useSWR from 'swr'
import fetcher from '../utils/fetcher'
import Loading from '../components/Loading'
import Footer from '../components/footer'
import moment from 'moment'
export default function Home() { 
  const date = new Date()
  const { data, error } = useSWR('/api/GetData?Type=president', fetcher)
  function AdminMovePage() {
    window.location.replace(`https://nss.gbsw.hs.kr/admin`)
  }
  if (error) {
    window.location.replace(`https://auth.gbsw.hs.kr/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`)
    return (
      <Head/>
    )
  }
  if (!data) {
    return (
      <Loading/>
    )
  } else {
    if (data.UserStatus == false) return window.location.replace(`https://auth.gbsw.hs.kr/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`)
    if (data.user.president == 0 ) {
      window.location.replace(`https://auth.gbsw.hs.kr/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`)
      return (
        <>
          <Head/>
        </>
      )
    } else {
      if (data.user.president == 0) return window.location.replace(`https://nss.gbsw.hs.kr`)
      else {
        return (
          <div>
            <Head/>
            <div className="box1">
              <span className="block_mb-1">{data.user.grade+"학년 "+data.user.class+"반"}</span>
              <ul style={{textAlign: 'center', margin: 0, padding: 0, listStyle: 'none'}}>
                {Object.values(data.log).map((log: any) => (
                  <li className="m-Btm2px" key={1}>{log.grade+"학년 "+log.class+"반 " + log.class_number + "번 " + log.name +": "+ log.pos1+ ", " + log.pos2}</li>
                ))}
              </ul>
            </div><br/>
            {(data.user.president == 5)?
              <a href="https://nss.gbsw.hs.kr/admin"><button className="RedBtn">관리</button></a>:
            ""}
            <br/><a href="https://nss.gbsw.hs.kr/"><button className="GrayBtn m-Btn m-TBtn">메인으로</button></a>
            <Footer/>
          </div>
        )

      }
    }
  }
}
