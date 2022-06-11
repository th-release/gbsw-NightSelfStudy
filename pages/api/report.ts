import { db } from "../../variable/database";
import { NextDatas } from "../../variable/Server";
import { verify } from "../../variable/token";
import moment from "moment";
export default async function AccountCheck (req: NextDatas[0], res: NextDatas[1]) {
    const date = new Date()
    const { pos1, pos2 } = req.body
    const NssToken = verify(req.cookies.NssToken)
    const [user] = await db.select('*').from('Account').where('id', NssToken.userid)
    if (!user || !NssToken) return res.send({ Success: false, msg: '토큰이 만료 되었습니다. \n\n다시 로그인 해주십시오' })
    else {
        const [userlog] = await db.select('*').from('logs').orderBy('report', 'desc').limit(1).where('id', user.id)
        const Today = moment(date).format('YYYY-MM-DD')
        if (userlog.log === Today) return res.send({
            Success: false, 
            msg: '오늘 위치 정보(이)가 이미 보고 되었습니다. \n\n( 수정이 불가 합니다. )' 
        })
        else {
            await db.insert({ 
                log: Today,
                id: user.id, 
                name: user.name, 
                grade: user.grade, 
                class_number: user.class_number,
                class: user.class, 
                pos1: pos1, 
                pos2: pos2
            }).from('logs')
            return res.send({ 
                Success: true, 
                msg: '보고가 완료 되었습니다. \n\n[+] 수정은 불가 합니다.' 
            })
        }
    }
}