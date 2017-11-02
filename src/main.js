const LineAPI = require('./api');
const { Message, OpType, Location } = require('../curve-thrift/line_types');
let exec = require('child_process').exec;

//TOLONG GANTI SEMUA SEPERTI LOCKUPDATEGROUP TAPI MSG SERTA UNMUTE/MUTE JAN LU OTAK ATIK BEGO~//
var myBott = ['u7a92b4c0c87a2dfeedec343276cea972'];//TARO MID LU DISINI SUPAYA BISA PKE COMMAND STAFF

const myBot = ['u7a92b4c0c87a2dfeedec343276cea972'];//TARO MID LU DISINI
var vx = {};var midnornama = "";var pesane = "";var kickhim = "";var waitMsg = "no";//DO NOT CHANGE THIS

function isAdminOrBot(param) {
    return myBot.includes(param);
}

function isStaffOrBot(param) {
    return myBott.includes(param);
}

function firstToUpperCase(str) {
    return str.substr(0, 1).toUpperCase() + str.substr(1);
}

function isTGet(string,param){
	return string.includes(param);
}


class LINE extends LineAPI {
    constructor() {
        super();
        this.receiverID = '';
        this.checkReader = [];
        this.sendStaff = 0;
        this.stateStatus = {
            mute: 0,
            bc: 0,
            bmsg: 1,
            kick: 1,
            cancel: 1,
            lockjoin: 0,
            lockinvite: 0,
            lockcancel: 1,
            lockupdategroup: 0,
        }
      
      this.keyhelp = "\
==============================\n\
O̸͟͞S̸͟͞ A̸͟͞L̸͟͞L̸͟͞ C̸͟͞O̸͟͞M̸͟͞M̸͟͞A̸͟͞N̸͟͞D̸͟͞\n\
==============================\n\
☞ Myid\n\
☞ Gift\n\
☞ Halo\n\
☞ Speed\n\
☞ Os help\n\
☞ InfoGroup\n\
☞ Group Creator\n\
☞ Set [u̸n̸t̸u̸k̸ m̸e̸m̸u̸l̸a̸i̸]\n\
☞ Read [l̸i̸h̸a̸t̸ p̸a̸r̸a̸ r̸e̸a̸d̸]\n\
☞ Reset [h̸a̸p̸u̸s̸ p̸e̸m̸b̸a̸c̸a̸a̸n̸ r̸e̸a̸d̸]\n\
☞ Bc [j̸u̸m̸l̸a̸h̸] /[t̸e̸x̸t̸] (j̸i̸k̸a̸ o̸n̸)\n\
==============================\n\
O̸͟͞S̸͟͞ S̸͟͞T̸͟͞A̸͟͞F̸͟͞F̸͟͞ C̸͟͞O̸͟͞M̸͟͞M̸͟͞A̸͟͞N̸͟͞D̸͟͞\n\
==============================\n\
👥 Mode Tempur\n\
👥 Open Url\n\
👥 Close Url\n\
👥 spam\n\
👥 Msg\n\
👥 Tag\n\
👥 Kickall (s̸t̸a̸t̸u̸s̸ k̸i̸c̸k̸ o̸n̸)\n\
👥 Kuy balik [l̸e̸f̸t̸ d̸a̸r̸i̸ g̸r̸u̸p̸]\n\
👥 Setting\n\
👥 Kick On/Off\n\
👥 Cancel On/Off\n\
👥 LockInvite On/Off\n\
👥 LockUpdateGroup On/Off\n\
👥 LockJoin On/Off\n\
👥 LockCancel On/Off\n\
👥 Bc On/Off\n\
👥 Bmsg On/Off\n\n\
==============================\n\
O̸͟͞S̸͟͞ A̸͟͞D̸͟͞M̸͟͞I̸͟͞N̸͟͞ C̸͟͞O̸͟͞M̸͟͞M̸͟͞A̸͟͞N̸͟͞D̸͟͞\n\
==============================\n\
🌟 Mute\n\
🌟 Unmute\n\
🌟 Add staff\n\
🌟 Del staff\n\
🌟 Nk「@」\n\
==============================\n\
B̸͟͞Y̸͟͞ D̸͟͞E̸͟͞S̸͟͞T̸͟͞R̸͟͞O̸͟͞Y̸͟͞E̸͟͞R̸͟͞ T̸͟͞E̸͟͞A̸͟͞M̸͟͞\n\
==============================";
      var that = this;
    }

