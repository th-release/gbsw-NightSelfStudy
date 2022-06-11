import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from '../../variable/login'
import { NextDatas } from '../../variable/Server'
import { SECRETHASH } from '../../variable/token' 
export default async function Login (req: NextDatas[0], res: NextDatas[1]) {
	const code = req.query.code
	const data = await fetch('https://auth.gbsw.hs.kr/api/ident', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			code,
			client_id: CLIENT_ID,
			client_secret: CLIENT_SECRET,
			redirect_uri: REDIRECT_URI,
			grant_type: 'authorization_code'
		})
}).then((res) => res.json())
	if (!data.success) return res.send({ success: false, msg: data.message })
	return res.send({ success: true, token: jwt.sign({ userid: data.user.id, name: data.user.name, grade: data.user.grade, class: data.user.class, class_number: data.user.class_number }, SECRETHASH, { expiresIn: '8h' }) })
}