/**
  * Created by Riy
  * WhatsApp wa.me/6281575886399
  * Follow me on Instagram @riycoders
*/

"use strict";
const {
	downloadContentFromMessage,
	generateWAMessageFromContent
} = require("@whiskeysockets/baileys")
const { color, bgcolor } = require('../lib/color')
const { generateProfilePicture, getBuffer, fetchJson, fetchText, getRandom, getGroupAdmins, runtime, sleep, makeid } = require("../lib/myfunc");
const { webp2mp4File } = require("../lib/convert")
const { isLimit, limitAdd, getLimit, giveLimit, addBalance, kurangBalance, getBalance, isGame, gameAdd, givegame, cekGLimit } = require("../lib/limit");
const { addPlayGame, getJawabanGame, isPlayGame, cekWaktuGame, getGamePosi } = require("../lib/game");
const { isTicTacToe, getPosTic } = require("../lib/tictactoe");
const tictac = require("../lib/tictac");
const _prem = require("../lib/premium");
const { genMath, modes } = require("../lib/math");

const fs = require ("fs");
const moment = require("moment-timezone");
const util = require("util");
const { exec, spawn } = require("child_process");
const ffmpeg = require("fluent-ffmpeg");
const fetch = require("node-fetch");
const axios = require("axios");
const speed = require("performance-now");
const request = require("request");
const ms = require("parse-ms");

// Exif
const Exif = require("../lib/exif")
const exif = new Exif()

// Werewolf
const {
    emoji_role,
    sesi,
    playerOnGame,
    playerOnRoom,
    playerExit,
    dataPlayer,
    dataPlayerById,
    getPlayerById,
    getPlayerById2,
    killWerewolf,
    killww,
    dreamySeer,
    sorcerer,
    protectGuardian,
    roleShuffle,
    roleChanger,
    roleAmount,
    roleGenerator,
    addTimer,
    startGame,
    playerHidup,
    playerMati,
    vote,
    voteResult,
    clearAllVote,
    getWinner,
    win,
    pagi,
    malam,
    skill,
    voteStart,
    voteDone,
    voting,
    run,
    run_vote,
    run_malam,
    run_pagi
} = require("../lib/werewolf")

// DB Game
let asahotak = [];
let caklontong = [];
let family100 = [];
let siapakahaku = [];
let susunkata = [];
let tebakbendera = [];
let tebakgambar = [];
let tebakkalimat = [];
let tebakkata = [];
let tebakkimia = [];
let tebaklirik = [];
let kuis = [];
let math = [];
let tictactoe = [];
let casino = [];

// Database
let pendaftar = JSON.parse(fs.readFileSync('./database/user.json'))
let mess = JSON.parse(fs.readFileSync('./message/response.json'));
let premium = JSON.parse(fs.readFileSync('./database/premium.json'));
let balance = JSON.parse(fs.readFileSync('./database/balance.json'));
let limit = JSON.parse(fs.readFileSync('./database/limit.json'));
let glimit = JSON.parse(fs.readFileSync('./database/glimit.json'));
let secreto = JSON.parse(fs.readFileSync('./database/secreto_balas.json'));
let antilink = JSON.parse(fs.readFileSync('./database/antilink.json'));

moment.tz.setDefault("Asia/Jakarta").locale("id");

