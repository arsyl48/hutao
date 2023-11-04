const moment = require("moment-timezone");
const fs = require("fs");

moment.tz.setDefault("Asia/Jakarta").locale("id");

let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)
let setting = JSON.parse(fs.readFileSync('./config.json'))
const { getLimit, getBalance, cekGLimit } = require("../lib/limit")

const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

function toCommas(x) {
	x = x.toString()
	var pattern = /(-?\d+)(\d{3})/;
     while (pattern.test(x))
	   x = x.replace(pattern, "$1,$2");
	return x;
}

exports.allmenu = (sender, prefix, pushname, isOwner, isPremium, balance, limit, limitCount, glimit, gcount) => {
	return `${ucapanWaktu} ${pushname !== undefined ? pushname : 'Kak'}

  *- Status :* ${isOwner ? 'Owner' : isPremium ? 'Premium' : 'Free'}
  *- Limit Harian :* ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}
  *- Limit Game :* ${isOwner ? '-' : cekGLimit(sender, gcount, glimit)}
  *- Balance :* $${toCommas(getBalance(sender, balance))}

*乂  G E N E R A L*

   × ${prefix}menu
   × ${prefix}owner
   × ${prefix}donasi
   × ${prefix}speed
   × ${prefix}runtime
   × ${prefix}cekprem

 *乂  C O N V E R T*

   × ${prefix}sticker
   × ${prefix}toimg
   × ${prefix}tovid
   × ${prefix}tomp3
   × ${prefix}ttp
   × ${prefix}attp
   × ${prefix}emojimix
   × ${prefix}say
   × ${prefix}ss
   × ${prefix}qc

 *乂  A I  T O O L S*

   × ${prefix}openai
   × ${prefix}animediff
   × ${prefix}bard
   × ${prefix}simi
   × ${prefix}midjourney
   × ${prefix}stablediff
   × ${prefix}blackbox
   × ${prefix}chatty
 
 *乂  M E S S A G E*

   × ${prefix}start
   × ${prefix}skip
   × ${prefix}stop
   × ${prefix}send
   × ${prefix}menfess

 *乂  D O W L O A D E R*

   × ${prefix}tiktok
   × ${prefix}instagram
   × ${prefix}ytmp4
   × ${prefix}ytmp3
  
 *乂  R A N D O M*

   × ${prefix}quote
   × ${prefix}artinama
   × ${prefix}fakta
   × ${prefix}neko
   × ${prefix}quoteanime
   × ${prefix}waifu
   × ${prefix}hentai
   × ${prefix}truth
   × ${prefix}dare
   × ${prefix}gempa

 *乂  P H O T O O X Y*

   × ${prefix}flaming
   × ${prefix}night
   × ${prefix}shadow
   × ${prefix}paper
   × ${prefix}grass
   × ${prefix}cube
   × ${prefix}glow
   × ${prefix}rainbow
   × ${prefix}fabric
   × ${prefix}glowing
   × ${prefix}honey
   × ${prefix}vintage
   × ${prefix}fur
   × ${prefix}striking
  
 *乂  S E A R C H*

   × ${prefix}ytsearch
   × ${prefix}lirik
   × ${prefix}gimage
   × ${prefix}pinterest
   × ${prefix}brainly
   × ${prefix}igstalk
   × ${prefix}ttstalk
   × ${prefix}layarkaca21
   × ${prefix}jadwalsholat
   × ${prefix}cuaca
   × ${prefix}drakor

 *乂  O S I N T*

   × ${prefix}gopay
   × ${prefix}dana
   × ${prefix}mahasiswa
   × ${prefix}cek-nik

 *乂  C H A R - A I*

   × ${prefix}jeno
   × ${prefix}haechan
   × ${prefix}hutao
   × ${prefix}freya
   × ${prefix}michie
   × ${prefix}gojo
   × ${prefix}jihoon
   × ${prefix}ashel
   × ${prefix}hinata
   × ${prefix}adel
   × ${prefix}azizi
   × ${prefix}curhat

 *乂  G A M E S*

   × ${prefix}tebaklagu
   × ${prefix}asahotak
   × ${prefix}caklontong
   × ${prefix}family100
   × ${prefix}siapakahaku
   × ${prefix}susunkata
   × ${prefix}tebakbendera
   × ${prefix}tebakgambar
   × ${prefix}tebakkalimat
   × ${prefix}tebakkata
   × ${prefix}tebakkimia
   × ${prefix}tebaklirik
   × ${prefix}kuis
   × ${prefix}math
   × ${prefix}nyerah
   × ${prefix}tictactoe
   × ${prefix}casino
   × ${prefix}bet
   × ${prefix}werewolf
  
 *乂  P A Y M E N T*

   × ${prefix}buylimit
   × ${prefix}buyglimit
   × ${prefix}transfer
   × ${prefix}limit
   × ${prefix}balance
  
 *乂  G R O U P*

   × ${prefix}linkgrup
   × ${prefix}setnamegc
   × ${prefix}setdesc
   × ${prefix}group
   × ${prefix}revoke
   × ${prefix}delete
   × ${prefix}tagall
   × ${prefix}hidetag
   × ${prefix}antilink
   × ${prefix}welcome
   `
}