    getOprationType(operations) {
        for (let key in OpType) {
            if(operations.type == OpType[key]) {
                if(key !== 'NOTIFIED_UPDATE_PROFILE') {
                    console.info(`[* ${operations.type} ] ${key} `);
                }
            }
        }
    }


    poll(operation) {
        if(operation.type == 25 || operation.type == 26) {
            const txt = (operation.message.text !== '' && operation.message.text != null ) ? operation.message.text : '' ;
            let message = new Message(operation.message);
            this.receiverID = message.to = (operation.message.to === myBot[0]) ? operation.message.from : operation.message.to ;
            Object.assign(message,{ ct: operation.createdTime.toString() });
            if(waitMsg == "yes" && operation.message.from == vx[0] && this.stateStatus.mute != 1){
				this.textMessage(txt,message,message.text)
			}else if(this.stateStatus.mute != 1){this.textMessage(txt,message);
			}else if(txt == "Unmute" && isAdminOrBot(operation.message.from) && this.stateStatus.mute == 1){
			    this.stateStatus.mute = 0;
			    this._sendMessage(message,"ヽ(^。^)ノ")
		    }else{console.info("Bot Off");}
        }

        if(operation.type == 13 && this.stateStatus.cancel == 1) {
            if(!isAdminOrBot(operation.param2) && !isStaffOrBot(operation.param2)) {
            this.cancelAll(operation.param1);
            }

        }

        if(operation.type == 13 && this.stateStatus.lockinvite == 1) {
            if(!isAdminOrBot(operation.param2) && !isStaffOrBot(operation.param2)) {
            this._kickMember(operation.param1,[operation.param2]);
             }

           }

		if(operation.type == 11 && this.stateStatus.lockupdategroup == 1 && !isAdminOrBot(operation.param2) && !isStaffOrBot(operation.param2)){//update group (open qr)
		    let seq = new Message();
			seq.to = operation.param1;
			this.textMessage("0103",seq,operation.param2,1);
		}else if(operation.type == 11 && this.stateStatus.lockupdategroup == 1 && !isAdminOrBot(operation.param2) && !isStaffOrBot(operation.param2)){
			let seq = new Message();
			seq.to = operation.param1;
	     this.textMessage("0104",seq,operation.param2,1);
		}else if(operation.type == 11 && this.stateStatus.lockupdategroup == 0 && !isAdminOrBot(operation.param2) && !isStaffOrBot(operation.param2)){
			let seq = new Message();
			seq.to = operation.param1;
	    this.textMessage("0103",seq,operation.param2,1);
		}

           if(operation.type == 11 && this.stateStatus.lockupdategroup == 1) { //ada update
           // op1 = group nya
           // op2 = yang 'nge' update
           if(!isAdminOrBot(operation.param2) && !isStaffOrBot(operation.param2)) {
              this._kickMember(operation.param1,[operation.param2]);
             }

           }

          if(operation.type == 15 && this.stateStatus.bmsg == 1) {
             let out = new Message();
             out.to = operation.param1;

             out.text = "Yah Kok Leave? Padahal Belom Minta Pap Naked .-."
			     this._client.sendMessage(0, out);
            }

            if(operation.type == 17 && this.stateStatus.bmsg == 1) {

               let kam = new Message();
               kam.to = operation.param1;
               kam.text = "Selamat Datang, Jangan Sungkan Pap Naked Yah ^_^"
               this._client.sendMessage(0, kam);
             }

           if(operation.type == 16 && this.stateStatus.bmsg == 1) {
             let itil = new Message();
             itil.to = operation.param1;
             itil.text = "Terima Kasih Telah Invite Saya Di Group Anda ^_^\n\nSilahkan Ketik [Os Help] Untuk Mengetahui Command Bot Kami.\n\n-D̸͟͞E̸͟͞S̸͟͞T̸͟͞R̸͟͞O̸͟͞Y̸͟͞E̸͟͞R̸͟͞ T̸͟͞E̸͟͞A̸͟͞M̸͟͞-"
             this._client.sendMessage(0, itil);
           }

           if(operation.type == 19 && this.stateStatus.bmsg == 1 && !isAdminOrBot(operation.param2)) {
             let plerrr = new Message();
             plerrr.to = operation.param1;
             plerrr.text = "Gosah Maen Kick Kick An Asuw_-"
             this._client.sendMessage(0, plerrr);
           }

           if(operation.type == 17 && this.stateStatus.lockjoin == 1) {
            if(!isAdminOrBot(operation.param2) || !isStaffOrBot(operation.param2)) {
            this._kickMember(operation.param1,[operation.param2]);
             }

           }

           if(operation.type == 19 && this.stateStatus.kick == 1) { //ada kick
            // op1 = group nya
            // op2 = yang 'nge' kick
            // op3 = yang 'di' kick
            if(isAdminOrBot(operation.param3) && isStaffOrBot(operation.param3)) {
               this._invite(operation.param1,[operation.param3]);
            }
            if(!isAdminOrBot(operation.param2) && !isStaffOrBot(operation.param2)) {
               this._kickMember(operation.param1,[operation.param2]);
            } 

        }

        if(operation.type == 32 && this.stateStatus.lockcancel == 1) { //ada cancel
          // op1 = group nya
          // op2 = yang 'nge' cancel
          // op3 = yang 'di' cancel
          if(isAdminOrBot(operation.param3) && isStaffOrBot(operation.param3)) {
              this._invite(operation.param1,[operation.param3]);
          }
          if(!isAdminOrBot(operation.param2) && !isStaffOrBot(operation.param2)) {
              this._kickMember(operation.param1,[operation.param2]);
            }

        }

        if(operation.type == 55){ //ada reader

            const idx = this.checkReader.findIndex((v) => {
                if(v.group == operation.param1) {
                    return v
                }
            })
            if(this.checkReader.length < 1 || idx == -1) {
                this.checkReader.push({ group: operation.param1, users: [operation.param2], timeSeen: [operation.param3] });
            } else {
                for (var i = 0; i < this.checkReader.length; i++) {
                    if(this.checkReader[i].group == operation.param1) {
                        if(!this.checkReader[i].users.includes(operation.param2)) {
                            this.checkReader[i].users.push(operation.param2);
                            this.checkReader[i].timeSeen.push(operation.param3);
                        }
                    }
                }
            }
        }

        if(operation.type == 13) { // diinvite
            if(isAdminOrBot(operation.param2)) {
                return this._acceptGroupInvitation(operation.param1);
            } else {
                return this._cancel(operation.param1,myBot);
            }
        }
        this.getOprationType(operation);
    }

