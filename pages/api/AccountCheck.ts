import { db } from "../../variable/database";
import { NextDatas } from "../../variable/Server";
import { verify } from "../../variable/token";
export default async function AccountCheck (req: NextDatas[0], res: NextDatas[1]) {
    const token = req.cookies.NssToken
    const NSS = verify(token)
    if(!token || !NSS) return res.send({ Success: false })
    const [user] = await db.select('*').from('Account').where('id', NSS.userid)
    if (!user) {
        await db.insert({ id: NSS.userid, name: NSS.name, grade: NSS.grade, class: NSS.class, class_number: NSS.class_number }).from('Account')
        await db.insert({ log: '2005-07-12', id: NSS.userid, class_number: NSS.class_number, grade: NSS.grade, name: NSS.name, class: NSS.class, pos1: '가입', pos2: '가입' }).from('logs')
        return res.send({ Success: true })
    } else return res.send({ Success: true })
}