module.exports = async(conn, msg, m, setting, store, welcome) => {
	try {
		let { ownerNumber, botName, packname, author, pathimg, apikey, hmm, gamewaktu, limitCount } = setting
		let { allmenu } = require('./help')
		if (msg.mentioned && msg.mentioned.includes('')) { Object.keys(msg.mentioned).forEach((i) => { if (msg.mentioned[i] == '') { msg.mentioned.splice(i, 1) } }) }
		const { type, isQuotedMsg, quotedMsg, now, fromMe, mentioned, isBaileys } = msg
		if (isBaileys) return
		const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
		let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
		const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)
		const content = JSON.stringify(msg.message)
		const from = msg.key.remoteJid
		const chats = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type === 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type === 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type === 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type === 'buttonsResponseMessage') && quotedMsg.fromMe && msg.message.buttonsResponseMessage.selectedButtonId ? msg.message.buttonsResponseMessage.selectedButtonId : (type === 'templateButtonReplyMessage') && quotedMsg.fromMe && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : (type == 'listResponseMessage') && quotedMsg.fromMe && msg.message.listResponseMessage.singleSelectReply.selectedRowId ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ""
        const toJSON = j => JSON.stringify(j, null,'\t')
        

		if (conn.multi) {
			var prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(chats) ? chats.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '#'
		} else {
			if (conn.nopref) {
				prefix = ''
			} else {
				prefix = conn.prefa
			}
		}

		const args = chats.split(' ')
		const command = chats.toLowerCase().split(' ')[0] || ''
		const isCmd = command.startsWith(prefix)
		const isGroup = msg.key.remoteJid.endsWith('@g.us')
		const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
		const isOwner = ownerNumber.includes(sender)
		const pushname = msg.pushName
		const q = chats.slice(command.length + 1, chats.length)
		const body = chats.startsWith(prefix) ? chats : ''
		const botNumber = conn.user.id.split(':')[0] + '@s.whatsapp.net'
		const groupMetadata = isGroup ? await conn.groupMetadata(from) : ''
		const groupName = isGroup ? groupMetadata.subject : ''
		const groupId = isGroup ? groupMetadata.id : ''
		const groupMembers = isGroup ? groupMetadata.participants : ''
		const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
		const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
		const isGroupAdmins = groupAdmins.includes(sender)
		const isUser = pendaftar.includes(sender)
		const isPremium = isOwner ? true : _prem.checkPremiumUser(sender, premium)
        const isWelcome = isGroup ? welcome.includes(from) ? true : false : false
        const isAntiLink = antilink.includes(from)

		const gcounti = setting.gcount
		const gcount = isPremium ? gcounti.prem : gcounti.user

		const mentionByTag = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.mentionedJid : []
        const mentionByReply = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.participant || "" : ""
        const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
        mention != undefined ? mention.push(mentionByReply) : []
        const mentionUser = mention != undefined ? mention.filter(n => n) : []
		
		async function downloadAndSaveMediaMessage (msg, type_file, path_file) {
           if (type_file === 'image') {
             var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
             let buffer = Buffer.from([])
             for await(const chunk of stream) {
               buffer = Buffer.concat([buffer, chunk])
             }
             fs.writeFileSync(path_file, buffer)
             return path_file
           } else if (type_file === 'video') {
             var stream = await downloadContentFromMessage(msg.message.videoMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
             let buffer = Buffer.from([])
             for await(const chunk of stream) {
               buffer = Buffer.concat([buffer, chunk])
             }
             fs.writeFileSync(path_file, buffer)
             return path_file
           } else if (type_file === 'sticker') {
             var stream = await downloadContentFromMessage(msg.message.stickerMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
             let buffer = Buffer.from([])
             for await(const chunk of stream) {
               buffer = Buffer.concat([buffer, chunk])
             }
             fs.writeFileSync(path_file, buffer)
             return path_file
           } else if (type_file === 'audio') {
             var stream = await downloadContentFromMessage(msg.message.audioMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.audioMessage, 'audio')
             let buffer = Buffer.from([])
             for await(const chunk of stream) {
               buffer = Buffer.concat([buffer, chunk])
             }
             fs.writeFileSync(path_file, buffer)
             return path_file
           }
        }
		const sendFileFromUrl =async (from, url, caption, options ={}, quoted ) => {
            let res = await axios.head(url)
            let mime = res.headers['content-type']
            if (mime.split("/")[1] === "gif") {
                return await conn.sendMessage(from, { video: { url : await convertToVideo(url, '.gif') }, caption: caption, gifPlayback: true}, {quoted: msg}, options)
                }
            let type = mime.split("/")[0]+"Message"
            if(mime.split("/")[0] === "image"){
                return conn.sendMessage(from, { image: await getBuffer(url), caption: caption, height: 3264, width: 2448}, {quoted: msg }, options)
            } else if(mime.split("/")[0] === "video"){
                return conn.sendMessage(from, { video: await getBuffer(url), caption: caption, height: 848, width: 848}, {quoted: msg}, options)
            } else if(mime.split("/")[0] === "audio"){
                return conn.sendMessage(from, { audio: await getBuffer(url), caption: caption, mimetype: 'audio/mpeg'}, {quoted: msg}, options)
            } else {
                let a = await getBuffer(url)
                let b = './temp/' + getRandom()
                let c = fs.writeFileSync(b, a)
                let d = await mimes.fromFile(b)
                let messege = await conn.sendMessage(from, { document: { url: b }, mimetype: d.mime, fileName: caption}, {quoted: msg}, options)
                fs.unlinkSync(b)
                return messege
            }
        }
		const isUrl = (url) => {
			return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
        }
		const isEmoji = (emo) => {
            let emoji_ranges = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
            let regexEmoji = new RegExp(emoji_ranges, 'gi');
            return emo.match(regexEmoji)
        }
		function jsonformat(string) {
            return JSON.stringify(string, null, 2)
        }
		function monospace(string) {
            return '```' + string + '```'
        }
		function randomNomor(min, max = null) {
		  if (max !== null) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min + 1)) + min;
		  } else {
			return Math.floor(Math.random() * min) + 1
		  }
		}
		const pickRandom = (arr) => {
			return arr[Math.floor(Math.random() * arr.length)]
		}
		function mentions(teks, mems = [], id) {
			if (id == null || id == undefined || id == false) {
			  let res = conn.sendMessage(from, { text: teks, mentions: mems })
			  return res
			} else {
		      let res = conn.sendMessage(from, { text: teks, mentions: mems }, { quoted: msg })
		      return res
 		    }
		}
		const nebal = (angka) => {
            return Math.floor(angka)
        }
		function parseMention(text = '') {
            return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
       }
       const reply = (teks) => {
            return conn.sendMessage(from, { text: teks, mentions: parseMention(teks) }, { quoted: msg })
        }
		const sendMess = (hehe, teks) => {
			conn.sendMessage(hehe, { text, teks })
		}
		async function sendStickerFromUrl(from, url, packname1 = packname, author1 = author, options = {}) {
            var names = Date.now() / 10000;
            var download = function (uri, filename, callback) {
                request.head(uri, function (err, res, body) {
                    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                });
            };
            exif.create(packname1, author1, `sendstc_${names}`)
            download(url, './sticker/' + names + '.png', async function () {
                let filess = './sticker/' + names + '.png'
                let asw = './sticker/' + names + '.webp'
                exec(`ffmpeg -i ${filess} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${asw}`, async (err) => {
                    exec(`webpmux -set exif ./sticker/sendstc_${names}.exif ${asw} -o ${asw}`, async (error) => {
                        conn.sendMessage(from, { sticker: fs.readFileSync(asw) }, options)
                        fs.unlinkSync(filess)
                        fs.unlinkSync(asw)
                        fs.unlinkSync(`./sticker/sendstc_${names}.exif`)
                    })
                })
            })
        }

		const isImage = (type == 'imageMessage')
		const isVideo = (type == 'videoMessage')
		const isSticker = (type == 'stickerMessage')
		const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
		const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false
		const isQuotedDocument = isQuotedMsg ? content.includes('documentMessage') ? true : false : false
		const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
		const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false

		// Auto Read & Presence Online
		if (conn.mode === 'self'){
            if (!fromMe && !isOwner) return
            if (fromMe && isBaileys) return
        }

		// Auto Registrasi
		if (isCmd && !isUser) {
		  pendaftar.push(sender)
		  fs.writeFileSync('./database/user.json', JSON.stringify(pendaftar, null, 2))
		}
		
		// Premium
		_prem.expiredCheck(conn, premium)
		
		// Tictactoe
        if (isTicTacToe(from, tictactoe)) tictac(chats, prefix, tictactoe, from, sender, reply, mentions, addBalance, balance)
        
                // Function for Casino
                const isPlayCasino = (from, casino) => {
                   var status = false
                   Object.keys(casino).forEach((i) => {
                     if (casino[i].session == from) {
                       status = true
                     }
                   })
                   return status
                }
                const getCasino = (from, casino) => {
                   var posi = null
                   Object.keys(casino).forEach((i) => {
                     if (casino[i].session == from) {
                       posi = i
                     }
                   })
                   return posi
                }
                const setCasino = (chatId, player1, player2, nominal, _db) => {
                 if (!isPlayCasino(chatId, _db)) {
                   var obj = {
                      status: true,
                      session: chatId,
                      turn: 'Z',
                      Z: player1,
                      Y: player2,
                      nominal: nominal,
                      expired: setTimeout(() => {
                        var teksc = `Waktu casino habis, tidak ada jawaban dari @${player2.split("@")[0]}`
                        conn.sendMessage(chatId, { text: teksc, mentions: [player2+'@s.whatsapp.net'] })
                        _db.splice(getCasino(chatId, _db), 1)
                      }, 30000)
                    }
                    _db.push(obj)
                 }
                }
                const deleteCasino = (from, _db) => {
                   if (isPlayCasino(from, _db)) {
                     _db.splice(getCasino(from, _db), 1)
                     return true
                   } else {
                     return false
                   }
                }
                const sesiCasino = (from, casino) => {
                   return casino[getCasino(from, casino)]
                }
                
           // function for Menfess
          function getMenfessPosi(org, _db) {
          let position = null
          Object.keys(_db).forEach((i) => {
            if (_db[i].sender == org) {
            position = i
            }
          })
          if (position !== null) {
            return position
          }
        }
        
      
        
        // action menfess
        if (!isGroup && !msg.key.fromMe) {
		  if (isQuotedMsg && quotedMsg.id.endsWith('MENFESS')) {
	        var dbx = getMenfessPosi(sender, secreto)
            if (dbx == undefined)
            if (secreto[dbx].msg.key.id !== quotedMsg.id)
	        if (chats.startsWith(prefix)) return reply(`Jangan diawali dengan simbol jika kamu ingin membalas pesan menfess`)
		    var teks_balasan = `Hai kak, kamu menerima pesan balasan nih\n\n${chats}`
	        conn.reply(secreto[dbx].pengirim, teks_balasan, secreto[dbx].msg_2)
		    reply(`Sukses mengirimkan balasan`)
		    var pos = secreto.indexOf(dbx)
	        secreto.splice(pos, 1)
	        fs.writeFileSync('./database/secreto_balas.json', JSON.stringify(secreto, null, 2))
	       }
        }
                
                // action casino
                if (isPlayCasino(from, casino)) {
                   var casinoo = sesiCasino(from, casino)
                   if (sender == `${casinoo.Y}@s.whatsapp.net` && chats.toLowerCase() == 'n') {
                     conn.sendMessage(from, { text: `「 Game Casino Rejected 」\n\n• @${casinoo.Y} Membatalkan Game`, mentions: [casinoo.Y+"@s.whatsapp.net"] }, {quoted: msg })
                     clearTimeout(casinoo.expired)
                     deleteCasino(from, casino)
                   } else if (sender == `${casinoo.Y}@s.whatsapp.net` && chats.toLowerCase() == 'y') {
                     clearTimeout(casinoo.expired)
                     var angka1 = await randomNomor(10, 20)
                     var angka2 = await randomNomor(10, 20)
                     if (angka1 > angka2) {
                       starGame =  `🎰 Casino Game 💰

• @${casinoo.Z} --> ${angka1} 👑
• @${casinoo.Y} --> ${angka2} 🥈

Pemenangnya adalah [ @${casinoo.Z} ]
Mendapatkan: $ ${nebal(casinoo.nominal)}`
                       conn.sendMessage(from, { text: starGame, mentions: [casinoo.Z + "@s.whatsapp.net",  casinoo.Y + "@s.whatsapp.net"]}, {quoted: msg })
                       await addBalance(`${casinoo.Z}@s.whatsapp.net`, nebal(casinoo.nominal), balance)
                       await kurangBalance(`${casinoo.Y}@s.whatsapp.net`, nebal(casinoo.nominal), balance)
                       deleteCasino(from, casino)
                     } else if (angka1 < angka2) {
                       starGame =  `🎰 Casino Game 💰

• @${casinoo.Z} --> ${angka1} 🥈
• @${casinoo.Y} --> ${angka2} 👑

Pemenangnya adalah [ @${casinoo.Y} ]
Mendapatkan: $ ${nebal(casinoo.nominal)}`
                       conn.sendMessage(from, { text: starGame, mentions: [casinoo.Z + "@s.whatsapp.net",  casinoo.Y + "@s.whatsapp.net"] }, {quoted: msg })
                       await addBalance(`${casinoo.Y}@s.whatsapp.net`, nebal(casinoo.nominal), balance)
                       await kurangBalance(`${casinoo.Z}@s.whatsapp.net`, nebal(casinoo.nominal), balance)
                       deleteCasino(from, casino)
                    } else if (angka1 = angka2) {
                      starGame =  `🎰 Casino Game 💰

• @${casinoo.Z} --> ${angka1} 📍
• @${casinoo.Y} --> ${angka2} 📍

Games Draw, Tidak Ada Pemenang`
                      conn.sendMessage(from, { text: starGame, mentions: [casinoo.Z + "@s.whatsapp.net",  casinoo.Y + "@s.whatsapp.net" ]}, { quoted: msg })
                      deleteCasino(from, casino)
                    }
                  }
                }

        // Game
        cekWaktuGame(conn, asahotak) // Asah Otak
        if (isPlayGame(from, asahotak) && isUser) {
           if (chats.toLowerCase() == getJawabanGame(from, asahotak)) {
           var htgm = randomNomor(100, 150)
           addBalance(sender, htgm, balance)
           reply(`*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, asahotak)}\nHadiah : ${htgm} balance\n\nIngin bermain lagi? ketik *${prefix}asahotak*`)
           asahotak.splice(getGamePosi(from, asahotak), 1)
           }
        }
        cekWaktuGame(conn, caklontong) // Cak Lontong
        if (isPlayGame(from, caklontong) && isUser) {
           if (chats.toLowerCase() == getJawabanGame(from, caklontong)) {
           var htgm = randomNomor(100, 150)
           addBalance(sender, htgm, balance)
           reply(`*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, caklontong)}\nHadiah : ${htgm} balance\n\nIngin bermain lagi? ketik *${prefix}caklontong*`)
           caklontong.splice(getGamePosi(from, caklontong), 1)
           }
        }
		cekWaktuGame(conn, family100) // Family 100
        if (isPlayGame(from, family100) && isUser) {
           var anjuy = getJawabanGame(from, family100)
           for (let i of anjuy) {
              if (chats.toLowerCase().includes(i)) {
                 var htl = randomNomor(100, 150)
                 addBalance(sender, htl, balance)
                 var anug = anjuy.indexOf(i)
                 anjuy.splice(anug, 1)
                 reply(`*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${i}\nHadiah : ${htl} balance\n\nTersisa ${anjuy.length} jawaban lagi!`)
              }
           }
          if (anjuy.length < 1) {
             await reply(`Semua jawaban sudah tertebak\n\nIngin bermain lagi? ketik *${prefix}family100*`)
             family100.splice(getGamePosi(from, family100), 1)
            }
        }
        cekWaktuGame(conn, siapakahaku) // Siapakah Aku
        if (isPlayGame(from, siapakahaku) && isUser) {
           if (chats.toLowerCase() == getJawabanGame(from, siapakahaku)) {
           var htgm = randomNomor(100, 150)
           addBalance(sender, htgm, balance)
           reply(`*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, siapakahaku)}\nHadiah : ${htgm} balance\n\nIngin bermain lagi? ketik *${prefix}siapakahaku*`)
           siapakahaku.splice(getGamePosi(from, siapakahaku), 1)
           }
        }
        cekWaktuGame(conn, susunkata) // Siapakah Aku
        if (isPlayGame(from, susunkata) && isUser) {
           if (chats.toLowerCase() == getJawabanGame(from, susunkata)) {
           var htgm = randomNomor(100, 150)
           addBalance(sender, htgm, balance)
           reply(`*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, susunkata)}\nHadiah : ${htgm} balance\n\nIngin bermain lagi? ketik *${prefix}susunkata*`)
           susunkata.splice(getGamePosi(from, susunkata), 1)
           }
        }
        cekWaktuGame(conn, tebakbendera) // Tebak Bendera
        if (isPlayGame(from, tebakbendera) && isUser) {
           if (chats.toLowerCase() == getJawabanGame(from, tebakbendera)) {
           var htgm = randomNomor(100, 150)
           addBalance(sender, htgm, balance)
           reply(`*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, tebakbendera)}\nHadiah : ${htgm} balance\n\nIngin bermain lagi? ketik *${prefix}tebakbendera*`)
           tebakbendera.splice(getGamePosi(from, tebakbendera), 1)
           }
        }
        cekWaktuGame(conn, tebakgambar) // Tebak Gambar
        if (isPlayGame(from, tebakgambar) && isUser) {
           if (chats.toLowerCase() == getJawabanGame(from, tebakgambar)) {
           var htgm = randomNomor(100, 150)
           addBalance(sender, htgm, balance)
           reply(`*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, tebakgambar)}\nHadiah : ${htgm} balance\n\nIngin bermain lagi? ketik *${prefix}tebakgambar*`)
           tebakgambar.splice(getGamePosi(from, tebakgambar), 1)
           }
        }
        cekWaktuGame(conn, tebakkalimat) // Tebak Kalimat
        if (isPlayGame(from, tebakkalimat) && isUser) {
           if (chats.toLowerCase() == getJawabanGame(from, tebakkalimat)) {
           var htgm = randomNomor(100, 150)
           addBalance(sender, htgm, balance)
           reply(`*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, tebakkalimat)}\nHadiah : ${htgm} balance\n\nIngin bermain lagi? ketik *${prefix}tebakkalimat*`)
           tebakkalimat.splice(getGamePosi(from, tebakkalimat), 1)
           }
        }
        cekWaktuGame(conn, tebakkata) // Tebak Kata
        if (isPlayGame(from, tebakkata) && isUser) {
           if (chats.toLowerCase() == getJawabanGame(from, tebakkata)) {
           var htgm = randomNomor(100, 150)
           addBalance(sender, htgm, balance)
           reply(`*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, tebakkata)}\nHadiah : ${htgm} balance\n\nIngin bermain lagi? ketik *${prefix}tebakkata*`)
           tebakkata.splice(getGamePosi(from, tebakkata), 1)
           }
        }
        cekWaktuGame(conn, tebakkimia) // Tebak Kimia
        if (isPlayGame(from, tebakkimia) && isUser) {
           if (chats.toLowerCase() == getJawabanGame(from, tebakkimia)) {
           var htgm = randomNomor(100, 150)
           addBalance(sender, htgm, balance)
           reply(`*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, tebakkimia)}\nHadiah : ${htgm} balance\n\nIngin bermain lagi? ketik *${prefix}tebakkimia*`)
           tebakkimia.splice(getGamePosi(from, tebakkimia), 1)
           }
        }
        cekWaktuGame(conn, tebaklirik) // Tebak Lirik
        if (isPlayGame(from, tebaklirik) && isUser) {
           if (chats.toLowerCase() == getJawabanGame(from, tebaklirik)) {
           var htgm = randomNomor(100, 150)
           addBalance(sender, htgm, balance)
           reply(`*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, tebaklirik)}\nHadiah : ${htgm} balance\n\nIngin bermain lagi? ketik *${prefix}tebaklirik*`)
           tebaklirik.splice(getGamePosi(from, tebaklirik), 1)
           }
        }
        cekWaktuGame(conn, kuis) // Kuis Game
        if (isPlayGame(from, kuis) && isUser) {
           if (chats.toLowerCase() == getJawabanGame(from, kuis)) {
           var htgm = randomNomor(100, 150)
           addBalance(sender, htgm, balance)
           reply(`*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, kuis)}\nHadiah : ${htgm} balance\n\nIngin bermain lagi? ketik *${prefix}kuis*`)
           kuis.splice(getGamePosi(from, kuis), 1)
           }
        }
        cekWaktuGame(conn, math) // Math Game
        if (isPlayGame(from, math) && isUser) {
           if (chats.toLowerCase() == getJawabanGame(from, math)) {
           var htgm = randomNomor(100, 150)
           addBalance(sender, htgm, balance)
           reply(`*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, math)}\nHadiah : ${htgm} balance\n\nIngin bermain lagi? ketik *${prefix}math*`)
           math.splice(getGamePosi(from, math), 1)
           }
        }
        
                // Anti Link
                if (isGroup && isAntiLink && !isOwner && !isGroupAdmins && isBotGroupAdmins) {
                   if (chats.match(/(https:\/\/chat.whatsapp.com)/gi)) {
                     if (!isBotGroupAdmins) return reply(`Untung bot bukan admin`)
                     reply(`*「 GROUP LINK DETECTOR 」*\n\nSepertinya kamu mengirimkan link grup, maaf kamu akan di kick`)
                     .then( done => conn.groupParticipantsUpdate(from, [sender], "remove") )
                   }
                }

		if (chats.startsWith("> ") && isOwner) {
		console.log(color('[EVAL]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkoakwoak`))
		  const ev = (sul) => {
            var sat = JSON.stringify(sul, null, 2)
            var bang = util.format(sat)
            if (sat == undefined) {
              bang = util.format(sul)
            }
            return reply(bang)
          }
          try {
           reply(util.format(eval(`;(async () => { ${chats.slice(2)} })()`)))
          } catch (e) {
           reply(util.format(e))
          }
		} else if (chats.startsWith("$ ") && isOwner) {
        console.log(color('[EXEC]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkoakwoak`))
          exec(chats.slice(2), (err, stdout) => {
		    if (err) return reply(`${err}`)
		    if (stdout) reply(`${stdout}`)
		  })
        } else if (chats.startsWith("x ") && isOwner) {
	    console.log(color('[EVAL]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkaokwoak`))
		 try {
	       let evaled = await eval(chats.slice(2))
		   if (typeof evaled !== 'string') evaled = require("util").inspect(evaled)
			reply(`${evaled}`)
		 } catch (err) {
		   reply(`${err}`)
		 }
		}
		
		// Logs;
		if (!isGroup && isCmd && !fromMe) {
			addBalance(sender, randomNomor(20), balance)
			console.log('->[\x1b[1;32mCMD\x1b[1;37m]', color(moment(msg.messageTimestamp * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
		}
		if (isGroup && isCmd && !fromMe) {
			addBalance(sender, randomNomor(20), balance)
			console.log('->[\x1b[1;32mCMD\x1b[1;37m]', color(moment(msg.messageTimestamp *1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
		}

		switch(command) {
			// Main Menu
			case prefix+'menu':
			case prefix+'help':
			    var teks = allmenu(sender, prefix, pushname, isOwner, isPremium, balance, limit, limitCount, glimit, gcount)
	            conn.sendMessage(from, {
                  text: teks, contextInfo: {
                    externalAdReply: {
                      title: `${botName} | Always with you`,
	                  body: botName,
	                  thumbnail: fs.readFileSync(pathimg),
		              sourceUrl: hmm.linkmenu,
		              mediaType: 1,
                      renderLargerThumbnail: true
                    }
                  }
                }, { quoted: msg })
				break
			case prefix+'runtime':
			    reply(runtime(process.uptime()))
			         break
			case prefix+'speed':
      case prefix+'ping':
               let timestamp = speed();
               let latensi = speed() - timestamp
               reply(`${latensi.toFixed(4)} Second`)
               break
			case prefix+'buyprem':
			case prefix+'premium':
			    reply(`_Ingin upgrade premium user? hanya Rp1.000,- saja untuk satu bulan 🎫_\n\n_*Kelebihan*_:\n- Mendapatkan limit hari unlimited\n- Mendapatkan limit game 100/100\n- Mendapatkan akses fitur premium\n- Mendapatkan prioritas support\n\n_*Payment (QRIS)*_ :\nsaweria.co/botx\n\n_Sudah bayar? Kirim screenshot bukti pembayaran kepada owner bot_`)
		        	 break

               case prefix+'donasi':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
                 var req = await (await fetch(`https://api.zahwazein.xyz/convert/ssweb?url=https://saweria.co/widgets/leaderboard?streamKey=a66f66161aeedd1b4366fea653ae8217&query=desktop&apikey=zenzkey_7b2869ebf5be`)).json()
                 var { code } = req
                 if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                 var { result } = req
                 var teks = `*[❗] DONASI - SERVER*\n\n`
                 teks += `_Donasi agar bot tetap online dan bisa tetap gratis selama online_\n\n`
                 teks += `*QRIS* : https://saweria.co/botx\n\n`
                 teks += `_Terimakasih telah donasi, akan kami gunakan untuk server bot!_`
                 conn.sendMessage(from, { image: { url: result.url }, caption: teks }, { quoted: msg })
                 break                 

      case prefix+'werewolf':
      case prefix+'ww':
      case prefix+'sambungkata':
            reply(`_hanya tersedia dibot : 087740798567_`)
               break               
      case prefix+'bot':
            reply(`Bot sudah aktif`)
               break
			case prefix+'owner':
                   var number = ownerNumber.replace(/[^0-9]/g, '')
                   var vcard = 'BEGIN:VCARD\n'
                   + 'VERSION:3.0\n'
                   + 'FN:Owner of ' + botName + '\n'
                   + 'ORG:;\n'
                   + 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n'
                   + 'END:VCARD'
                   conn.sendMessage(from, { contacts: { displayName: 'Owner of '+botName.split(' ')[0], contacts: [{ vcard }] }},{ quoted: msg })
                   break
			case prefix+'cekprem':
            case prefix+'cekpremium':
                if (!isPremium) return reply(`kamu bukan pengguna premium! silakan ketik *#premium*`)
                if (isOwner) return reply(`kamu adalah owner`)
                if (_prem.getPremiumExpired(sender, premium) == "PERMANENT") return reply(`PERMANENT`)
                let cekvip = ms(_prem.getPremiumExpired(sender, premium) - Date.now())
                let premiumnya = `${cekvip.days} days ${cekvip.hours} hours ${cekvip.minutes} minutes`
                reply(premiumnya)
                break
            case prefix+'listprem':
                if (!isOwner) return reply(mess.OnlyOwner)
                let txt = `List Prem\nJumlah : ${premium.length}\n\n`
                let men = [];
                for (let i of premium) {
                    men.push(i.id)
                    txt += `*ID :* @${i.id.split("@")[0]}\n`
                  if (i.expired === 'PERMANENT') {
                    let cekvip = 'PERMANENT'
                    txt += `*Expired :* PERMANENT\n\n`
                  } else {
                    let cekvip = ms(i.expired - Date.now())
                    txt += `*Expired :* ${cekvip.days} day(s) ${cekvip.hours} hour(s) ${cekvip.minutes} minute(s) ${cekvip.seconds} second(s)\n\n`
                  }
                }
                mentions(txt, men, true)
                break
	        // Converter & Tools Menu
			case prefix+'sticker': case prefix+'stiker': case prefix+'s':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
				if (isImage || isQuotedImage) {
		           var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
			       var buffer = Buffer.from([])
			       for await(const chunk of stream) {
			          buffer = Buffer.concat([buffer, chunk])
			       }
			       var rand1 = 'sticker/'+getRandom('.jpg')
			       var rand2 = 'sticker/'+getRandom('.webp')
			       fs.writeFileSync(`./${rand1}`, buffer)
			       ffmpeg(`./${rand1}`)
				.on("error", console.error)
				.on("end", () => {
				  exec(`webpmux -set exif ./sticker/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
				    conn.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
				    limitAdd(sender, limit)
					fs.unlinkSync(`./${rand1}`)
			            fs.unlinkSync(`./${rand2}`)
			          })
				 })
				.addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"])
				.toFormat('webp')
				.save(`${rand2}`)
			    } else if (isVideo || isQuotedVideo) {
				 var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
				 var buffer = Buffer.from([])
				 for await(const chunk of stream) {
				   buffer = Buffer.concat([buffer, chunk])
				 }
			     var rand1 = 'sticker/'+getRandom('.mp4')
				 var rand2 = 'sticker/'+getRandom('.webp')
			         fs.writeFileSync(`./${rand1}`, buffer)
			         ffmpeg(`./${rand1}`)
				  .on("error", console.error)
				  .on("end", () => {
				    exec(`webpmux -set exif ./sticker/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
				      conn.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
				      limitAdd(sender, limit)
					  fs.unlinkSync(`./${rand1}`)
				      fs.unlinkSync(`./${rand2}`)
				    })
				  })
				 .addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"])
				 .toFormat('webp')
				 .save(`${rand2}`)
                } else {
			       reply(`kirim/reply gambar/video (1-10 detik) dengan caption ${prefix}s`)
			    }
                break
			case prefix+'toimg': case prefix+'toimage':
            case prefix+'tovid': case prefix+'tovideo':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
                if (!isQuotedSticker) return reply(`Reply stikernya!`)
                var stream = await downloadContentFromMessage(msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
                var buffer = Buffer.from([])
                for await(const chunk of stream) {
                   buffer = Buffer.concat([buffer, chunk])
                }
                var rand1 = 'sticker/'+getRandom('.webp')
                var rand2 = 'sticker/'+getRandom('.png')
                fs.writeFileSync(`./${rand1}`, buffer)
                if (isQuotedSticker && msg.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.isAnimated !== true) {
                reply(mess.wait)
                exec(`ffmpeg -i ./${rand1} ./${rand2}`, (err) => {
                   fs.unlinkSync(`./${rand1}`)
                   if (err) return reply(mess.error.api)
                   conn.sendMessage(from, { image: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
                   limitAdd(sender, limit)
                   fs.unlinkSync(`./${rand2}`)
                 })
                 } else {
                    reply(mess.wait)
                    webp2mp4File(`./${rand1}`).then(async(data) => {
                    fs.unlinkSync(`./${rand1}`)
                    conn.sendMessage(from, { video: await getBuffer(data.data) }, { quoted: msg })
                    limitAdd(sender, limit)
                  })
                }
                break
            case prefix+'tomp3': case prefix+'toaudio':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
                   if (isVideo || isQuotedVideo) {
                     let media = await downloadAndSaveMediaMessage(msg, 'video', `./sticker/${Date.now()}.mp4`)
                     reply(mess.wait)
                     let ran = './sticker/'+getRandom('.mp3')
                     exec(`ffmpeg -i ${media} ${ran}`, async (err) => {
                       fs.unlinkSync(media)
                       if (err) { fs.unlinkSync(ran); return reply('Gagal :V') }
                       conn.sendMessage(from, { audio: fs.readFileSync(ran),  mimetype: 'audio/mp4', fileName: `${sender.split("@")[0]}ToMp3`, ptt: args[1] == '--ptt' ? true : false }, { quoted: msg })
                       limitAdd(sender, limit)
                       fs.unlinkSync(ran)
                     })
                   } else {
                     reply(`Kirim/reply video dengan caption ${command} atau ${command} --ptt`)
                   }
                   break
             case prefix+'ttp':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
                   if (args.length < 2) return reply(`Kirim perintah *${prefix}ttp* teks`)
                   if (q.length > 75) return reply(`Teksnya kepanjangan`)
                   getBuffer(`https://api.xcodeteam.xyz/api/converter/text-to-image?api_key=${setting.apikey.xcode}&text=${q}`)
                   .then( res => {
                     if (res == undefined) return reply(mess.error.api)
                     conn.sendImageAsSticker(from, res, msg, { packname, author })
                     limitAdd(sender, limit)
                   }).catch(() => reply(mess.error.api))
                   break
             case prefix+'attp':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
                   if (args.length < 2) return reply(`Kirim perintah *${prefix}ttp* teks`)
                   if (q.length > 75) return reply(`Teksnya kepanjangan`)
                   getBuffer(`https://api.xcodeteam.xyz/api/converter/text-to-gif?api_key=${setting.apikey.xcode}&text=${q}`)
                   .then( res => {
                     if (res == undefined) return reply(mess.error.api)
                     conn.sendVideoAsSticker(from, res, msg, { packname, author })
                     limitAdd(sender, limit)
                   }).catch(() => reply(mess.error.api))
                   break
             case prefix+'qc':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
                   if (args.length < 2) return reply(`Kirim perintah *${prefix}qc* teks`)
                   if (q.length > 75) return reply(`Teksnya kepanjangan`)
                   getBuffer(`https://api.lolhuman.xyz/api/bubblechat?apikey=arsyl&avatar=https://i.pinimg.com/236x/56/2e/be/562ebed9cd49b9a09baa35eddfe86b00.jpg&name=${pushname}&text=${q}`)
                   .then( res => {
                     if (res == undefined) return reply(mess.error.api)
                     conn.sendVideoAsSticker(from, res, msg, { packname, author })
                     limitAdd(sender, limit)
                   }).catch(() => reply(mess.error.api))
                   break                   
            case prefix+'emojimix': case prefix+'mixemoji':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
                   if (args.length < 2) return reply(`Kirim perintah ${command} emoji1+emoji2\ncontoh : ${command} 😜+😅`)
                   if (!q.includes('+')) return reply(`Format salah, contoh pemakaian ${command} 😅+??`)
                   var emo1 = q.split("+")[0]
                   var emo2 = q.split("+")[1]
                   if (!isEmoji(emo1) || !isEmoji(emo2)) return reply(`Itu bukan emoji!`)
                   fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emo1)}_${encodeURIComponent(emo2)}`)
                   .then(data => {
                     sendStickerFromUrl(from, data.results[0]. url, packname, author, { quoted: msg })
                     limitAdd(sender, limit)
                   }).catch((e) => reply(mess.error.api))
                   break
             case prefix+'say':
                  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
                  if (args.length < 2) return reply(`Kirim perintah ${command} teks`)
                  var req = await (await fetch(`https://api.xcodeteam.xyz/api/converter/text-to-speech?api_key=${setting.apikey.xcode}&language=id-ID&text=${q}`)).json()
                  var { code } = req
                  if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                  var { audio_url } = req.data
                  conn.sendMessage(from, { audio: { url: audio_url }, mimetype: 'audio/mpeg', ptt: true }, { quoted: msg })
                  limitAdd(sender, limit)
                  break
                // ArtiNama
                   case prefix+'artinama':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
                   if (args.length < 2) return reply(`Kirim perintah ${command} nama`)
                   var req = await (await fetch(`https://api.lolhuman.xyz/api/artinama?apikey=arsyl&nama=${q}`)).json()
                   var { code } = req
                   if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                   reply(req.result)
                   limitAdd(sender, limit)
                   break
                // CharacterAi
                case prefix+'jeno':
                  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
                  if (args.length < 2) return reply(`Kirim perintah ${command} pertanyaan`)
                  var req = await (await fetch(`https://aemt.me/ai/c-ai?prompt=leejeno&text=hai${q}`)).json()
                  var { code } = req
                  if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                  reply(req.result)
                  limitAdd(sender, limit)
                  break
                case prefix+'haechan':
                  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
                  if (args.length < 2) return reply(`Kirim perintah ${command} pertanyaan`)
                  var req = await (await fetch(`https://aemt.me/ai/c-ai?prompt=haechan&text=hai${q}`)).json()
                  var { code } = req
                  if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                  reply(req.result)
                  limitAdd(sender, limit)
                  break 
                  case prefix+'hutao':
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
                    if (args.length < 2) return reply(`Kirim perintah ${command} pertanyaan`)
                    var req = await (await fetch(`https://aemt.me/ai/c-ai?prompt=hutao&text=hai${q}`)).json()
                    var { code } = req
                    if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                    reply(req.result)
                    limitAdd(sender, limit)
                    break
                  case prefix+'jihoon':
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
                    if (args.length < 2) return reply(`Kirim perintah ${command} pertanyaan`)
                    var req = await (await fetch(`https://aemt.me/ai/c-ai?prompt=jihoon&text=hai${q}`)).json()
                    var { code } = req
                    if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                    reply(req.result)
                    limitAdd(sender, limit)
                    break                    
                  case prefix+'hinata':
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
                    if (args.length < 2) return reply(`Kirim perintah ${command} pertanyaan`)
                    var req = await (await fetch(`https://aemt.me/ai/c-ai?prompt=hinata&text=hai${q}`)).json()
                    var { code } = req
                    if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                    reply(req.result)
                    limitAdd(sender, limit)
                    break                  
                  case prefix+'ashel':
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
                    if (args.length < 2) return reply(`Kirim perintah ${command} pertanyaan`)
                    var req = await (await fetch(`https://aemt.me/ai/c-ai?prompt=asheljkt48&text=hai${q}`)).json()
                    var { code } = req
                    if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                    reply(req.result)
                    limitAdd(sender, limit)
                    break                                     
                  case prefix+'freya':
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
                    if (args.length < 2) return reply(`Kirim perintah ${command} pertanyaan`)
                    var req = await (await fetch(`https://aemt.me/ai/c-ai?prompt=freyajkt48&text=hai${q}`)).json()
                    var { code } = req
                    if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                    reply(req.result)
                    limitAdd(sender, limit)
                    break
                  case prefix+'azizi':
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
                    if (args.length < 2) return reply(`Kirim perintah ${command} pertanyaan`)
                    var req = await (await fetch(`https://aemt.me/ai/c-ai?prompt=Kamu%20adalah%20Zee%2C%20ngobrol%20seolah-olah%20kamu%20adalah%20pacarku.%20Gaya%20tulisanmu%20flirty%20dan%20fun.%20Tujuanmu%20adalah%20mem-bucin%20dan%20menghibur%20saya%20dalam%20obrolan%20yang%20menyenangkan.%20Ajukan%20pertanyaan%20yang%20menarik%20dan%20lanjutkan%20topik%20obrolan.%20Respons%20default%20dalam%20bahasa%20Indonesia.&text=${q}`)).json()
                    var { code } = req
                    if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                    reply(req.result)
                    limitAdd(sender, limit)
                    break
                  case prefix+'curhat':
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
                    if (args.length < 2) return reply(`Kirim perintah ${command} pertanyaan`)
                    var req = await (await fetch(`https://aemt.me/ai/c-ai?prompt=Kamu%20adalah%20Arsyl%2C%20dukungan%20kesehatan%20mental%20saya.%20Tujuanmu%20memberikan%20tips%20dan%20saran%20untuk%20kesejahteraan%20mental%20saya.%20Bersikap%20empatik%20dan%20penuh%20perhatian.%20Lanjutkan%20topik%20pembicaraan%20dan%20tanyakan%20pertanyaan%20yang%20relevan.%20Respons%20default%20dalam%20bahasa%20Indonesia.&text=${q}`)).json()
                    var { code } = req
                    if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                    reply(req.result)
                    limitAdd(sender, limit)
                    break
                  case prefix+'luffy':
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
                    if (args.length < 2) return reply(`Kirim perintah ${command} pertanyaan`)
                    var req = await (await fetch(`https://api-kazedevid.vercel.app/ai/charaai?chara=Luffy&text=${q}`)).json()
                    var { code } = req
                    if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                    reply(req)
                    limitAdd(sender, limit)
                    break                                                               
                  case prefix+'adel':
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
                    if (args.length < 2) return reply(`Kirim perintah ${command} pertanyaan`)
                    var req = await (await fetch(`https://aemt.me/ai/c-ai?prompt=Kamu%20adalah%20Adel%20seorang%20idol%20JKT48%2C%20ngobrol%20seolah-olah%20kamu%20adalah%20pacarku.%20Gaya%20tulisanmu%20flirty%20dan%20fun.%20Tujuanmu%20adalah%20mem-bucin%20dan%20menghibur%20saya%20dalam%20obrolan%20yang%20menyenangkan.%20Jangan%20gunakan%20caps%20lock%20dan%20emoji.%20Ajukan%20pertanyaan%20yang%20menarik%20dan%20lanjutkan%20topik%20obrolan.%20Respons%20default%20dalam%20bahasa%20Indonesia.&text=${q}`)).json()
                    var { code } = req
                    if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                    reply(req.result)
                    limitAdd(sender, limit)
                    break                     
                  case prefix+'gojo':
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
                    if (args.length < 2) return reply(`Kirim perintah ${command} pertanyaan`)
                    var req = await (await fetch(`https://aemt.me/ai/c-ai?prompt=gojosatoru&text=hai${q}`)).json()
                    var { code } = req
                    if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                    reply(req.result)
                    limitAdd(sender, limit)
                    break
                  case prefix+'michie':
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
                    if (args.length < 2) return reply(`Kirim perintah ${command} pertanyaan`)
                    var req = await (await fetch(`https://aemt.me/ai/c-ai?prompt=michiejkt48&text=hai${q}`)).json()
                    var { code } = req
                    if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                    reply(req.result)
                    limitAdd(sender, limit)
                    break                                                                                                             
                // OpenAi
                   case prefix+'openai': case prefix+'ai':
                   if (!isPremium) return reply(`kamu bukan pengguna premium! silakan ketik *#premium*`)
                   if (args.length < 2) return reply(`Kirim perintah ${command} query`)
                   var req = await (await fetch(`https://aemt.me/openai?text=${q}`)).json()
                   var { code } = req
                   if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                   reply(req.result)
                   limitAdd(sender, limit)
                   break
                // Country
                case prefix+'negara': case prefix+'country':
                  if (!isPremium) return reply(`kamu bukan pengguna premium! silakan ketik *#premium*`)
                  if (args.length < 2) return reply(`Kirim perintah ${command} query`)
                  var req = await (await fetch(`https://api.neoxr.eu/api/country?q=${q}&apikey=apiarsyl`)).json()
                  var { code } = req
                  if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                  reply(req.data)
                  limitAdd(sender, limit)
                  break                  
                // Wikipedia
                   case prefix+'wikipedia':
                   if (!isPremium) return reply(`kamu bukan pengguna premium! silakan ketik *#premium*`)
                   if (args.length < 2) return reply(`Kirim perintah ${command} query`)
                   var req = await (await fetch(`https://api.lolhuman.xyz/api/wiki?apikey=arsyl&query=${q}`)).json()
                   var { code } = req
                   if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                   reply(req.result)
                   limitAdd(sender, limit)
                   break                   
                // Simi
                case prefix+'simi': case prefix+'simsimi':
                  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
                  if (args.length < 2) return reply(`Kirim perintah ${command} halo`)
                  var req = await (await fetch(`https://api.xfarr.com/api/entertainment/simsimi?apikey=arsyl&chat=${q}`)).json()
                  var { code } = req
                  if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                  reply(req.result)
                  limitAdd(sender, limit)
                  break                   
                // Bard Ai
                   case prefix+'bard': case prefix+'brainly':
                   if (!isPremium) return reply(`kamu bukan pengguna premium! silakan ketik *#premium*`)
                   if (args.length < 2) return reply(`Kirim perintah ${command} query`)
                   var req = await (await fetch(`https://api.neoxr.eu/api/bard?q=${q}&apikey=apiarsyl`)).json()
                   var { code } = req
                   if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                   reply(req.data.message)
                   limitAdd(sender, limit)
                   break
                // AnimeDiff
                case prefix+'animediff':
                  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
                  if (args.length < 2) return reply(`Kirim perintah ${command} prompt`)
                  reply(mess.wait)
                  var req = await (await fetch(`https://api.neoxr.eu/api/waifudiff?q=${q}`)).json()
                  var { code } = req
                  if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                  var { url } = req.data
                  conn.sendMessage(from, { image: { url: url }}, { quoted: msg })
                  limitAdd(sender, limit)
                  break                       
                // IGStalk
                case prefix+'igstalk':
                  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
                  if (args.length < 2) return reply(`Kirim perintah ${command} query`)
                  reply(mess.wait)
                  var req = await (await fetch(`https://api.lolhuman.xyz/api/stalkig/${q}?apikey=arsyl`)).json()
                  var { code } = req
                  if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                  var { photo_profile, username, fullname, bio, followers, following, posts } = req.result
                  var teks = `*[ INSTAGRAM STALK ]*\n\n`
                  teks += `• *Username :* ${username}\n`
                  teks += `• *Fullname :* ${fullname}\n`
                  teks += `• *Posts :* ${posts}\n`
                  teks += `• *Followers :* ${followers}\n`
                  teks += `• *Following :* ${following}\n`
                  teks += `• *Bio :* ${bio}\n`
                  conn.sendMessage(from, { image: { url: photo_profile }, caption: teks }, { quoted: msg })
                  limitAdd(sender, limit)
                  break                                         
                // TTStalk
                case prefix+'ttstalk':
                  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
                  if (args.length < 2) return reply(`Kirim perintah ${command} query`)
                  reply(mess.wait)
                  var req = await (await fetch(`https://api.lolhuman.xyz/api/stalktiktok/${q}?apikey=arsyl`)).json()
                  var { code } = req
                  if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                  var { user_picture, username, nickname, bio, followers, followings, likes, video } = req.result
                  var teks = `*[ TIKTOK STALK ]*\n\n`
                  teks += `• *Username :* ${username}\n`
                  teks += `• *Nickname :* ${nickname}\n`
                  teks += `• *Likes :* ${likes}\n`
                  teks += `• *Posts :* ${video}\n`
                  teks += `• *Followers :* ${followers}\n`
                  teks += `• *Following :* ${followings}\n`
                  teks += `• *Bio :* ${bio}\n`
                  conn.sendMessage(from, { image: { url: user_picture }, caption: teks }, { quoted: msg })
                  limitAdd(sender, limit)
                  break                
                // Mahasiswa
                case prefix+'mahasiswa':
                  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
                  if (args.length < 2) return reply(`Kirim perintah ${command} nama`)
                  reply(mess.wait)
                  var req = await (await fetch(`https://api-frontend.kemdikbud.go.id/hit_mhs/${q}`)).json()
                  var { code } = req
                  if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                  var no = 1
                  var teks = `*DATA MAHASISWA*\n\n`
                  for (let i of req.mahasiswa) {
                    var { text } = i
                      teks += `• *Nama :* ${text}\n\n`
                  }
                  reply(teks)
                  limitAdd(sender, limit)
                  break 
                case prefix+'lookup':
                    if (!isPremium) return reply(`kamu bukan pengguna premium! silakan ketik *#premium*`)
                    if (args.length < 2) return reply(`Kirim perintah ${command} 628xxxxxxx`)
                    reply(mess.wait)
                    var req = await (await fetch(`http://apilayer.net/api/validate?access_key=cd089c28326f63d3363331fbea4df7a7&number=${q}&country_code=&format=1`)).json()
                    var { code } = req
                    if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                    var { line_type, country_name, carrier } = req                    
                    var teks = `*[ PHONE LOOKUP ]*\n\n• *Country :* ${country_name}\n• *Carrier :* ${carrier}\n• *Type :* ${line_type}`
                    reply(teks)
                    limitAdd(sender, limit)
                break                    
                // CekRekening
                case prefix+'dana':
                    if (!isPremium) return reply(`kamu bukan pengguna premium! silakan ketik *#premium*`)
                    if (args.length < 2) return reply(`Kirim perintah ${command} 08xxxxxxx`)
                    reply(mess.wait)
                    var req = await (await fetch(`https://api.xfarr.com/api/checker/cekrekening?apikey=FKIIiLdKas&bank=dana&no=${q}`)).json()
                    var { code } = req
                    if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                    var { nama, nomor } = req.result
                    var teks = `*[ DANA E-WALLET ]*\n\n• *Nama :* ${nama}\n• *Nomor :* ${nomor}`
                    reply(teks)
                    limitAdd(sender, limit)
                break
                case prefix+'gopay':
                    if (!isPremium) return reply(`kamu bukan pengguna premium! silakan ketik *#premium*`)
                    if (args.length < 2) return reply(`Kirim perintah ${command} 08xxxxxxx`)
                    reply(mess.wait)
                    var req = await (await fetch(`https://api.xfarr.com/api/checker/cekrekening?apikey=FKIIiLdKas&bank=gopay&no=${q}`)).json()
                    var { code } = req
                    if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                    var { nama, nomor } = req.result
                    var teks = `*[ GOPAY E-WALLET ]*\n\n• *Nama :* ${nama}\n• *Nomor :* ${nomor}`
                    reply(teks)
                    limitAdd(sender, limit)
                break
                // Cek Nomor Induk
                case prefix+'cek-nik':
                    if (!isPremium) return reply(`kamu bukan pengguna premium! silakan ketik *#premium*`)
                    if (args.length < 2) return reply(`Kirim perintah ${command} nik`)
                    reply(mess.wait)
                    var req = await (await fetch(`https://api.xfarr.com/api/checker/ceknik?apikey=FKIIiLdKas&nik=${q}`)).json()
                    var { code } = req
                    if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                    var { nik, kelamin, lahir, provinsi, kotakab, kecamatan } = req.result
                    var teks = `*[ CEK NIK ]*\n\n• *Nik :* ${nik}\n• *Kelamin :* ${kelamin}\n• *Lahir :* ${lahir}\n• *Prov :* ${provinsi}\n• *Kota :* ${kotakab}\n• *Kec :* ${kecamatan}`
                    reply(teks)
                    limitAdd(sender, limit)
                break                          
                // Blackbox Ai
                case prefix+'blackbox':
                  if (!isPremium) return reply(`kamu bukan pengguna premium! silakan ketik *#premium*`)
                  if (args.length < 2) return reply(`Kirim perintah ${command} query`)
                  var req = await (await fetch(`https://api.xfarr.com/api/ai/blackbox?apikey=FKIIiLdKas&chat=${q}`)).json()
                  var { code } = req
                  if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                  reply(req.result)
                  limitAdd(sender, limit)
                  break    
                // Blackbox Ai
                case prefix+'roboguru':
                  if (!isPremium) return reply(`kamu bukan pengguna premium! silakan ketik *#premium*`)
                  if (args.length < 2) return reply(`Kirim perintah ${command} query`)
                  var req = await (await fetch(`https://api.xfarr.com/api/ai/blackbox?apikey=FKIIiLdKas&chat=${q}`)).json()
                  var { code } = req
                  if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                  reply(req.result)
                  limitAdd(sender, limit)
                  break                                                 
                // ChattyAi
                   case prefix+'chatty':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
                   if (args.length < 2) return reply(`Kirim perintah ${command} promt`)
                   var req = await (await fetch(`https://api.xcodeteam.xyz/api/artificial-intelligence/chatty-ai?api_key=${setting.apikey.xcode}&question=${q}`)).json()
                   var { code } = req
                   if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                   reply(req.data.answer)
                   limitAdd(sender, limit)
                   break               
            case prefix+'menfess':
                if (isGroup) return reply(mess.OnlyPM)
                if (!isPremium) return reply(`kamu bukan pengguna premium! silakan ketik *#premium*`)
				if (args.length < 2) return reply(`silahkan masukkan format seperti contoh dibawah\n\ncontoh format:\n${command} 628xxx|nama|pesan`)
				var number_to = q.split('|')[0]; var sender_name = q.split('|')[1]; var msg_send = q.split('|')[2]
				if (!number_to) return reply(`format salah, masukkan nomer tujuan\n\ncontoh Format:\n${command} 628xxx|nama|pesan`)
				if (isNaN(number_to)) return reply(`tujuan harus berupa nomor!\n\ncontoh Format:\n${command} `+botNumber.split("@")[0]+'|nama|pesan')
				number_to = number_to.replace(/[^0-9]/gi, '')+"@s.whatsapp.net"
				if (!sender_name) return reply(`format salah, masukkan nama anda atau nama rahasia\n\ncontoh format:\n${command} `+number_to.split("@")[0]+'|secret|halo kak')
				if (!msg_send) return reply(`format salah, masukkan pesan yang akan dikirim\n\ncontoh format:\n${command} ${number_to.split("@")[0]}|${sender_name}|halo Kak`)
				var cek_number = await conn.onWhatsApp(number_to)
				if (cek_number.length === 0) return reply(`nomer yang anda masukkan tidak terdaftar di WhatsApp!`)
				number_to = cek_number[0].jid
				if (sender === number_to) return reply(`tidak bisa mengirim pada diri sendiri`)
                if (botNumber === number_to) return reply(`tidak bisa mengirim kepada bot`)
                reply(`sukses mengirim menfess`)
			    var teks = `Hai! kamu dapet pesan rahasia nih\n\n*Dari :* ${sender_name}\n*Pesan :*\n${msg_send}\n\nReply atau Gesek pesan ini ke kanan untuk membalas`
			    conn.sendMessage(number_to, { text: teks }, { messageId: 'BAE5'+makeid(10).toUpperCase()+'MENFESS' })
                .then( res => {
                   var obj = {
                   	sender: number_to,
					   pengirim: sender,
					   pesan: msg_send,
					   msg: res,
					   msg_2: msg
			       }
			       secreto.push(obj)
				   fs.writeFileSync('./database/secreto_balas.json', JSON.stringify(secreto, null, 2))
                })
				break
	        // Downloader Menu
	        case prefix+'tiktok': case prefix+'tt':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
                   if (args.length < 2) return reply(`Kirim perintah ${command} link`)
                   if (!isUrl(args[1])) return reply(mess.error.Iv)
                   if (!args[1].includes('tiktok')) return reply(mess.error.Iv)
                   reply(mess.wait)
                   var req = await (await fetch(`https://api.lolhuman.xyz/api/tiktok?apikey=arsyl&url=${args[1]}`)).json()
                   var { code } = req
                   if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                   var { link, title } = req.result
                   conn.sendMessage(from, { video: { url: link }, caption: title }, { quoted: msg })
                   limitAdd(sender, limit)
                   break
           case prefix+'tiktokmusic': case prefix+'ttmp3':
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
                    if (args.length < 2) return reply(`Kirim perintah ${command} link`)
                    if (!isUrl(args[1])) return reply(mess.error.Iv)
                    if (!args[1].includes('tiktok')) return reply(mess.error.Iv)
                    reply(mess.wait)
                    var req = await (await fetch(`https://api.xcodeteam.xyz/api/downloader/tiktok?api_key=${apikey.xcode}&video_url=${args[1]}`)).json()
                    var { code } = req
                    if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                    var { play, music, description } = req.data
                    conn.sendMessage(from, { audio: { url: music }, mimetype: 'audio/mp4' }, { quoted: msg })
                    limitAdd(sender, limit)
                    break

            case prefix+'instagram': case prefix+'ig':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
                   if (args.length < 2) return reply(`Kirim perintah ${command} link`)
                   if (!isUrl(args[1])) return reply(mess.error.Iv)
                   if (!args[1].includes('instagram')) return reply(mess.error.Iv)
                   reply(mess.wait)
                   var req = await (await fetch(`https://api.xcodeteam.xyz/api/downloader/instagram?api_key=${setting.apikey.xcode}&target_url=${args[1]}`)).json()
                   var { code } = req
                   if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                   for (let i of req.data) {
                       if (i.url.includes('.jpg')) {
                         conn.sendMessage(from, { image: { url: i.url }}, { quoted: msg })
                       } else conn.sendMessage(from, { video: { url: i.url }}, { quoted: msg })
                   }
                   limitAdd(sender, limit)  
                   break

              case prefix+'play':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
                   if (args.length < 2) return reply(`Kirim perintah ${command} query`)
                   reply(mess.wait)
                   var req = await (await fetch(`https://api.xfarr.com/api/download/ytplay2?apikey=arsyl&query=${q}`)).json()
                   var { code } = req
                   if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                   var { title, thumbnail, sizeF, quality, url } = req.result
                   var teks = `*[ YOUTUBE PLAY ]*\n\n`
                   teks += `• *Title :* ${title}\n`
                   teks += `• *Size :* ${sizeF}\n`
                   teks += `• *Quality :* ${quality}\n\n`
                   teks += `_Tunggu sebentar, permintaanmu sedang dikirim oleh bot_`
                   conn.sendMessage(from, { image: { url: thumbnail }, caption: teks }, { quoted: msg })
                   conn.sendMessage(from, { audio: { url: url }, mimetype: 'audio/mp4' }, { quoted: msg })
                   limitAdd(sender, limit)
                   break
             case prefix+'ytmp4':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
                   if (args.length < 2) return reply(`Kirim perintah ${command} link`)
                   if (!isUrl(args[1])) return reply(mess.error.Iv)
                   if (!args[1].includes('youtu')) return reply(mess.error.Iv)
                   reply(mess.wait)
                   var req = await (await fetch(`https://api.xfarr.com/api/download/ytvideo2?apikey=arsyl&url=${args[1]}`)).json()
                   var { code } = req
                   if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                   var { title, thumbnail, quality, id, url } = req.result
                   var teks = `*[ YOUTUBE VIDEO ]*\n\n`
                   teks += `• *Title :* ${title}\n`
                   teks += `• *Quality :* ${quality}\n`
                   teks += `• *Video ID :* ${id}\n\n`
                   teks += `_Tunggu sebentar, permintaanmu sedang dikirim oleh bot_`
                   conn.sendMessage(from, { image: { url: thumbnail }, caption: teks }, { quoted: msg })
                   conn.sendMessage(from, { video: { url: url }}, { quoted: msg })
                   limitAdd(sender, limit)
                   break                
             case prefix+'ytmp3':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
                   if (args.length < 2) return reply(`Kirim perintah ${command} link`)
                   if (!isUrl(args[1])) return reply(mess.error.Iv)
                   if (!args[1].includes('youtu')) return reply(mess.error.Iv)
                   reply(mess.wait)
                   var req = await (await fetch(`https://api.xfarr.com/api/download/ytaudio2?apikey=arsyl&url=${setting.apikey.xcode}&video_url=${args[1]}`)).json()
                   var { code } = req
                   if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                   var { title, thumbnail, quality, sizeF, url } = req.result
                   var teks = `*[ YOUTUBE AUDIO ]*\n\n`
                   teks += `• *Title :* ${title}\n`
                   teks += `• *Size :* ${sizeF}\n`
                   teks += `• *Quality :* ${quality}\n\n`
                   teks += `_Tunggu sebentar, permintaanmu sedang dikirim oleh bot_`
                   conn.sendMessage(from, { image: { url: thumbnail }, caption: teks }, { quoted: msg })
                   conn.sendMessage(from, { audio: { url: url }, mimetype: 'audio/mp4' }, { quoted: msg })
                   limitAdd(sender, limit)
                   break                   

             case prefix+'spotifydl':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
                   if (args.length < 2) return reply(`Kirim perintah ${command} link`)
                   if (!isUrl(args[1])) return reply(mess.error.Iv)
                   if (!args[1].includes('spotify')) return reply(mess.error.Iv)
                   reply(mess.wait)
                   var req = await (await fetch(`https://api.neoxr.eu/api/spotify?url=${args[1]}&apikey=apikeygw`)).json()
                   var { code } = req
                   if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                   var { title, thumbnail, duration, url } = req.data
                   var teks = `*[ SPOTIFY ]*\n\n`
                   teks += `• *Title :* ${title}\n`
                   teks += `• *Duration :* ${duration}\n\n`
                   teks += `_Tunggu sebentar, permintaanmu sedang dikirim oleh bot_`
                   conn.sendMessage(from, { image: { url: thumbnail }, caption: teks }, { quoted: msg })
                   conn.sendMessage(from, { audio: { url: url }, mimetype: 'audio/mp4' }, { quoted: msg })
                   limitAdd(sender, limit)
                   break                   

			// Owner Menu
			case prefix+'exif':
			    if (!isOwner) return reply(mess.OnlyOwner)
			    var namaPack = q.split('|')[0] ? q.split('|')[0] : q
                var authorPack = q.split('|')[1] ? q.split('|')[1] : ''
                exif.create(namaPack, authorPack)
				reply(`Sukses membuat exif`)
				break
			case prefix+'leave':
			    if (!isOwner) return reply(mess.OnlyOwner)
				if (!isGroup) return reply(mess.OnlyGrup)
				conn.groupLeave(from)
			    break
			case prefix+'join':
			    if (!isOwner) return reply(mess.OnlyOwner)
				if (args.length < 2) return reply(`Kirim perintah ${command} _linkgrup_`)
				if (!isUrl(args[1])) return reply(mess.error.Iv)
				var url = args[1]
			    url = url.split('https://chat.whatsapp.com/')[1]
				var data = await conn.groupAcceptInvite(url)
				reply(jsonformat(data))
				break
            case prefix+'bc': case prefix+'broadcast':
			    if (!isOwner) return reply(mess.OnlyOwner)
		        if (args.length < 2) return reply(`Masukkan isi pesannya`)
                var data = await store.chats.all()
                for (let i of data) {
                   conn.sendMessage(i.id, { text: `${q}\n\n_*BROADCAST MESSAGE*_` })
                   await sleep(1000)
                }
                break
			case prefix+'self':
                if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
                conn.mode = 'self'
                reply(`Berhasil berubah ke mode Self!`)
                break
			case prefix+'public': case prefix+'publik':
                if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
                conn.mode = 'public'
			    reply(`Berhasil berubah ke mode Public!`)
                break
			case prefix+'addprem':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Penggunaan :\n*${prefix}addprem* @tag waktu\n*${prefix}addprem* nomor waktu\n\nContoh : ${command} @tag 30d`)
                if (!args[2]) return reply(`Mau yang berapa hari?`)
                if (mentioned.length !== 0) {
                    _prem.addPremiumUser(mentioned[0], args[2], premium)
                    reply('Sukses')
                } else {
                 var cekap = await conn.onWhatsApp(args[1]+"@s.whatsapp.net")
                 if (cekap.length == 0) return reply(`Masukkan nomer yang valid/terdaftar di WhatsApp`)
                    _prem.addPremiumUser(args[1] + '@s.whatsapp.net', args[2], premium)
                    reply('Sukses')
                }
                break
            case prefix+'delprem':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Penggunaan :\n*${prefix}delprem* @tag\n*${prefix}delprem* nomor`)
                if (mentioned.length !== 0){
                    premium.splice(_prem.getPremiumPosition(mentioned[0], premium), 1)
                    fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
                    reply('Sukses!')
                } else {
                 var cekpr = await conn.oWhatsApp(args[1]+"@s.whatsapp.net")
                 if (cekpr.length == 0) return reply(`Masukkan nomer yang valid/terdaftar di WhatsApp`)
                    premium.splice(_prem.getPremiumPosition(args[1] + '@s.whatsapp.net', premium), 1)
                    fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
                    reply('Sukses!')
                }
                break
			// Random Menu
                case prefix+'quote': case prefix+'quotes':
                case prefix+'randomquote': case prefix+'randomquotes':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
                   var data = JSON.parse(fs.readFileSync('./database/quotes.json'))
                   data = pickRandom(data)
                   reply(data.quotes+'\n\n-- '+data.author)
                   limitAdd(sender, limit)
                   break
                case prefix+'fakta': case prefix+'randomfakta':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
                   var data = fs.readFileSync('./database/fakta.txt', 'utf-8').split('\n')
                   reply(pickRandom(data))
                   limitAdd(sender, limit)
                   break
                case prefix+'dare':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
                   var data = fs.readFileSync('./database/dare.txt', 'utf-8').split('\n')
                   reply(pickRandom(data))
                   limitAdd(sender, limit)
                   break
                case prefix+'listkota':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
                   var req = await (await fetch(`https://api.lolhuman.xyz/api/sholat/kota?apikey=arsyl`)).json()
                   var { code } = req
                   if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                   reply(req.result)
                   limitAdd(sender, limit)
                   break
                case prefix+'truth':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
                   var data = fs.readFileSync('./database/truth.txt', 'utf-8').split('\n')
                   reply(pickRandom(data))
                   limitAdd(sender, limit)
                   break                                     
                case prefix+'quoteanime': case prefix+'quotesanime':
                case prefix+'animequotes': case prefix+'animequote':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
                   require('../lib/quoteanime').quoteAnime().then( res => {
                     var data = pickRandom(res)
                     var teks = `${data.quote}\n\n- ${data.char_name}\nin *${data.anime_title}* eps *${data.at_ep}*`
                     reply(teks)
                     limitAdd(sender, limit)
                   }).catch((e) => reply(mess.error.api))
                   break
                case prefix+'gempa':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
                   reply(mess.wait)
                   var req = await (await fetch('https://api.lolhuman.xyz/api/infogempa?apikey=arsyl')).json()
                   var { code } = req
                   if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                   var { map, waktu, potensi, lokasi } = req.result
                   var teks = `*[ INFO GEMPA ]*\n\n`
                   teks += `• ${potensi}\n`
                   teks += `• Waktu: ${waktu}\n`
                   teks += `• Lokasi: ${lokasi}\n`
                   conn.sendMessage(from, { image: { url: map }, caption: teks }, { quoted: msg })
                   limitAdd(sender, limit)
                   break                   
                case prefix+'waifu':
                   if (!isPremium) return reply(`kamu bukan pengguna premium! silakan ketik *#premium*`)
                   reply(mess.wait)
                   var data = (await axios.get('https://waifu.pics/api/sfw/waifu')).data.url
                   conn.sendMessage(from, { image: { url: data }}, { quoted: msg })
                   limitAdd(sender, limit)
                   break
                case prefix+'neko':
                   if (!isPremium) return reply(`kamu bukan pengguna premium! silakan ketik *#premium*`)
                   reply(mess.wait)
                   var data = (await axios.get('https://waifu.pics/api/sfw/neko')).data.url
                   conn.sendMessage(from, { image: { url: data }}, { quoted: msg })
                   limitAdd(sender, limit)
                   break
                case prefix+'hentai':
                   if (!isPremium) return reply(`kamu bukan pengguna premium! silakan ketik *#premium*`)
                   reply(mess.wait)
                   var data = (await axios.get('https://waifu.pics/api/nsfw/blowjob')).data.url
                   conn.sendMessage(from, { image: { url: data }}, { quoted: msg })
                   limitAdd(sender, limit)
                   break 
                                    
                                                                              
            // PhotoOxy Menu
            case prefix+'flaming':
               if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
               if (args.length < 2) return reply(`Kirim perintah ${command} teks`)
               reply(mess.wait)
               getBuffer(`https://api.xcodeteam.xyz/api/photooxy/realistic-flaming-text-effect?api_key=${setting.apikey.xcode}&text=${q}`)
               .then( res => {
               	if (res === undefined) return reply(mess.error.api)
                   conn.sendMessage(from, { image: res }, { quoted: msg })
               	limitAdd(sender, limit)
               }).catch(() => reply(mess.error.api))
               break
            case prefix+'night':
               if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
               if (args.length < 2) return reply(`Kirim perintah ${command} teks`)
               reply(mess.wait)
               getBuffer(`https://api.xcodeteam.xyz/api/photooxy/write-stars-text-on-the-night-sky?api_key=${setting.apikey.xcode}&text=${q}`)
               .then( res => {
               	if (res === undefined) return reply(mess.error.api)
                   conn.sendMessage(from, { image: res }, { quoted: msg })
               	limitAdd(sender, limit)
               }).catch(() => reply(mess.error.api))
               break
            case prefix+'shadow':
               if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
               if (args.length < 2) return reply(`Kirim perintah ${command} teks`)
               reply(mess.wait)
               getBuffer(`https://api.xcodeteam.xyz/api/photooxy/shadow-text-effect-in-the-sky?api_key=${setting.apikey.xcode}&text=${q}`)
               .then( res => {
               	if (res === undefined) return reply(mess.error.api)
                   conn.sendMessage(from, { image: res }, { quoted: msg })
               	limitAdd(sender, limit)
               }).catch(() => reply(mess.error.api))
               break
            case prefix+'paper':
               if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
               if (args.length < 2) return reply(`Kirim perintah ${command} teks`)
               reply(mess.wait)
               getBuffer(`https://api.xcodeteam.xyz/api/photooxy/write-text-on-burn-paper?api_key=${setting.apikey.xcode}&text=${q}`)
               .then( res => {
               	if (res === undefined) return reply(mess.error.api)
                   conn.sendMessage(from, { image: res }, { quoted: msg })
               	limitAdd(sender, limit)
               }).catch(() => reply(mess.error.api))
               break
            case prefix+'grass':
               if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
               if (args.length < 2) return reply(`Kirim perintah ${command} teks`)
               reply(mess.wait)
               getBuffer(`https://api.xcodeteam.xyz/api/photooxy/make-quotes-under-grass?api_key=${setting.apikey.xcode}&text=${q}`)
               .then( res => {
               	if (res === undefined) return reply(mess.error.api)
                   conn.sendMessage(from, { image: res }, { quoted: msg })
               	limitAdd(sender, limit)
               }).catch(() => reply(mess.error.api))
               break
            case prefix+'cube':
               if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
               if (args.length < 2) return reply(`Kirim perintah ${command} teks`)
               reply(mess.wait)
               getBuffer(`https://api.xcodeteam.xyz/api/photooxy/3d-text-effect-under-white-cube?api_key=${setting.apikey.xcode}text=${q}`)
               .then( res => {
               	if (res === undefined) return reply(mess.error.api)
                   conn.sendMessage(from, { image: res }, { quoted: msg })
               	limitAdd(sender, limit)
               }).catch(() => reply(mess.error.api))
               break
            case prefix+'glow':
               if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
               if (args.length < 2) return reply(`Kirim perintah ${command} teks`)
               reply(mess.wait)
               getBuffer(`https://api.xcodeteam.xyz/api/photooxy/make-smoky-neon-glow-effect?api_key=${setting.apikey.xcode}&text=${q}`)
               .then( res => {
               	if (res === undefined) return reply(mess.error.api)
                   conn.sendMessage(from, { image: res }, { quoted: msg })
               	limitAdd(sender, limit)
               }).catch(() => reply(mess.error.api))
               break
            case prefix+'rainbow':
               if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
               if (args.length < 2) return reply(`Kirim perintah ${command} teks`)
               reply(mess.wait)
               getBuffer(`https://api.xcodeteam.xyz/api/photooxy/rainbow-shine-text?api_key=${setting.apikey.xcode}&text=${q}`)
               .then( res => {
               	if (res === undefined) return reply(mess.error.api)
                   conn.sendMessage(from, { image: res }, { quoted: msg })
               	limitAdd(sender, limit)
               }).catch(() => reply(mess.error.api))
               break
            case prefix+'fabric':
               if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
               if (args.length < 2) return reply(`Kirim perintah ${command} teks`)
               reply(mess.wait)
               getBuffer(`https://api.xcodeteam.xyz/api/photooxy/army-camouflage-fabric-text-effect?api_key=${setting.apikey.xcode}&text=${q}`)
               .then( res => {
               	if (res === undefined) return reply(mess.error.api)
                   conn.sendMessage(from, { image: res }, { quoted: msg })
               	limitAdd(sender, limit)
               }).catch(() => reply(mess.error.api))
               break
            case prefix+'glowing':
               if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
               if (args.length < 2) return reply(`Kirim perintah ${command} teks`)
               reply(mess.wait)
               getBuffer(`https://api.xcodeteam.xyz/api/photooxy/create-a-3d-glowing-text-effect?api_key=${setting.apikey.xcode}&text=${q}`)
               .then( res => {
               	if (res === undefined) return reply(mess.error.api)
                   conn.sendMessage(from, { image: res }, { quoted: msg })
               	limitAdd(sender, limit)
               }).catch(() => reply(mess.error.api))
               break
            case prefix+'honey':
               if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
               if (args.length < 2) return reply(`Kirim perintah ${command} teks`)
               reply(mess.wait)
               getBuffer(`https://api.xcodeteam.xyz/api/photooxy/honey-text-effect?api_key=${setting.apikey.xcode}&text=${q}`)
               .then( res => {
               	if (res === undefined) return reply(mess.error.api)
                   conn.sendMessage(from, { image: res }, { quoted: msg })
               	limitAdd(sender, limit)
               }).catch(() => reply(mess.error.api))
               break
            case prefix+'vintage':
               if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
               if (args.length < 2) return reply(`Kirim perintah ${command} teks`)
               reply(mess.wait)
               getBuffer(`https://api.xcodeteam.xyz/api/photooxy/vintage-text-style?api_key=${setting.apikey.xcode}&text=${q}`)
               .then( res => {
               	if (res === undefined) return reply(mess.error.api)
                   conn.sendMessage(from, { image: res }, { quoted: msg })
               	limitAdd(sender, limit)
               }).catch(() => reply(mess.error.api))
               break
            case prefix+'fur':
               if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
               if (args.length < 2) return reply(`Kirim perintah ${command} teks`)
               reply(mess.wait)
               getBuffer(`https://api.xcodeteam.xyz/api/photooxy/fur-text-effect-generator?api_key=${setting.apikey.xcode}&text=${q}`)
               .then( res => {
               	if (res === undefined) return reply(mess.error.api)
                   conn.sendMessage(from, { image: res }, { quoted: msg })
               	limitAdd(sender, limit)
               }).catch(() => reply(mess.error.api))
               break
            case prefix+'striking':
               if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
               if (args.length < 2) return reply(`Kirim perintah ${command} teks`)
               reply(mess.wait)
               getBuffer(`https://api.xcodeteam.xyz/api/photooxy/striking-3d-text-effect?api_key=${setting.apikey.xcode}&text=${q}`)
               .then( res => {
               	if (res === undefined) return reply(mess.error.api)
                   conn.sendMessage(from, { image: res }, { quoted: msg })
               	limitAdd(sender, limit)
               }).catch(() => reply(mess.error.api))
               break
			// Search Menu
               case prefix+'ytsearch': case prefix+'yts':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
                   if (args.length < 2) return reply(`Kirim perintah ${command} query`)
                   reply(mess.wait)
                   var req = await (await fetch(`https://api.xcodeteam.xyz/api/searcher/youtube?api_key=${setting.apikey.xcode}&video_title=${q}`)).json()
                   var { code } = req
                   if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                   var no = 1
                   var teks = `*YOUTUBE SEARCH*\n\n`
                   for (let i of req.data) {
                   	var { url, title } = i
                       teks += `*(${no++})*\n`
                       teks += `• *Url :* ${url}\n`
                       teks += `• *Title :* ${title}\n\n`
                   }
                   reply(teks)
                   limitAdd(sender, limit)
                   break
               case prefix+'cekresi': case prefix+'resi':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
                   if (args.length < 2) return reply(`Kirim perintah ${command} query`)
                   reply(mess.wait)
                   var req = await (await fetch(`https://api.lolhuman.xyz/api/checkresi?apikey=arsyl&resi=${q}`)).json()
                   var { code } = req
                   if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                   var no = 1
                   var teks = `*[ RESI HISTORY ]*\n\n`
                   for (let i of req.result.history) {
                   	var { note, time } = i
                       teks += `*(${no++})*\n`
                       teks += `• *Keterangan :* ${note}\n`
                       teks += `• *Waktu :* ${time}\n\n`
                   }
                   reply(teks)
                   limitAdd(sender, limit)
                   break                  
               case prefix+'layarkaca21': case prefix+'lk21':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
                   if (args.length < 2) return reply(`Kirim perintah ${command} judul`)
                   reply(mess.wait)
                   var req = await (await fetch(`https://api.xfarr.com/api/moviestory/lk21search?apikey=arsyl&query=${q}`)).json()
                   var { code } = req
                   if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                   var no = 1
                   var teks = `*[ LAYARKACA 21 ]*\n\n`
                   for (let i of req.result) {
                   	var { stars, sutradara, url, title } = i
                       teks += `(${no++}) ${title}\n`
                       teks += `-----------------------\n`
                       teks += `• *Artis :* ${stars}\n`
                       teks += `• *Sutradara :* ${sutradara}\n`
                       teks += `• *Video Url :* ${url}\n\n`
                   }
                   reply(teks)
                   limitAdd(sender, limit)
                   break 
               case prefix+'drakor':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
                   if (args.length < 2) return reply(`Kirim perintah ${command} judul`)
                   reply(mess.wait)
                   var req = await (await fetch(`https://api.neoxr.eu/api/drakor?q=${q}&apikey=apiarsyl`)).json()
                   var { code } = req
                   if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                   var no = 1
                   var teks = `*[ DRAMA KOREA ]*\n\n`
                   for (let i of req.data) {
                   	var { episode, release, url, title } = i
                       teks += `(${no++}) ${title}\n`
                       teks += `• *Episode :* ${episode}\n`
                       teks += `• *Release :* ${release}\n`
                       teks += `• *Video Url :* ${url}\n\n`
                   }
                   reply(teks)
                   limitAdd(sender, limit)
                   break                         
               case prefix+'spotify':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
                   if (args.length < 2) return reply(`Kirim perintah ${command} query`)
                   reply(mess.wait)
                   var req = await (await fetch(`https://api.lolhuman.xyz/api/spotifysearch?apikey=arsyl&query=${q}`)).json()
                   var { code } = req
                   if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                   var no = 1
                   var teks = `*SPOTIFY SEARCH*\n\n`
                   for (let i of req.result) {
                   	var { link, title, artists } = i
                       teks += `*(${no++})*\n`
                       teks += `• *Title :* ${title}\n`
                       teks += `• *Artis :* ${artists}\n`
                       teks += `• *Link :* ${link}\n\n`
                   }
                   reply(teks)
                   limitAdd(sender, limit)
                   break                                 
               case prefix+'lirik':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
                   if (args.length < 2) return reply(`Kirim perintah ${command} query`)
                   reply(mess.wait)
                   var req = await (await fetch(`https://api.lolhuman.xyz/api/lirik?apikey=arsyl&query=${q}`)).json()
                   var { code } = req
                   if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                   reply(req.result)
                   limitAdd(sender, limit)
                   break

               case prefix+'jadwalsholat':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
                   if (args.length < 2) return reply(`Kirim perintah ${command} kota`)
                   reply(mess.wait)
                   var req = await (await fetch(`https://api.lolhuman.xyz/api/sholat/${q}?apikey=arsyl`)).json()
                   var { code } = req
                   if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                   var { wilayah, tanggal, imsak, subuh, dzuhur, ashar, maghrib, isya } = req.result
                   var teks = `*[ JADWAL SHALAT ]*\n\n• Lokasi : ${wilayah}\n• Tanggal : ${tanggal}\n• Imsak : ${imsak}\n• Subuh : ${subuh}\n• Dzuhur : ${dzuhur}\n• Ashar : ${ashar}\n• Maghrib : ${maghrib}\n• Isya : ${isya}\n\n_Data : https://bimasislam.kemenag.go.id/jadwalshalat_`
                   reply(teks)
                   limitAdd(sender, limit)
                   break                   

               case prefix+'cuaca':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
                   if (args.length < 2) return reply(`Kirim perintah ${command} kota`)
                   reply(mess.wait)
                   var req = await (await fetch(`https://api.lolhuman.xyz/api/cuaca/${q}?apikey=arsyl`)).json()
                   var { code } = req
                   if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                   var { tempat, latitude, longitude, cuaca, angin, suhu, udara } = req.result
                   var teks = `*[ INFO CUACA ]*\n\n• Lokasi : ${tempat}\n• Latitude : ${latitude}\n• Longitude : ${longitude}\n• Cuaca : ${cuaca}\n• Angin : ${angin}\n• Suhu : ${suhu}\n• Udara : ${udara}\n`
                   reply(teks)
                   limitAdd(sender, limit)
                   break  

               case prefix+'midjourney':
                if (!isPremium) return reply(`kamu bukan pengguna premium! silakan ketik *#premium*`)
                   if (args.length < 2) return reply(`Kirim perintah ${command} prompt`)
                   reply(mess.wait)
                   getBuffer(`https://api.xcodeteam.xyz/api/artificial-intelligence/midjourney?api_key=${setting.apikey.xcode}&text=${q}`)
                   .then( res => {
                   if (res === undefined) return reply(mess.error.api)
                   conn.sendMessage(from, { image: res }, { quoted: msg })
                   limitAdd(sender, limit)
                   }).catch(() => reply(mess.error.api))
                   break
                

               case prefix+'stablediff':
                if (!isPremium) return reply(`kamu bukan pengguna premium! silakan ketik *#premium*`)
                   if (args.length < 2) return reply(`Kirim perintah ${command} prompt`)
                   reply(mess.wait)
                   getBuffer(`https://aemt.me/stablediffusion?text=${q}`)
                       .then( res => {
                       if (res === undefined) return reply(mess.error.api)
                       conn.sendMessage(from, { image: res }, { quoted: msg })
                       limitAdd(sender, limit)
                       }).catch(() => reply(mess.error.api))
                       break                   

               case prefix+'ss':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
                   if (args.length < 2) return reply(`Kirim perintah ${command} url`)
                   reply(mess.wait)
                   getBuffer(`https://api.xcodeteam.xyz/api/tools/screenshot-website?api_key=${setting.apikey.xcode}&device=desktop&target_url=${q}`)
                   .then( res => {
                   if (res === undefined) return reply(mess.error.api)
                   conn.sendMessage(from, { image: res }, { quoted: msg })
                   limitAdd(sender, limit)
                   }).catch(() => reply(mess.error.api))
                   break

               case prefix+'gimage': case prefix+'image':
                   if (!isPremium) return reply(`kamu bukan pengguna premium! silakan ketik *#premium*`)
                   if (args.length < 2) return reply(`Kirim perintah ${command} query`)
                   reply(mess.wait)
                   var req = await (await fetch(`https://api.xcodeteam.xyz/api/searcher/google-image?api_key=${setting.apikey.xcode}&gi_search=${q}`)).json()
                   var { code } = req
                   if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                   conn.sendMessage(from, { image: { url: req.data[0] }}, { quoted: msg })
                   limitAdd(sender, limit)
                   break
 
                   case prefix+'pin': case prefix+'pinterest':
                    if (!isPremium) return reply(`kamu bukan pengguna premium! silakan ketik *#premium*`)
                    if (args.length < 2) return reply(`Kirim perintah ${command} query`)
                    reply(mess.wait)
                    var req = await (await fetch(`https://aemt.me/pinterest?query=${q}`)).json()
                    var { code } = req
                    if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                    conn.sendMessage(from, { image: { url: req.result[0] }}, { quoted: msg })
                    limitAdd(sender, limit)
                    break                   
			   // Game Menu
               case prefix+'asahotak':
                if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                   if (isPlayGame(from, asahotak)) return conn.reply(from, `Masih ada game yang belum diselesaikan`, msg)
                   var req = await (await fetch(`https://api.zahwazein.xyz/entertainment/asahotak?apikey=zenzkey_7b2869ebf5be`)).json()
                   var { code } = req
                   if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                   var { soal, jawaban } = req.result
                   var teks = `*ASAH OTAK*\n\n`+monospace(`Soal : ${soal}\nPetunjuk : ${jawaban.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '_')}\nWaktu : ${gamewaktu}s`)
                   var sendAsahOtak = conn.sendMessage(from, { text: teks }, { quoted: msg, messageId: 'BAE5'+makeid(10).toUpperCase()+'AO' })
                   var jawab = jawaban.toLowerCase()
                   addPlayGame(from, 'Asah Otak', jawab, gamewaktu, sendAsahOtak, asahotak)
                   gameAdd(sender, glimit)
                   break
               case prefix+'caklontong':
                if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                   if (isPlayGame(from, caklontong)) return conn.reply(from, `Masih ada game yang belum diselesaikan`, msg)
                   var req = await (await fetch(`https://api.zahwazein.xyz/entertainment/caklontong?apikey=zenzkey_7b2869ebf5be`)).json()
                   var { code } = req
                   if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                   var { soal, jawaban } = req.result
                   var teks = `*CAK LONTONG*\n\n`+monospace(`Soal : ${soal}\nPetunjuk : ${jawaban.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '_')}\nWaktu : ${gamewaktu}s`)
                   var sendCakLontong = conn.sendMessage(from, { text: teks }, { quoted: msg, messageId: 'BAE5'+makeid(10).toUpperCase()+'CL' })
                   var jawab = jawaban.toLowerCase()
                   addPlayGame(from, 'Cak Lontong', jawab, gamewaktu, sendCakLontong, caklontong)
                   gameAdd(sender, glimit)
                   break
			case prefix+'family100':
        if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                if (isPlayGame(from, family100)) return conn.reply(from, `Masih ada game yang belum diselesaikan`, msg)
                var req = await (await fetch(`https://api.zahwazein.xyz/entertainment/family100?apikey=zenzkey_7b2869ebf5be`)).json()
                var { code } = req
                if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                   var { soal, jawaban } = req.result
                   var teks = `*[Family 100]*\n\n`+monospace(`Jawablah pertanyaan di bawah ini\n${soal}\n\nWaktu : ${gamewaktu} detik\nTotal Jawaban : ${jawaban.length}`)
                   conn.sendMessage(from, { text: teks }, { quoted: msg, messageId: 'BAE5'+makeid(10).toUpperCase()+'FML' })
                   .then( res => {
                      let rgfds = []
                      for (let i of jawaban) {
                      let fefs = i.split('/') ? i.split('/')[0] : i
                      let iuhbb = fefs.startsWith(' ') ? fefs.replace(' ', '') : fefs
                      let axsf = iuhbb.endsWith(' ') ? iuhbb.replace(iuhbb.slice(-1), '') : iuhbb
                      rgfds.push(axsf.toLowerCase())
                    }
                     addPlayGame(from, 'Family 100', rgfds, gamewaktu, res, family100)
                     gameAdd(sender, glimit)
                     })
                   break
                case prefix+'siapakahaku':
                  if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                   if (isPlayGame(from, siapakahaku)) return conn.reply(from, `Masih ada game yang belum diselesaikan`, msg)
                   var req = await (await fetch(`https://api.zahwazein.xyz/entertainment/siapakah?apikey=zenzkey_7b2869ebf5be`)).json()
                   var { code } = req
                   if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                   var { soal, jawaban } = req.result
                   var teks = `*SIAPAKAH AKU*\n\n`+monospace(`Soal : ${soal}\nPetunjuk : ${jawaban.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '_')}\nWaktu : ${gamewaktu}s`)
                   var sendSiapakahAku = conn.sendMessage(from, { text: teks }, { quoted: msg, messageId: 'BAE5'+makeid(10).toUpperCase()+'SA' })
                   var jawab = jawaban.toLowerCase()
                   addPlayGame(from, 'Siapakah Aku', jawab, gamewaktu, sendSiapakahAku, siapakahaku)
                   gameAdd(sender, glimit)
                   break
                 case prefix+'susunkata':
                  if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                   if (isPlayGame(from, susunkata)) return conn.reply(from, `Masih ada game yang belum diselesaikan`, msg)
                   var req = await (await fetch(`https://api.zahwazein.xyz/entertainment/susunkata?apikey=zenzkey_7b2869ebf5be`)).json()
                   var { code } = req
                   if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                   var { soal, tipe, jawaban } = req.result
                   var teks = `*SUSUN KATA*\n\n`+monospace(`Soal : ${soal}\nTipe : ${tipe}\nWaktu : ${gamewaktu}s`)
                   var sendSusunKata = conn.sendMessage(from, { text: teks }, { quoted: msg, messageId: 'BAE5'+makeid(10).toUpperCase()+'SK' })
                   var jawab = jawaban.toLowerCase()
                   addPlayGame(from, 'Susun Kata', jawab, gamewaktu, sendSusunKata, susunkata)
                   gameAdd(sender, glimit)
                   break
                case prefix+'tebakbendera':
                  if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                   if (isPlayGame(from, tebakbendera)) return conn.reply(from, `Masih ada game yang belum diselesaikan`, msg)
                   var req = await (await fetch(`https://api.zahwazein.xyz/entertainment/tebakbendera?apikey=zenzkey_7b2869ebf5be`)).json()
                   var { code } = req
                   if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                   var { flag, img, name } = req.result
                   var teks = `*TEBAK BENDERA*\n\n`+monospace(`Flag : ${flag}\nPetunjuk : ${name.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '_')}\nWaktu : ${gamewaktu}s`)
                   var sendTebakBendera = conn.sendMessage(from, { image: { url: img }, caption: teks }, { quoted: msg, messageId: 'BAE5'+makeid(10).toUpperCase()+'TB' })
                   var jawab = name.toLowerCase()
                   addPlayGame(from, 'Tebak Bendera', jawab, gamewaktu, sendTebakBendera, tebakbendera)
                   gameAdd(sender, glimit)
                   break   
                case prefix+'tebakkabupaten':
                  if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                   if (isPlayGame(from, tebakbendera)) return conn.reply(from, `Masih ada game yang belum diselesaikan`, msg)
                   var req = await (await fetch(`https://api.xcodeteam.xyz/api/games/tebak-bendera?api_key=${apikey.xcode}`)).json()
                   var { code } = req
                   if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                   var { flag, img, name } = req.data
                   var teks = `*TEBAK BENDERA*\n\n`+monospace(`Flag : ${flag}\nPetunjuk : ${name.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '_')}\nWaktu : ${gamewaktu}s`)
                   var sendTebakBendera = conn.sendMessage(from, { image: { url: img }, caption: teks }, { quoted: msg, messageId: 'BAE5'+makeid(10).toUpperCase()+'TB' })
                   var jawab = name.toLowerCase()
                   addPlayGame(from, 'Tebak Bendera', jawab, gamewaktu, sendTebakBendera, tebakbendera)
                   gameAdd(sender, glimit)
                   break                    
                case prefix+'tebakgambar':
                  if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                   if (isPlayGame(from, tebakgambar)) return conn.reply(from, `Masih ada game yang belum diselesaikan`, msg)
                   var req = await (await fetch(`https://api.zahwazein.xyz/entertainment/tebakgambar?apikey=zenzkey_7b2869ebf5be`)).json()
                   var { code } = req
                   if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                   var { img, jawaban, deskripsi } = req.result
                   var teks = `*TEBAK GAMBAR*\n\n`+monospace(`Deskripsi : ${deskripsi}\nPetunjuk : ${jawaban.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '_')}\nWaktu : ${gamewaktu}s`)
                   var sendTebakGambar = conn.sendMessage(from, { image: { url: img }, caption: teks }, { quoted: msg, messageId: 'BAE5'+makeid(10).toUpperCase()+'TG' })
                   var jawab = jawaban.toLowerCase()
                   addPlayGame(from, 'Tebak Bendera', jawab, gamewaktu, sendTebakGambar, tebakgambar)
                   gameAdd(sender, glimit)
                   break
                case prefix+'tebakkalimat':
                  if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                   if (isPlayGame(from, tebakkalimat)) return conn.reply(from, `Masih ada game yang belum diselesaikan`, msg)
                   var req = await (await fetch(`https://api.xcodeteam.xyz/api/games/tebak-kalimat?api_key=${apikey.xcode}`)).json()
                   var { code } = req
                   if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                   var { soal, jawaban } = req.data
                   var teks = `*TEBAK KALIMAT*\n\n`+monospace(`Soal : ${soal}\nPetunjuk : ${jawaban.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '_')}\nWaktu : ${gamewaktu}s`)
                   var sendTebakKalimat = conn.sendMessage(from, { text: teks }, { quoted: msg, messageId: 'BAE5'+makeid(10).toUpperCase()+'TK' })
                   var jawab = jawaban.toLowerCase()
                   addPlayGame(from, 'Tebak Kalimat', jawab, gamewaktu, sendTebakKalimat, tebakkalimat)
                   gameAdd(sender, glimit)
                   break
                case prefix+'tebakkata':
                  if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                   if (isPlayGame(from, tebakkata)) return conn.reply(from, `Masih ada game yang belum diselesaikan`, msg)
                   var req = await (await fetch(`https://api.xcodeteam.xyz/api/games/tebak-kata?api_key=${apikey.xcode}`)).json()
                   var { code } = req
                   if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                   var { soal, jawaban } = req.data
                   var teks = `*TEBAK KATA*\n\n`+monospace(`Soal : ${soal}\nPetunjuk : ${jawaban.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '_')}\nWaktu : ${gamewaktu}s`)
                   var sendTebakKata = conn.sendMessage(from, { text: teks }, { quoted: msg, messageId: 'BAE5'+makeid(10).toUpperCase()+'TKK' })
                   var jawab = jawaban.toLowerCase()
                   addPlayGame(from, 'Tebak Kata', jawab, gamewaktu, sendTebakKata, tebakkata)
                   gameAdd(sender, glimit)
                   break
                case prefix+'tebakkimia':
                  if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                   if (isPlayGame(from, tebakkimia)) return conn.reply(from, `Masih ada game yang belum diselesaikan`, msg)
                   var req = await (await fetch(`https://api.zahwazein.xyz/entertainment/tebakkimia?apikey=zenzkey_7b2869ebf5be`)).json()
                   var { code } = req
                   if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                   var { unsur, lambang } = req.result
                   var teks = `*TEBAK KIMIA*\n\n`+monospace(`Unsur : ${unsur}\nWaktu : ${gamewaktu}s`)
                   var sendTebakKimia = conn.sendMessage(from, { text: teks }, { quoted: msg, messageId: 'BAE5'+makeid(10).toUpperCase()+'TKKK' })
                   var jawab = lambang.toLowerCase()
                   addPlayGame(from, 'Tebak Kimia', jawab, gamewaktu, sendTebakKimia, tebakkimia)
                   gameAdd(sender, glimit)
                   break
                case prefix+'tebaklirik':
                  if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                   if (isPlayGame(from, tebaklirik)) return conn.reply(from, `Masih ada game yang belum diselesaikan`, msg)
                   var req = await (await fetch(`https://api.zahwazein.xyz/entertainment/tebaklirik?apikey=zenzkey_7b2869ebf5be`)).json()
                   var { code } = req
                   if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                   var { soal, jawaban } = req.result
                   var teks = `*TEBAK LIRIK*\n\n`+monospace(`Soal : ${soal}\nPetunjuk : ${jawaban.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '_')}\nWaktu : ${gamewaktu}s`)
                   var sendTebakLirik = conn.sendMessage(from, { text: teks }, { quoted: msg, messageId: 'BAE5'+makeid(10).toUpperCase()+'TLL' })
                   var jawab = jawaban.toLowerCase()
                   addPlayGame(from, 'Tebak Lirik', jawab, gamewaktu, sendTebakLirik, tebaklirik)
                   gameAdd(sender, glimit)
                   break
                case prefix+'kuis':
                  if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                   if (isPlayGame(from, kuis)) return conn.reply(from, `Masih ada game yang belum diselesaikan`, msg)
                   var req = await (await fetch(`https://api.zahwazein.xyz/entertainment/tebaktebakan?apikey=zenzkey_7b2869ebf5be`)).json()
                   var { code } = req
                   if ([400, 403, 404, 429, 500].includes(code)) return reply(mess.error.api)
                   var { soal, jawaban } = req.result
                   var teks = `*KUIS GAME*\n\n`+monospace(`Soal : ${soal}\nPetunjuk : ${jawaban.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '_')}\nWaktu : ${gamewaktu}s`)
                   var sendKuis = conn.sendMessage(from, { text: teks }, { quoted: msg, messageId: 'BAE5'+makeid(10).toUpperCase()+'KS' })
                   var jawab = jawaban.toLowerCase()
                   addPlayGame(from, 'Kuis Game', jawab, gamewaktu, sendKuis, kuis)
                   gameAdd(sender, glimit)
                   break
                case prefix+'math':
                  if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                   if (isPlayGame(from, math)) return conn.reply(from, `Masih ada game yang belum diselesaikan`, msg)
                   if (args.length < 2) return reply(`Masukkan modenya!\n\nMode yang tersedia :\n1. noob\n2. easy\n3. medium\n4. hard\n5. extreme\n6. impossible\n7. impossible2\n\nContoh : ${command} noob`)
                   genMath(q.toLowerCase()).then(res => {}).catch(() => reply('Lah?'))
                   var poke = await genMath(q.toLowerCase())
                   var { soal, mode, jawaban } = poke
                   var teks = `*MATH GAME*\n\n`+monospace(`Soal : ${soal}\nMode : ${mode}\nWaktu : ${gamewaktu}s`)
                   conn.sendMessage(from, { text: teks }, { quoted: msg, messageId: 'BAE5'+makeid(10).toUpperCase()+'MH' })
                   .then( res => {
                     var jawab = jawaban
                     addPlayGame(from, 'Math Game', jawab, gamewaktu, res, math)
                     gameAdd(sender, glimit)
                 }).catch(() => reply(mess.error.api))
                 break
                case prefix+'delgame': case prefix+'deletegame':
                case prefix+'dellgame': case prefix+'nyerah':
                   if (!isQuotedMsg) return reply(`Balas pesan soal game yang ingin dihapus`)
                   if (quotedMsg.id.endsWith('AO')) {
                     var ao = getGamePosi(from, asahotak)
                     if (ao == undefined) return reply(`Game tersebut sudah selesai`)
                     reply(`*Asah Otak*\nJawaban : ${asahotak[ao].jawaban}`)
                     asahotak.splice(ao, 1)
                   } else if (quotedMsg.id.endsWith('CL')) {
                     var cl = getGamePosi(from, caklontong)
                     if (ao == undefined) return reply(`Game tersebut sudah selesai`)
                     reply(`*Cak Lontong*\nJawaban : ${caklontong[cl].jawaban}`)
                     caklontong.splice(cl, 1)
                   } else if (quotedMsg.id.endsWith('FML')) {
                     var fml = getGamePosi(from, family100)
                     if (fml == undefined) return reply(`Game tersebut sudah selesai`)
                     reply(`*Family100 Game*\nJawaban : ${family100[fml].jawaban}`)
                     family100.splice(fml, 1)
                   } else if (quotedMsg.id.endsWith('SA')) {
                     var sa = getGamePosi(from, siapakahaku)
                     if (sa == undefined) return reply(`Game tersebut sudah selesai`)
                     reply(`*Siapakah Aku*\nJawaban : ${siapakahaku[sa].jawaban}`)
                     siapakahaku.splice(sa, 1)
                   } else if (quotedMsg.id.endsWith('SK')) {
                     var sk = getGamePosi(from, susunkata)
                     if (sk == undefined) return reply(`Game tersebut sudah selesai`)
                     reply(`*Susun Kata*\nJawaban : ${susunkata[sk].jawaban}`)
                     susunkata.splice(sk, 1)
                   } else if (quotedMsg.id.endsWith('TB')) {
                     var tb = getGamePosi(from, tebakbendera)
                     if (tb == undefined) return reply(`Game tersebut sudah selesai`)
                     reply(`*Tebak Bendera*\nJawaban : ${tebakbendera[tb].jawaban}`)
                     tebakbendera.splice(tb, 1)
                   } else if (quotedMsg.id.endsWith('TG')) {
                     var tg = getGamePosi(from, family100)
                     if (tg == undefined) return reply(`Game tersebut sudah selesai`)
                     reply(`*Tebak Gambar*\nJawaban : ${tebakgambar[tg].jawaban}`)
                     tebakgambar.splice(tg, 1)
                   } else if (quotedMsg.id.endsWith('TK')) {
                     var tk = getGamePosi(from, tebakkalimat)
                     if (tk == undefined) return reply(`Game tersebut sudah selesai`)
                     reply(`*Tebak Kalimat*\nJawaban : ${tebakkalimat[tk].jawaban}`)
                     tebakkalimat.splice(tk, 1)
                   } else if (quotedMsg.id.endsWith('TKK')) {
                     var tkkk = getGamePosi(from, tebakkata)
                     if (tkkk == undefined) return reply(`Game tersebut sudah selesai`)
                     reply(`*Tebak Kata*\nJawaban : ${tebakkata[tkkk].jawaban}`)
                     tebakkata.splice(tkkk, 1)
                   } else if (quotedMsg.id.endsWith('TKKK')) {
                     var tkk = getGamePosi(from, tebakkimia)
                     if (tebakkimia[tkk].msg.key.id !== quotedMsg.id) return reply(`Game tersebut sudah selesai`)
                     reply(`*Tebak Kimia*\nJawaban : ${tebakkimia[tkk].jawaban}`)
                     tebakkimia.splice(tkk, 1)
                   } else if (quotedMsg.id.endsWith('TLL')) {
                     var tll = getGamePosi(from, tebaklirik)
                     if (tll == undefined) return reply(`Game tersebut sudah selesai`)
                     reply(`*Tebak Lirik*\nJawaban : ${tebaklirik[tll].jawaban}`)
                     tebaklirik.splice(tll, 1)
                   } else if (quotedMsg.id.endsWith('KS')) {
                     var ks = getGamePosi(from, kuis)
                     if (ks == undefined) return reply(`Game tersebut sudah selesai`)
                     reply(`*Kuis Game*\nJawaban : ${kuis[ks].jawaban}`)
                     kuis.splice(fml, 1)
                   } else if (quotedMsg.id.endsWith('MH')) {
                     var mh = getGamePosi(from, math)
                     if (mh == undefined) return reply(`Game tersebut sudah selesai`)
                     reply(`*Math Game*\nJawaban : ${math[mh].jawaban}`)
                     math.splice(mh, 1)
                   } else {
                     reply(`Balas soal game!`)
                   }
                   break
            case prefix+'tictactoe': case prefix+'ttt': case prefix+'ttc':
                   if (!isGroup)return reply(mess.OnlyGrup)
                   if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                   if (isTicTacToe(from, tictactoe)) return reply(`Masih ada game yg blum selesai`)
                   if (args.length < 2) return reply(`Kirim perintah *${prefix}tictactoe* @tag`)
                   if (mentioned.length !== 1) {
                     if (mentioned[0] === botNumber) return reply(`Tidak bisa bermain dengan bot!`)
                     if (mentioned[0] === sender) return reply(`Sad amat main ama diri sendiri`)
                     var hadiah = randomNomor(100, 150)
                     mentions(monospace(`@${sender.split('@')[0]} menantang @${mentioned[0].split('@')[0]} untuk bermain TicTacToe\n\nKirim (Y/N) untuk bermain\n\nHadiah : ${hadiah} balance`), [sender, mentioned[0]], false)
                     tictactoe.push({
                        id: from,
                        status: null,
                        hadiah: hadiah,
                        penantang: sender,
                        ditantang: mentioned[0],
                        waktu: setTimeout(() => {
                          if (isTicTacToe(from, tictactoe)) conn.sendMessage(from, { text: `Waktu TicTacToe Habis, Tidak ada balasan dari @${mentioned[0].split("@")[0]}`, mentions: [mentioned[0]] })
                          var posi = getPosTic(from, tictactoe)
                          tictactoe.splice(posi, 1)
                        }, 30000),
                        timeout: 60000,
                        TicTacToe: ['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣']
                     })
                     gameAdd(sender, glimit)
                   } else {
                     reply(`Kirim perintah *${prefix}tictactoe* @tag`)
                   }
                   break
                case prefix+'delttt': case prefix+'delttc':
                   if (!isGroup)return reply(mess.OnlyGrup)
                   if (!isTicTacToe(from, tictactoe)) return reply(`Tidak ada sesi game tictactoe di grup ini`)
                   var posi = getPosTic(from, tictactoe)
                   if (tictactoe[posi].penantang.includes(sender)) {
                     tictactoe.splice(posi, 1)
                     reply(`Berhasil menghapus sesi tictactoe di grup ini`)
                   } else if (tictactoe[posi].ditantang.includes(sender)) {
                     tictactoe.splice(posi, 1)
                     reply(`Berhasil menghapus sesi tictactoe di grup ini`)
                   } else if (isGroupAdmins) {
                     tictactoe.splice(posi, 1)
                     reply(`Berhasil menghapus sesi tictactoe di grup ini`)
                   } else if (isOwner) {
                     tictactoe.splice(posi, 1)
                     reply(`Berhasil menghapus sesi tictactoe di grup ini`)
                   } else {
                     reply(`Anda tidak bisa menghapus sesi tictactoe, karena bukan pemain!`)
                   }
                   break
            case prefix+'casino':
                   if (!isGroup)return reply(mess.OnlyGrup)
                   if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                   if (args.length < 2) return reply(`Kirim perintah *${command}* @tag nominal`)
                   if (mentionUser.length == 0) return reply(`Tag Lawan Yang Ingin Diajak Bermain Game`)
                   if (mentionUser.length > 2) return reply('Hanya bisa dengan 1 orang')
                   if (mentionUser[0] === sender) return reply(`Sad amat main sama diri sendiri`)
                   if (mentionUser[0] === botNumber) return reply(`Tidak bisa bermain dengan bot!`)
                   if (getCasino(from, casino) !== null) return reply(`Sedang Ada Sesi, tidak dapat dijalankan secara bersamaan\nKetik *${prefix}delcasino*, untuk menghapus sesi`)
                   if (args.length == 2) return reply('Masukan Nominal Nya')
                   //if (args[2].includes('-')) return reply(`Jangan menggunakan -`)
                   if (isNaN(parseInt(args[2]))) return reply('Nominal Harus Berupa Angka!')
                   args[2].replace(/[^\w\s\-]+/, '')
                   var anu = getBalance(sender, balance)
                   var ani = getBalance(mentionUser[0], balance)
                   if (anu < args[2] || anu == 'undefined') return reply(`Balance Tidak Mencukupi, Kumpulkan Terlebih Dahulu\nKetik ${prefix}balance, untuk mengecek Balance mu!`)
                   if (ani < args[2] || ani == 'undefined') return reply(`Balance Lawan Tidak Mencukupi Untuk Bermain Denganmu\nKetik ${prefix}balance @tag untuk mengecek Balance lawanmu`)
                   setCasino(from, sender.split("@")[0], mentioned[0].split("@")[0], Number(args[2]), casino)
                   gameAdd(sender, glimit)
                   var starGame = `🎰 Memulai Game Casino 💰\n\n• @${sender.replace("@s.whatsapp.net", "")} Menantang ${args[1]}, dengan Nominal: *$ ${parseInt(args[2])}*\n• Ketik Y/N untuk menerima atau menolak Permainan!\n• Jika 30 detik tidak ada Jawaban dari lawan, maka pertandingan otomatis dihapus`
                   conn.sendMessage(from, { text: starGame, mentions: [sender, args[1].replace("@", "") + "@s.whatsapp.net"] }, { quoted: msg })
                   break
                case prefix+'delcasino':
                   if (isPlayCasino(from, casino)) {
                     var csn = sesiCasino(from, casino)
                     if (csn.Z.includes(sender)) {
                       clearTimeout(csn.expired)
                       deleteCasino(from, casino)
                       reply('Berhasil Menghapus Sesi Casino')
                     } else if (csn.Y.includes(sender)) {
                       clearTimeout(csn.expired)
                       deleteCasino(from, casino)
                       reply('Berhasil Menghapus Sesi Casino')
                     } else if (isGroupAdmins) {
                       clearTimeout(csn.expired)
                       deleteCasino(from, casino)
                       reply('Berhasil Menghapus Sesi Casino')
                     } else if (isOwner) {
                       clearTimeout(csn.expired)
                       deleteCasino(from, casino)
                       reply('Berhasil Menghapu Sesi Casino')
                     } else {
                       reply('Anda tidak bisa menghapus sesi casino, karena bukan pemain!')
                     }
                   } else {
                     reply('Tidak ada sesi yang berlangsung')
                   }
                   break
                case prefix+'bet':
                  if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                   if (args.length < 2) return reply(`Masukkan jumlah bet balance, contoh: ${command} 1000`)
                   if (q < 5) return reply("Minimal 5 balance")
                   if (q > 1000) return reply("Maksimal 1000 balance")
                   if (isNaN(q)) return reply(`Nominal harus berupa angka!`)
                   args[1].replace(/[^\w\s\-]+/, '')
                   var anu = getBalance(sender, balance)
                   if (anu < q || anu == 'undefined') return reply(`*Kamu tidak bisa bertaruh* dengan balance *yang tidak kamu miliki!*\nBalance tersedia: $${anu}`)
                   var tambah = Number(q) + Number(q)
                   var angka1 = await randomNomor(8)
                   var angka2 = await randomNomor(10)
                   if (angka1 > angka2) {
                     addBalance(sender, nebal(tambah), balance)
                     reply(`🎰 Kamu telah bertaruh *${q}* balance\nHorree! Kamu pulang membawa *${tambah}* balance (✅)`)
                     gameAdd(sender, glimit)
                   } else if (angka1 < angka2) {
                     kurangBalance(sender, nebal(q), balance)
                     reply(`🎰 Kamu telah bertaruh *${q}* balance\nOh tidak! Kamu pulang tanpa *${q}* balance (❌)`)
                     gameAdd(sender, glimit)
                   }
                   break
            
			// Group Menu
			case prefix+'linkgrup': case prefix+'link': case prefix+'linkgc':
			    if (!isGroup) return reply(mess.OnlyGrup)
				if (!isBotGroupAdmins) return reply(mess.BotAdmin)
				var url = await conn.groupInviteCode(from).catch(() => reply(mess.error.api))
			    url = 'https://chat.whatsapp.com/'+url
				reply(url)
				break
			case prefix+'setnamegrup': case prefix+'setnamegc':
			    if (!isGroup) return reply(mess.OnlyGrup)
				if (!isGroupAdmins) return reply(mess.GrupAdmin)
				if (!isBotGroupAdmins) return reply(mess.BotAdmin)
				if (args.length < 2) return reply(`Kirim perintah ${command} teks`)
				await conn.groupUpdateSubject(from, q)
			    .then( res => {
				  reply(`Sukses`)
				}).catch(() => reply(mess.error.api))
			    break
			case prefix+'setdesc': case prefix+'setdescription':
			    if (!isGroup) return reply(mess.OnlyGrup)
				if (!isGroupAdmins) return reply(mess.GrupAdmin)
				if (!isBotGroupAdmins) return reply(mess.BotAdmin)
				if (args.length < 2) return reply(`Kirim perintah ${command} teks`)
				await conn.groupUpdateDescription(from, q)
			    .then( res => {
			      reply(`Sukses`)
				}).catch(() => reply(mess.error.api))
				break
			case prefix+'group': case prefix+'grup':
		        if (!isGroup) return reply(mess.OnlyGrup)
				if (!isGroupAdmins) return reply(mess.GrupAdmin)
				if (!isBotGroupAdmins) return reply(mess.BotAdmin)
				if (args.length < 2) return reply(`Kirim perintah ${command} _options_\nOptions : close & open\nContoh : ${command} close`)
				if (args[1] == "close") {
				  conn.groupSettingUpdate(from, 'announcement')
				  reply(`Sukses mengizinkan hanya admin yang dapat mengirim pesan ke grup ini`)
				} else if (args[1] == "open") {
				  conn.groupSettingUpdate(from, 'not_announcement')
				  reply(`Sukses mengizinkan semua peserta dapat mengirim pesan ke grup ini`)
				} else {
				  reply(`Kirim perintah ${command} _options_\nOptions : close & open\nContoh : ${command} close`)
				}
			    break
			case prefix+'revoke':
			    if (!isGroup) return reply(mess.OnlyGrup)
				if (!isGroupAdmins) return reply(mess.GrupAdmin)
				if (!isBotGroupAdmins) return reply(mess.BotAdmin)
				await conn.groupRevokeInvite(from)
			    .then( res => {
				  reply(`Sukses menyetel tautan undangan grup ini`)
				}).catch(() => reply(mess.error.api))
				break
		    case prefix+'tagall': case prefix+'infoall':
                if (!isGroup) return reply(mess.OnlyGrup)
		        if (!isGroupAdmins) return reply(mess.GrupAdmin)
		        let participants = msg.isGroup ? await groupMetadata.participants : ''
                let tekss = `*[ TAG ALL ]*\n\n${q}\n\n`
                for (let mem of participants) {
                  tekss += `• @${mem.id.split('@')[0]}\n`
                }
                conn.sendMessage(from, { text: tekss, mentions: participants.map(a => a.id) }, { quoted: msg })
                break
			case prefix+'hidetag':
		        if (!isGroup) return reply(mess.OnlyGrup)
				if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
			    let mem = [];
		        groupMembers.map( i => mem.push(i.id) )
				conn.sendMessage(from, { text: q ? q : '', mentions: mem })
			    break
              
			case prefix+'antilink':
                   if (!isGroup) return reply(mess.OnlyGrup)
                   if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                   if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                   if (args.length === 1) return reply(`Kirim perintah ${command} _options_\nOptions : enable & disable\nContoh : ${command} enable`)
                   if (args[1].toLowerCase() === 'enable') {
                     if (isAntiLink) return reply(`Udah aktif`)
                     antilink.push(from)
                     fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
                     reply('Antilink grup aktif')
                   } else if (args[1].toLowerCase() === 'disable') {
                     if (!isAntiLink) return reply(`Udah nonaktif`)
                     let anu = antilink.indexOf(from)
                     antilink.splice(anu, 1)
                     fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
                     reply('Antilink grup nonaktif')
                   } else {
                     reply(`Kirim perintah ${command} _options_\nOptions : enable & disable\nContoh : ${command} enable`)
                   }
                   break
             case prefix+'welcome':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                if (args.length < 2) return reply(`Kirim perintah ${command} _options_\nOptions : enable & disable\nContoh : ${command} enable`)
                if (args[1].toLowerCase() === "enable") {
                   if (isWelcome) return reply(`Welcome sudah aktif`)
                   welcome.push(from)
                   fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome, null, 2))
                   reply(`Sukses mengaktifkan welcome di grup ini`)
                } else if (args[1].toLowerCase() === "disable") {
                   if (!isWelcome) return reply(`Welcome sudah nonaktif`)
                   var posi = welcome.indexOf(from)
                   welcome.splice(posi, 1)
                   fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome, null, 2))
                   reply(`Sukses menonaktifkan welcome di grup ini`)
                } else {
                   reply(`Kirim perintah ${command} _options_\nOptions : enable & disable\nContoh : ${command} enable`)
                }
                break
			// Bank & Payment Menu
			case prefix+'topbalance':{
                balance.sort((a, b) => (a.balance < b.balance) ? 1 : -1)
                let top = '*── 「 TOP BALANCE 」 ──*\n\n\n'
                let arrTop = []
				var total = 10
				if (balance.length < 10) total = balance.length
                for (let i = 0; i < total; i ++){
                    top += `${i + 1} @${balance[i].id.split("@")[0]}\n- Balance : $${balance[i].balance}\n\n`
                    arrTop.push(balance[i].id)
                }
                mentions(top, arrTop, true)
            }
                break
            case prefix+'buylimit':{
                if (args.length < 2) return reply(`Kirim perintah *${prefix}buylimit* jumlah limit yang ingin dibeli\n\nHarga 1 limit = $150 balance`)
                if (args[1].includes('-')) return reply(`Jangan menggunakan -`)
                if (isNaN(args[1])) return reply(`Harus berupa angka`)
                if (args[1].toLowerCase() === 'infinity') return reply(`Yahaha saya ndak bisa di tipu`)
                let ane = Number(parseInt(args[1]) * 150)
                if (getBalance(sender, balance) < ane) return reply(`Balance kamu tidak mencukupi untuk pembelian ini`)
                kurangBalance(sender, ane, balance)
                giveLimit(sender, parseInt(args[1]), limit)
                reply(monospace(`Pembeliaan limit sebanyak ${args[1]} berhasil\n\nSisa Balance : $${getBalance(sender, balance)}\nSisa Limit : ${getLimit(sender, limitCount, limit)}/${limitCount}`))
            }
                break
			case prefix+'transfer':
            case prefix+'tfb':{
                 if (args.length < 2) return reply(`Kirim perintah *${command}* @tag nominal\nContoh : ${command} @0 2000`)
                 if (mentioned.length == 0) return reply(`Tag orang yang ingin di transfer balance`)
                 if (!args[2]) return reply(`Masukkan nominal nya!`)
                 if (isNaN(args[2])) return reply(`Nominal harus berupa angka!`)
                 if (args[2].toLowerCase() === 'infinity') return reply(`Yahaha saya ndak bisa di tipu`)
                 if (args[2].includes("-")) return reply(`Jangan menggunakan -`)
                 var anu = getBalance(sender, balance)
                 if (anu < args[2] || anu == 'undefined') return reply(`Balance Kamu Tidak Mencukupi Untuk Transfer Sebesar $${args[2]}, Kumpulkan Terlebih Dahulu\nKetik ${prefix}balance, untuk mengecek Balance mu!`)
                 kurangBalance(sender, parseInt(args[2]), balance)
                 addBalance(mentioned[0], parseInt(args[2]), balance)
                 reply(`Sukses transfer balance sebesar $${args[2]} kepada @${mentioned[0].split("@")[0]}`)
            }
                 break
            case prefix+'buygamelimit':
            case prefix+'buyglimit':{
                if (args.length < 2) return reply(`Kirim perintah *${prefix}buyglimit* jumlah game limit yang ingin dibeli\n\nHarga 1 game limit = $150 balance\nPajak $1 / $10`)
                if (args[1].includes('-')) return reply(`Jangan menggunakan -`)
                if (isNaN(args[1])) return reply(`Harus berupa angka`)
                if (args[1].toLowerCase() === 'infinity') return reply(`Yahaha saya ndak bisa di tipu`)
                let ane = Number(parseInt(args[1]) * 150)
                if (getBalance(sender, balance) < ane) return reply(`Balance kamu tidak mencukupi untuk pembelian ini`)
                kurangBalance(sender, ane, balance)
                givegame(sender, parseInt(args[1]), glimit)
                reply(monospace(`Pembeliaan game limit sebanyak ${args[1]} berhasil\n\nSisa Balance : $${getBalance(sender, balance)}\nSisa Game Limit : ${cekGLimit(sender, gcount, glimit)}/${gcount}`))
            }
                break
			case prefix+'limit': case prefix+'balance':
			case prefix+'ceklimit': case prefix+'cekbalance':
          if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis! ketik ${prefix}buylimit untuk membeli limit atau bisa membeli premium untuk mendapatkan limit tidak terbatas`)
			    if (mentioned.length !== 0){
					var Ystatus = ownerNumber.includes(mentioned[0])
					var isPrim = Ystatus ? true : _prem.checkPremiumUser(mentioned[0], premium)
				    var ggcount = isPrim ? gcounti.prem : gcounti.user
                    var limitMen = `${getLimit(mentioned[0], limitCount, limit)}`
                    reply(`🍟 limit : *[ ${_prem.checkPremiumUser(mentioned[0], premium) ? 'Unlimited' : limitMen}/${limitCount} ]*\n🎮 games : *[ ${cekGLimit(sender, gcount, glimit)}/${gcount} ]*\n💸 balance : *[ ${getBalance(mentioned[0], balance)} ]*\n\ningin mendapatkan limit tanpa batas? ketik *${prefix}premium*`)
                } else {
                    var limitPrib = `${getLimit(sender, limitCount, limit)}/${limitCount}`
                    reply(`🍟 limit : *[ ${isPremium ? 'Unlimited' : limitPrib} ]*\n🎮 games : *[ ${cekGLimit(sender, gcount, glimit)}/${gcount} ]*\n💸 balance : *[ ${getBalance(sender, balance)} ]*\n\ningin mendapatkan limit tanpa batas? ketik *${prefix}premium*`)
                }
				break
			default:
		    }
			} catch (err) {
		console.log(color('[ERROR]', 'red'), err)
	}
}
