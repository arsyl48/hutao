/**
  * Created by Riy
  * WhatsApp wa.me/6281575886399
  * Follow me on Instagram @riycoders
*/

"use strict";
const {
	default: makeWASocket,
	BufferJSON,
	initInMemoryKeyStore,
	jidDecode,
	DisconnectReason,
	AnyMessageContent,
    makeInMemoryStore,
	useMultiFileAuthState,
	PHONENUMBER_MCC,
	 makeCacheableSignalKeyStore
} = require("@whiskeysockets/baileys")
const PhoneNumber = require('awesome-phonenumber');
const figlet = require("figlet");
const fs = require("fs");
const moment = require('moment')
const chalk = require('chalk')
const logg = require('pino')
const readline = require("readline")
const clui = require('clui')
const { Spinner } = clui
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif2')
const { serialize } = require("./lib/myfunc");
const { color, mylog, infolog } = require("./lib/color");
const time = moment(new Date()).format('HH:mm:ss DD/MM/YYYY')
let setting = JSON.parse(fs.readFileSync('./config.json'));
let welcome = JSON.parse(fs.readFileSync('./database/welcome.json'));

function title() {
      console.clear()
	  console.log(chalk.bold.green(figlet.textSync('WaBot MD', {
		font: 'Standard',
		horizontalLayout: 'default',
		verticalLayout: 'default',
		width: 80,
		whitespaceBreak: false
	})))
	console.log(chalk.yellow(`\n                        ${chalk.yellow('[ Created By Riy ]')}\n\n${chalk.red('New Bot')} : ${chalk.white('WhatsApp Bot Multi Device')}\n${chalk.red('Follow Insta Dev')} : ${chalk.white('@riycoders')}\n${chalk.red('Message Me On WhatsApp')} : ${chalk.white('+62 815-7588-6399')}\n${chalk.red('Donate')} : ${chalk.white('081575886399 ( Dana/Gopay/Pulsa )')}\n`))
}

/**
* Uncache if there is file change;
* @param {string} module Module name or path;
* @param {function} cb <optional> ;
*/
function nocache(module, cb = () => { }) {
	console.log(`Module ${module} sedang diperhatikan terhadap perubahan`) 
	fs.watchFile(require.resolve(module), async () => {
		await uncache(require.resolve(module))
		cb(module)
	})
}
/**
* Uncache a module
* @param {string} module Module name or path;
*/
function uncache(module = '.') {
	return new Promise((resolve, reject) => {
		try {
			delete require.cache[require.resolve(module)]
			resolve()
		} catch (e) {
			reject(e)
		}
	})
}

const store = makeInMemoryStore({ logger: logg().child({ level: 'fatal', stream: 'store' }) })
const pairingCode = !!setting.pairingNumber || process.argv.includes("--code")
const useMobile = process.argv.includes("--qr")
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))

