import { NextDatas } from '../../variable/Server'
import { SECRETHASH, TokenData, verify } from '../../variable/token'
import { db } from '../../variable/database'
import moment from 'moment'
export default async function GETDATA(req: NextDatas[0], res:NextDatas[1]) {
	const { Type } = req.query
	const date = new Date()
	const Today = moment(date).format('YYYY-MM-DD')
	if (!req.cookies.NssToken) return res.send({ Success: false, UserStatus: false, msg: '로그인이 필요한 시스템 입니다.'})
	const users = verify(req.cookies.NssToken)
  	const [user] = await db.select('*').from('Account').where('id', users.userid)
	if (!users || !user) return res.send({ Success: false, UserStatus: false, msg: '로그인이 필요한 시스템 입니다.'})
	if (Type === 'Main') {
		const [userlog] = await db.select('*').from('logs').orderBy('report', 'desc').limit(1).where('id', user.id)
		if (!userlog) await db.insert({ log: '2005-07-12', id: users.userid, class_number: users.class_number, grade: users.grade, name: users.name, class: users.class, pos1: '가입', pos2: '가입' }).from('logs')
		if (userlog.log != Today || !userlog || !userlog.log) {
			return res.send({ 
				Success: true, 
				UserStatus: true, 
				msg: '', 
				user, 
				Time1: "미정",
				Time2: "미정"
			})
		}
		else {
			return res.send({ 
				Success: true, 
				UserStatus: true, 
				user, 
				Time1: userlog.pos1, 
				Time2: userlog.pos2
			})
		}
	} else if (Type === 'president') {
		if (user.president == 0) return res.send({ Success: false, UserStatus: true, msg: '잘못된 요청 입니다.', user })
		else {
			const log = await db.select('*').from('logs').where('log', Today).where('class', user.class).where('grade', user.grade).orderBy('class_number', 'asc')
			return res.send({ Success: true, UserStatus: true, log, president: user.president, user })
		}
	} else if (Type === 'Admin') {
		if (user.president == 0) return res.send({ Success: false, UserStatus: true, msg: '잘못된 요청 입니다.', user })
		else {
			const Room11 = await db.select('*').from('logs').where('log', Today).where('class', 1).where('grade', 1).orderBy('class_number', 'asc')
			const Room12 = await db.select('*').from('logs').where('log', Today).where('class', 2).where('grade', 1).orderBy('class_number', 'asc')
			const Room13 = await db.select('*').from('logs').where('log', Today).where('class', 3).where('grade', 1).orderBy('class_number', 'asc')
			const Room14 = await db.select('*').from('logs').where('log', Today).where('class', 4).where('grade', 1).orderBy('class_number', 'asc')
			const Room21 = await db.select('*').from('logs').where('log', Today).where('class', 1).where('grade', 2).orderBy('class_number', 'asc')
			const Room31 = await db.select('*').from('logs').where('log', Today).where('class', 1).where('grade', 3).orderBy('class_number', 'asc')
			return res.send({ Success: true, UserStatus: true, Room11, Room12, Room13, Room14, Room21, Room31, user})
		}
	} 
	else return res.send({ Success: false, UserStatus: true, msg: '잘못된 요청 입니다.'})
}
