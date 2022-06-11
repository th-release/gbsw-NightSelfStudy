import { CLIENT_ID, REDIRECT_URI } from '../variable/login'
import Head from '../components/head'
import useSWR from 'swr'
import fetcher from '../utils/fetcher'
import Loading from '../components/Loading'
import Footer from '../components/footer'
import moment from 'moment'
import { useState } from 'react'
export default function Home() { 
  const date = new Date()
  const [pos1, setpos1] = useState("교실")
  const [pos2, setpos2] = useState("교실")
  const QueryhandleParam = (setValue: any) => (e: any) => setValue(e.target.value)
  const { data, error } = useSWR('/api/GetData?Type=Main', fetcher)
  async function report() {
    const res = await fetch('/api/report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pos1,
        pos2,
      })
    }).then((res) => res.json())
    if (res.Success == true) return alert(res.msg)
    else return alert(res.msg)
  }

  function MovePage() {
    window.location.replace(`https://nss.gbsw.hs.kr/`)
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
            {data.user.grade <= 2?
              <select onChange={QueryhandleParam(setpos1)}>
                <option selected value="교실">교실</option>
                <option value="도서관">도서관</option>
                <option value="실습실 1">실습실 1</option>
                <option value="실습실 2">실습실 2</option>
                <option value="실습실 3">실습실 3</option>
                <option value="실습실 4">실습실 4</option>
                <option value="랩 3">랩 3실/서버실</option>
                <option value="랩 4">랩 4실</option>
                <option value="메이커교육실">메이커교육실</option>
              </select>
              :
              <select onChange={QueryhandleParam(setpos1)}>
                <option selected value="교실">교실</option>
                <option value="도서관">도서관</option>
                <option value="음악실">음악실</option>
                <option value="실습실 1">실습실</option>
                <option value="컴퓨터교육실">컴퓨터교육실</option>
                <option value="메이커교육실">메이커교육실</option>
                <option value="랩 1">랩 1실</option>
                <option value="랩 2">랩 2실</option>
              </select>
            }
          </div>
         <div className="box1">
          <span className="block_mb-1">야자 2교시 위치</span>
          <span className="block_mb-2">{moment(date).format('YYYY년 MM월 DD일')}</span>
          <br/>
          {data.user.grade <= 2?
              <select onChange={QueryhandleParam(setpos2)}>
                <option selected value="교실">교실</option>
                <option value="도서관">도서관</option>
                <option value="실습실 1">실습실 1</option>
                <option value="실습실 2">실습실 2</option>
                <option value="실습실 3">실습실 3</option>
                <option value="실습실 4">실습실 4</option>
                <option value="랩 3">랩 3실/서버실</option>
                <option value="랩 4">랩 4실</option>
                <option value="메이커교육실">메이커교육실</option>
              </select>
              :
              <select onChange={QueryhandleParam(setpos2)}>
                <option selected value="교실">교실</option>
                <option value="도서관">도서관</option>
                <option value="음악실">음악실</option>
                <option value="실습실 1">실습실</option>
                <option value="컴퓨터교육실">컴퓨터교육실</option>
                <option value="메이커교육실">메이커교육실</option>
                <option value="랩 1">랩 1실</option>
                <option value="랩 2">랩 2실</option>
              </select>
            }
        </div>
        <div>{`한번 보고 하시면 수정 할 수 없으니 신중하게 선택 해주십시오.`}</div><br/>
        <button className="GreenBtn" onClick={report}>보고</button><br/>
        <button className="GrayBtn m-Btn m-TBtn" onClick={MovePage}>메인으로</button>
        <Footer/>
        </div>
      )
    }
  }
}