    async cancelAll(gid) {
        let { listPendingInvite } = await this.searchGroup(gid);
        if(listPendingInvite.length > 0){
            this._cancel(gid,listPendingInvite);
        }
    }

    async searchGroup(gid) {
        let listPendingInvite = [];
        let thisgroup = await this._getGroups([gid]);
        if(thisgroup[0].invitee !== null) {
            listPendingInvite = thisgroup[0].invitee.map((key) => {
                return key.mid;
            });
        }
        let listMember = thisgroup[0].members.map((key) => {
            return { mid: key.mid, dn: key.displayName };
        });

        return { 
            listMember,
            listPendingInvite
        }
    }

    setState(seq,param) {
		if(param == 1){
			let isinya = "Setting\n";
			for (var k in this.stateStatus){
                if (typeof this.stateStatus[k] !== 'function') {
					if(this.stateStatus[k]==1){
						isinya += " "+firstToUpperCase(k)+" ▶ On\n";
					}else{
						isinya += " "+firstToUpperCase(k)+" ▶ Off\n";
					}
                }
            }this._sendMessage(seq,isinya);
		}else{
        if(isAdminOrBot(seq.from) || isStaffOrBot(seq.from)){
            let [ actions , status ] = seq.text.split(' ');
            const action = actions.toLowerCase();
            const state = status.toLowerCase() == 'on' ? 1 : 0;
            this.stateStatus[action] = state;
			let isinya = "Setting\n";
			for (var k in this.stateStatus){
                if (typeof this.stateStatus[k] !== 'function') {
					if(this.stateStatus[k]==1){
						isinya += " "+firstToUpperCase(k)+" ▶ On\n";
					}else{
						isinya += " "+firstToUpperCase(k)+" ▶ Off\n";
					}
                }
            }
            //this._sendMessage(seq,`Status: \n${JSON.stringify(this.stateStatus)}`);
			this._sendMessage(seq,isinya);
        } else {
            this._sendMessage(seq,`Mohon Maaf Anda Bukan Staff Or Admin~`);
        }}
    }