async function riyStart() {
const connectToWhatsApp = async () => {
	process.on("unhandledRejection", (err) => console.error(err))
	const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys')
	const conn = makeWASocket({
            printQRInTerminal: !pairingCode,
            logger: logg({ level: 'silent' }),
            auth: {
         creds: state.creds,
         keys: makeCacheableSignalKeyStore(state.keys, logg({ level: "silent" }).child({ level: "silent" })),//Gw silent biar gk brutal consolenya
      },
            browser: ["Safari (Linux)", "", ""],//Disini custom webnya
	        getMessage: async (key) => {
            if (store) {
                const msg = await store.loadMessage(key.remoteJid, key.id)
                return msg.message || undefined
            }
            return {
                conversation: "hi im yoshino bot"
            }
            }
        })
	//title()
        store.bind(conn.ev)
	
	if (pairingCode && !conn.authState.creds.registered) {
      if (useMobile) throw new Error('Cannot use pairing code with mobile api')

      let phoneNumber
      if (!!setting.pairingNumber) {
         phoneNumber = setting.pairingNumber.replace(/[^0-9]/g, '')

         if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
            console.log(chalk.bgBlack(chalk.redBright("Start with your country's WhatsApp code, Example : 62xxx")))
            process.exit(0)
         }
      } else {
         phoneNumber = await question(chalk.bgBlack(chalk.greenBright(`Please type your WhatsApp number : `)))
         phoneNumber = phoneNumber.replace(/[^0-9]/g, '')

         // Ask again when entering the wrong number
         if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
            console.log(chalk.bgBlack(chalk.redBright("Start with your country's WhatsApp code, Example : 62xxx")))

            phoneNumber = await question(chalk.bgBlack(chalk.greenBright(`Please type your WhatsApp number : `)))
            phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
            rl.close()
         }
      }

      setTimeout(async () => {
         let code = await conn.requestPairingCode(phoneNumber)
         code = code?.match(/.{1,4}/g)?.join("-") || code
         console.log(chalk.black(chalk.bgGreen(`Your Pairing Code : `)), chalk.black(chalk.white(code)))
      }, 3000)
   }

	/* Auto Update */
	require('./message/help')
	require('./lib/myfunc')
	require('./message/msg')
	nocache('./message/help', module => console.log(chalk.greenBright('[ WHATSAPP BOT ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`)))
	nocache('./lib/myfunc', module => console.log(chalk.greenBright('[ WHATSAPP BOT ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`)))
	nocache('./message/msg', module => console.log(chalk.greenBright('[ WHATSAPP BOT ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`)))
	
	conn.multi = true
	conn.nopref = false
	conn.prefa = 'anjing'
	conn.mode = 'public'
	conn.ev.on('messages.upsert', async m => {
		if (!m.messages) return;
		var msg = m.messages[0]
		msg = serialize(conn, msg)
		msg.isBaileys = msg.key.id.startsWith('BAE5') || msg.key.id.startsWith('3EB0')
		require('./message/msg')(conn, msg, m, setting, store, welcome)
	})
	conn.ev.on('connection.update', (update) => {
          if (global.qr !== update.qr) {
           global.qr = update.qr
          }
          const { connection, lastDisconnect } = update
            if (connection === 'close') {
                lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut ? connectToWhatsApp() : console.log('connection logged out...')
            }
			if (connection == 'open')  console.log(chalk.black(chalk.bgWhite(`✅ Berhasil Terhubung...`)))
        })
	conn.ev.on('creds.update', await saveCreds)
	
        conn.ev.on('group-participants.update', async (data) => {
          const isWelcome = welcome.includes(data.id) ? true : false
          if (isWelcome) {
            try {
              for (let i of data.participants) {
                try {
                  var pp_user = await conn.profilePictureUrl(i, 'image')
                } catch {
                  var pp_user = 'https://i0.wp.com/telegra.ph/file/134ccbbd0dfc434a910ab.png'
                }
                if (data.action == "add") {
                  conn.sendMessage(data.id, { image: { url: pp_user }, caption: `Welcome @${i.split("@")[0]}`, mentions: [i] })
                } else if (data.action == "remove") {
                  conn.sendMessage(data.id, { image: { url: pp_user }, caption: `Sayonara @${i.split("@")[0]}`, mentions: [i] })
                }
              }
            } catch (e) {
              console.log(e)
            }
          }
        })

	conn.reply = (from, content, msg) => conn.sendMessage(from, { text: content }, { quoted: msg })
    
    conn.ev.on('contacts.update', update => {
           for (let contact of update) {
             let id = conn.decodeJid(contact.id)
             if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
           }
        })
        
	conn.decodeJid = (jid) => {
		if (!jid) return jid;
		if (/:\d+@/gi.test(jid)) {
			let decode = jidDecode(jid) || {};
			return decode.user && decode.server && decode.user + '@' + decode.server || jid
		} else return jid;
	};

        conn.getName = (jid, withoutContact = false) => {
		var id = conn.decodeJid(jid) || jid;
		withoutContact = conn.withoutContact || withoutContact;
		let v;
		if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
			v = store.contacts[id] || {};
			if (!(v.name || v.subject)) v = conn.groupMetadata(id) || {};
			resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'));
		})
		else v = id === '0@s.whatsapp.net' ? {
			id,
			name: 'WhatsApp',
		} : id === conn.decodeJid(conn.user.id) ?
		conn.user :
		(store.contacts[id] || {})
		return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international');
    }
    
    /**
        * @param {*} jid
        * @param {*} path
        * @param {*} quoted
        * @param {*} options
        * @returns
        */
        conn.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
           let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
           let buffer
           if (options && (options.packname || options.author)) {
             buffer = await writeExifImg(buff, options)
           } else {
             buffer = await imageToWebp(buff)
           }
           await conn.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
           .then( response => {
              fs.unlinkSync(buffer)
              return response
           })
        }

        /**
        * @param {*} jid
        * @param {*} path
        * @param {*} quoted
        * @param {*} options
        * @returns
        */
        conn.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
           let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
           let buffer
           if (options && (options.packname || options.author)) {
             buffer = await writeExifVid(buff, options)
           } else {
             buffer = await videoToWebp(buff)
           }
           await conn.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
           .then( response => {
              fs.unlinkSync(buffer)
              return response
           })
        }
	return conn
}

connectToWhatsApp()
.catch(err => console.log(err))
}

riyStart()
