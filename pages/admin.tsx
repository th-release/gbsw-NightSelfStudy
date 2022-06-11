import { CLIENT_ID, REDIRECT_URI } from '../variable/login'
import Head from '../components/head'
import useSWR from 'swr'
import fetcher from '../utils/fetcher'
import Loading from '../components/Loading'
import Footer from '../components/footer'
export default function Home() { 
  const date = new Date()
  const { data, error } = useSWR('/api/GetData?Type=Admin', fetcher)
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
      if (data.user.president == 5) {
        return (
          <div>
            <Head/>
            <div className="box1">
              <span className="block_mb-1">1학년 1반</span>
              <ul style={{textAlign: 'center', margin: 0, padding: 0, listStyle: 'none'}}>
                {Object.values(data.Room11).map((log: any) => (
                  <li key={1}>{log.grade+"학년 "+log.class+"반 " + log.class_number + "번 " + log.name +": "+ log.pos1+ ", " + log.pos2}</li>
                ))}
              </ul>
            </div>
            <div className="box1">
              <span className="block_mb-1">1학년 2반</span>
              <ul style={{textAlign: 'center', margin: 0, padding: 0, listStyle: 'none'}}>
                {Object.values(data.Room12).map((log: any) => (
                  <li key={1}>{log.grade+"학년 "+log.class+"반 " + log.class_number + "번 " + log.name +": "+ log.pos1+ ", " + log.pos2}</li>
                ))}
              </ul>
            </div>
            <div className="box1">
              <span className="block_mb-1">1학년 3반</span>
              <ul style={{textAlign: 'center', margin: 0, padding: 0, listStyle: 'none'}}>
                {Object.values(data.Room13).map((log: any) => (
                  <li key={1}>{log.grade+"학년 "+log.class+"반 " + log.class_number + "번 " + log.name +": "+ log.pos1+ ", " + log.pos2}</li>
                ))}
              </ul>
            </div>
            <div className="box1">
              <span className="block_mb-1">1학년 4반</span>
              <ul style={{textAlign: 'center', margin: 0, padding: 0, listStyle: 'none'}}>
                {Object.values(data.Room14).map((log: any) => (
                  <li key={1}>{log.grade+"학년 "+log.class+"반 " + log.class_number + "번 " + log.name +": "+ log.pos1+ ", " + log.pos2}</li>
                ))}
              </ul>
            </div>
            <div className="box1">
              <span className="block_mb-1">2학년 1반</span>
              <ul style={{textAlign: 'center', margin: 0, padding: 0, listStyle: 'none'}}>
                {Object.values(data.Room21).map((log: any) => (
                  <li key={1}>{log.grade+"학년 "+log.class+"반 " + log.class_number + "번 " + log.name +": "+ log.pos1+ ", " + log.pos2}</li>
                ))}
              </ul>
            </div>
            <div className="box1">
              <span className="block_mb-1">3학년 1반</span>
              <ul style={{textAlign: 'center', margin: 0, padding: 0, listStyle: 'none'}}>
                {Object.values(data.Room31).map((log: any) => (
                  <li key={1}>{log.grade+"학년 "+log.class+"반 " + log.class_number + "번 " + log.name +": "+ log.pos1+ ", " + log.pos2}</li>
                ))}
              </ul>
            </div><br/>
            <a href="https://nss.gbsw.hs.kr/"><button className="GrayBtn m-Btn m-TBtn">메인으로</button></a>
            <Footer/>
          </div>
        )
      }
      else {
        return window.location.replace(`https://nss.gbsw.hs.kr`)
      }
    }
  }
}