    mention(listMember) {
        let mentionStrings = [''];
        let mid = [''];
        for (var i = 0; i < listMember.length; i++) {
            mentionStrings.push('@'+listMember[i].displayName+'\n');
            mid.push(listMember[i].mid);
        }
        let strings = mentionStrings.join('');
        let member = strings.split('@').slice(1);
        
        let tmp = 0;
        let memberStart = [];
        let mentionMember = member.map((v,k) => {
            let z = tmp += v.length + 1;
            let end = z - 1;
            memberStart.push(end);
            let mentionz = `{"S":"${(isNaN(memberStart[k - 1] + 1) ? 0 : memberStart[k - 1] + 1 ) }","E":"${end}","M":"${mid[k + 1]}"}`;
            return mentionz;
        })
        return {
            names: mentionStrings.slice(1),
            cmddata: { MENTION: `{"MENTIONEES":[${mentionMember}]}` }
        }
    }

    async leftGroupByName(payload) {
        let gid = await this._findGroupByName(payload);
        for (var i = 0; i < gid.length; i++) {
            this._leaveGroup(gid[i]);
        }
    }
    
    async recheck(cs,group) {
        let users;
        for (var i = 0; i < cs.length; i++) {
            if(cs[i].group == group) {
                users = cs[i].users;
            }
        }
        
        let contactMember = await this._getContacts(users);
        return contactMember.map((z) => {
                return { displayName: z.displayName, mid: z.mid };
            });
    }

    removeReaderByGroup(groupID) {
        const groupIndex = this.checkReader.findIndex(v => {
            if(v.group == groupID) {
                return v
            }
        })

        if(groupIndex != -1) {
            this.checkReader.splice(groupIndex,1);
        }
    }

