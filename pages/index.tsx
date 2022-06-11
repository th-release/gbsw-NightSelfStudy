import { CLIENT_ID, REDIRECT_URI } from '../variable/login'
import Head from '../components/head'
import useSWR from 'swr'
import fetcher from '../utils/fetcher'
import Loading from '../components/Loading'
import Footer from '../components/footer'
import moment from 'moment'
export default function Home() { 
  const date = new Date()
  const { data, error } = useSWR('/api/GetData?Type=Main', fetcher)
  function UserMovePage() {
    window.location.replace(`https://nss.gbsw.hs.kr/user`)
  }
  function PresidentMovePage() {
    window.location.replace(`http://nss.gbsw.hs.kr/president`)
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
    if (data.UserStatus == false) {
      window.location.replace(`https://auth.gbsw.hs.kr/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`)
      return (
        <>
          <Head/>
        </>
      )
    } else {
      return (
        <div>
          <Head/>
          <div className="box1">
            <span className="block_mb-1">야자 1교시 위치</span>
            <span className="block_mb-2">{moment(date).format('YYYY년 MM월 DD일')}</span>
            <br/>
            <span className={"block_mb-5 "+ (data.Time1 === "미정"?"textcolor-gray":"textcolor-Success")}>{data.Time1}</span>
          </div>
          <div className="box1">
            <span className="block_mb-1">야자 2교시 위치</span>
            <span className="block_mb-2">{moment(date).format('YYYY년 MM월 DD일')}</span>
            <br/>
            <span className={"block_mb-5 "+ (data.Time2 === "미정"?"textcolor-gray":"textcolor-Success")}>{data.Time2}</span>
          </div>
          <div>{`${data.user.grade}학년 ${data.user.class}반 ${data.user.name}님으로 로그인 됨`}</div><br/>
          <button className={"GreenBtn "+ (data.user.president == 0?"m-Btn":"") } onClick={UserMovePage}>보고</button><br/>
          {(data.user.president >= 1)?
          <button className={"RedBtn " + (data.user.president >= 1?"m-Btn m-TBtn":"") } onClick={PresidentMovePage}>관리</button>:
          ""}
          <Footer/>
        </div>
      )
    }
  }
}