    async textMessage(textMessages, seq, param, lockt) {
        let [ cmd, ...payload ] = textMessages.split(' ');
        payload = payload.join(' ');
        let txt = textMessages.toLowerCase();
        let messageID = seq.id;

        const ginfo =  await this._getGroup(seq.to);
        const groupCreator = ('[ginfo.creator.mid]');
        const cot = textMessages.split('@');
        const com = textMessages.split(':');
        const cox = textMessages.split(' ');


        if(cmd == 'cancel') {
            if(payload == 'group') {
                let groupid = await this._getGroupsInvited();

                for (let i = 0; i < groupid.length; i++) {
                    this._rejectGroupInvitation(groupid[i])                    
                }
                return;
            }
            if(this.stateStatus.cancel == 1) {
                this.cancelAll(seq.to);
            }
        }

		if(vx[1] == "msg" && seq.from == vx[0] && waitMsg == "yes"){
			let panjang = txt.split("");
			if(txt == "cancel"){
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"#CANCELLED");
			}else if(vx[2] == "arg1" && vx[3] == "mid" && cot[1]){
				let bang = new Message();bang.to = seq.to;
				bang.text = "OK !, btw pesan-nya apa ?"
				this._client.sendMessage(0,bang);
				let ment = seq.contentMetadata.MENTION;
			    let xment = JSON.parse(ment);let pment = xment.MENTIONEES[0].M;
				let midnya = JSON.stringify(pment);
				vx[4] = midnya;
				vx[2] = "arg2";
			}else if(vx[2] == "arg1" && vx[3] == "mid" && seq.contentType == 13){
				let midnya = seq.contentMetadata.mid;let bang = new Message();bang.to = seq.to;
				bang.text = "OK !, btw pesan-nya apa ?"
				this._client.sendMessage(0,bang);
				vx[4] = midnya;
				vx[2] = "arg2";
			}else if(vx[2] == "arg1" && vx[3] == "mid" && panjang.length > 30){
				this._sendMessage(seq,"OK !, btw pesan-nya apa ?");
				vx[4] = txt;
				vx[2] = "arg2";
			}else if(vx[2] == "arg2" && vx[3] == "mid"){
				let panjangs = vx[4].split("");
				let kirim = new Message();let bang = new Message();
				bang.to = seq.to;
				if(panjangs[0] == "u"){
					kirim.toType = 0;
				}else if(panjangs[0] == "c"){
					kirim.toType = 2;
				}else if(panjangs[0] == "r"){
					kirim.toType = 1;
				}else{
					kirim.toType = 0;
				}
				bang.text = "Terkirim bang !";
				kirim.to = vx[4];
				kirim.text = txt;
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";vx[4] = "";
				this._client.sendMessage(0, kirim);
				this._client.sendMessage(0, bang);
			}else{
				this._sendMessage(seq,"# How to !msg\nTag / Kirim Kontak / Kirim Mid orang yang mau dikirimkan pesan !");
			}
		}if(txt == "msg" && isStaffOrBot(seq.from)) {
			if(vx[2] == null || typeof vx[2] === "undefined" || !vx[2]){
			    waitMsg = "yes";
			    vx[0] = seq.from;vx[1] = txt;vx[3] = "mid";
			    this._sendMessage(seq,"Mau kirim pesan ke siapa bang ?");
				this._sendMessage(seq,"Tag / Kirim Kontak / Kirim Mid orang yang mau dikirimkan pesan !");
				vx[2] = "arg1";
			}else{
				waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"#CANCELLED");
			}
		} if(txt == "msg" && !isStaffOrBot(seq.from)){
            this._sendMessage(seq,"Mohon Maaf Anda Bukan Admin Atau Staff~");
      }

		if(txt == '0103' && lockt == 1){
			let ax = await this._client.getGroup(seq.to);
			if(ax.preventJoinByTicket === true){}else{ax.preventJoinByTicket = true;await this._client.updateGroup(0, ax);}
		}
		if(txt == '0104' && lockt == 1){
			let ax = await this._client.getGroup(seq.to);
			if(ax.preventJoinByTicket === true){ax.preventJoinByTicket = false;await this._client.updateGroup(0, ax);}else{}
		}

      if(txt == 'add staff' && this.sendStaff == 0 && isAdminOrBot(seq.from)){
         this.sendStaff = 1;
         this._sendMessage(seq,'Kirim Contact Untuk Menambahkan Staff~')
       }

       if(seq.contentType == 13 && this.sendStaff == 1 && isAdminOrBot(seq.from)) {
          seq.contentType = 0;
          this.sendStaff = 0;
          myBott.push(seq.contentMetadata.mid);
          this._sendMessage(seq,'Sukses Menambahkan Staff Dengan Nama :'+'\n'+seq.contentMetadata.displayName);
        }

        if(txt == 'del staff' && this.sendStaff == 0 && isAdminOrBot(seq.from))
{
           this.sendStaff = 2;
           this._sendMessage(seq,'Kirim Contact Untuk Menghapus Staff~')
           }

           if(seq.contentType == 13 && this.sendStaff == 2 && isAdminOrBot(seq.from))
{
              if(!isStaffOrBot(seq.contentMetadata.mid)) {
                 seq.contentType = 0;
                 this.sendStaff = 0;
                 await this._sendMessage(seq,'Dia Bukan Staff~');
       }
     else
       {
            seq.contentType = 0;
            while (myBott[myBott.indexOf(seq.contentMetadata.mid)])
        {
            delete myBott[myBott.indexOf(seq.contentMetadata.mid)];
        }
    this.sendStaff = 0;
    await this._sendMessage(seq,'Sukses Menghapus Staff~');
    }
}

        if(txt == 'infogroup') {
           this._sendMessage(seq, 'Nama Group :\n'+ginfo.name+'\n\nGroup ID :\n'+ginfo.id+'\n\nPembuat Group :\n'+ginfo.creator.displayName);
         }

        if(txt == 'mode tempur') {
           if(isAdminOrBot(seq.from) || isStaffOrBot(seq.from)) {
            this._sendMessage(seq, 'D̸͟͞e̸͟͞s̸͟͞t̸͟͞r̸͟͞o̸͟͞y̸͟͞e̸͟͞r̸͟͞ S̸͟͞i̸͟͞a̸͟͞p̸͟͞ T̸͟͞e̸͟͞m̸͟͞p̸͟͞u̸͟͞r̸͟͞ ');
           }
        }

        if(txt == 'setting') {
           if(isAdminOrBot(seq.from) || isStaffOrBot(seq.from)) {
              this.setState(seq,1)
           }
        }
        
        if(txt == 'noob') {
           seq.contentType = 7
           seq.contentMetadata = {'STKID':'404','STKPKGID':'1','STKVER':'100'};
           this._client.sendMessage(3, seq);
        }

        if(txt == 'gift') {
           seq.contentType = 9
           seq.contentMetadata = {'PRDID': 'a9ed993f-a4d8-429d-abc0-2692a319afde','PRDTYPE': 'THEME','MSGTPL': '6'};
           this._client.sendMessage(1, seq);
        }

        if(txt == 'halo') {
           if(isAdminOrBot(seq.from) || isStaffOrBot(seq.from)) {
        this._sendMessage(seq, 'Apaan dah, lu gabut ya (҂-̀_-́)');
           }
        }else if(txt == 'halo') {
           if(!isAdminOrBot(seq.from) || !isStaffOrBot(seq.from)) {
        this._sendMessage(seq, 'Bubar Bubar Ada Anak Kebanyakan Micin~');
           }
        }
      
		if(txt == 'os help') {
			let botOwner = await this._client.getContacts([myBot[0]]);
            let { mid, displayName } = await this._client.getProfile();
			let key2 = "\
====================\n\
| BotName   : "+displayName+"\n\
| BotStatus : Working\n\
| BotOwner  : "+botOwner[0].displayName+"\n\
====================\n";
			seq.text = key2 += this.keyhelp;
			this._client.sendMessage(0, seq);
		}

        if(txt == 'speed') {
            const curTime = (Date.now() / 9000);

            await this._sendMessage(seq,'Wait tholol....');


            const rtime = (Date.now() / 9000) - curTime;
            await this._sendMessage(seq, `${rtime} second`);
        }

        if(txt == 'tag') {
           if(isAdminOrBot(seq.from) || isStaffOrBot(seq.from)) {
              let { listMember } = await this.searchGroup(seq.to);
              const mentions = await this.mention(listMember);
              seq.contentMetadata = mentions.cmddata; await this._sendMessage(seq,mentions.names.join(''))
           }
        }

        if(txt === 'salken' && this.stateStatus.kick == 1 && isStaffOrBot(seq.from)) {
            let { listMember } = await this.searchGroup(seq.to);
            for (var i = 0; i < listMember.length; i++) {
                if(!isAdminOrBot(listMember[i].mid)){
                    this._kickMember(seq.to,[listMember[i].mid])
                }
            }
        }

        if(txt == 'set') {
            this._sendMessage(seq, `Pembacaan Read Dimulai Dari Sekarang.`);
            this.removeReaderByGroup(seq.to);
        }

        if(txt == 'reset') {

            this.checkReader = []
            this._sendMessage(seq, `Menghapus Data Pembacaan Read`);
        }  


        if(txt == 'read'){
            let rec = await this.recheck(this.checkReader,seq.to);
            const mentions = await this.mention(rec);
            seq.contentMetadata = mentions.cmddata;
            await this._sendMessage(seq,mentions.names.join(''));
            
        }

         if (txt == 'group creator') {
             let gcreator = await this._getGroup(seq.to);
             seq.contentType = 13;
             seq.contentMetadata = {mid: gcreator.creator.mid, displayName: gcreator.creator.displayName};
             this._client.sendMessage(1, seq);
         }

        //if(seq.contentType == 13) {
            //seq.contentType = 0
            //this._sendMessage(seq,seq.contentMetadata.mid);
        //}


        if(txt == 'setpoint for check reader .') {
            this.searchReader(seq);
        }

        if(txt == 'clearall') {
            this.checkReader = [];
        }

		if(txt == "mute" && isAdminOrBot(seq.from)) {
			this.stateStatus.mute = 1;
			this._sendMessage(seq,"(*´﹃｀*)")
		}

        const action = ['lockinvite on','lockinvite off','lockupdategroup on','lockupdategroup off','lockjoin on','lockjoin off','lockcancel on','lockcancel off','kick on','kick off','cancel on','cancel off','bc on','bc off','bmsg on','bmsg off']
        if(action.includes(txt)) {
            this.setState(seq)
        }
	
        if(txt == 'myid') {
            this._sendMessage(seq,`MID Anda : ${seq.from}`);
        }

        const joinByUrl = ['open url','close url'];
        if(joinByUrl.includes(txt) && isStaffOrBot(seq.from)) {
            this._sendMessage(seq,`Tunggu Sebentar ...`);
            let updateGroup = await this._getGroup(seq.to);
            updateGroup.preventJoinByTicket = true;
            if(txt == 'open url') {
                if(isAdminOrBot(seq.from) || isStaffOrBot(seq.from)) {
                updateGroup.preventJoinByTicket = false;
                const groupUrl = await this._reissueGroupTicket(seq.to)
                this._sendMessage(seq,`Link Group = line://ti/g/${groupUrl}`);
                }
            }
            await this._updateGroup(updateGroup);
        }

        if(cmd == 'join') { //untuk join group pake qrcode contoh: join line://anu/g/anu
            const [ ticketId ] = payload.split('g/').splice(-1);
            let { id } = await this._findGroupByTicket(ticketId);
            await this._acceptGroupInvitationByTicket(id,ticketId);
        }

        if(cmd == 'Nk' && isAdminOrBot(seq.from)){
           let target = payload.replace('@','');
           let group = await this._getGroups([seq.to]);
           let gm = group[0].members;
              for(var i = 0; i < gm.length; i++){
                     if(gm[i].displayName == target){
                                  target = gm[i].mid;
                     }
               }

               this._kickMember(seq.to,[target]);
        }

               if(cmd == 'bc' || cmd == 'Bc' && this.stateStatus.bc == 1) {
                  const [  j, kata ] = payload.split('/');
                  for (var i=0; i <j; i++) {
                  this._sendMessage(seq,`${kata}`);
                }
          }

        if(cmd == 'spam' && isStaffOrBot(seq.from)) {
            for(var i= 0; i < 10;  i++) {
               this._sendMessage(seq, 'I Love Hentai~');
        }
    }

        if(cmd == 'spm' && isAdminOrBot(seq.from)) { // untuk spam invite contoh: spm <mid>
            for (var i = 0; i < 100; i++) {
                this._createGroup(`FUCK YOU`,payload);
            }
        }
        
        if(txt == 'kuy balik') {
           if(isAdminOrBot(seq.from) || isStaffOrBot(seq.from)){
          let txt = await this._sendMessage(seq, 'Kami Dari D̸͟͞e̸͟͞s̸͟͞t̸͟͞r̸͟͞o̸͟͞y̸͟͞e̸͟͞r̸͟͞ T̸͟͞e̸͟͞a̸͟͞m̸͟͞ Terima Kasih Atas Groupnya Dan Kami Izin Leave~');
          this._leaveGroup(seq.to);
        }
    }

        if(cmd == 'lirik') {
            let lyrics = await this._searchLyrics(payload);
            this._sendMessage(seq,lyrics);
        }

        if(cmd === 'ip') {
            exec(`curl ipinfo.io/${payload}`,(err, res) => {
                const result = JSON.parse(res);
                if(typeof result.error == 'undefined') {
                    const { org, country, loc, city, region } = result;
                    try {
                        const [latitude, longitude ] = loc.split(',');
                        let location = new Location();
                        Object.assign(location,{ 
                            title: `Location:`,
                            address: `${org} ${city} [ ${region} ]\n${payload}`,
                            latitude: latitude,
                            longitude: longitude,
                            phone: null 
                        })
                        const Obj = { 
                            text: 'Location',
                            location : location,
                            contentType: 0,
                        }
                        Object.assign(seq,Obj)
                        this._sendMessage(seq,'Location');
                    } catch (err) {
                        this._sendMessage(seq,'Not Found');
                    }
                } else {
                    this._sendMessage(seq,'Location Not Found , Maybe di dalem goa');

                }
            })
        }
    }

}

module.exports = new LINE();
