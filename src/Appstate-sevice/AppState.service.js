
import { ethers } from 'ethers';
import { Polybase } from "@polybase/client";
import { Auth } from '@polybase/auth'

export class AppStateService {

    constructor() {
        if (typeof AppStateService.instance === 'object') {
            console.log("instance returned");
            return AppStateService.instance;
        }
        AppStateService.instance = this;

        console.log("instance created");

        this.provider = new ethers.BrowserProvider(window.ethereum);
        this.signer = this.provider.getSigner();
        this.walletAddress = "";
        this.connected = false;

        this.nextPolybaseRecordID = null;

        // this.contractPendingProjects = [];
        this.liveFunctions = [];
        this.polybaseResponse = []

        const db = new Polybase({
            defaultNamespace: "pk/0xbd242ce427525d219c617b9856f0052b52334321d47d1793a7653cab5b2dac45792735a33e4b2789cbf8063555816d8a37226f8b393645c78244c175a010fbed/Rapid.Oracle",
          });

        const auth = new Auth()
        db.signer(async (data) => {
            return {
                h: 'eth-personal-sign',
                sig: await auth.ethPersonalSign(data)
        }});
        this.collectionReference = db.collection('RapidOracleDb');
    }

    generatePolybaseID = () => {
        this.nextPolybaseRecordID = this.polybaseResponse.length + 1;
        return this.nextPolybaseRecordID.toString();
    }

    async createProject(projectObject){
        let id = this.generatePolybaseID()
        await this.collectionReference.create([
            id,
            projectObject.title,
            projectObject.author,
            projectObject.short_details,
            projectObject.long_details,
            projectObject.usage,
            projectObject.functionAddress,
            projectObject.creatorAddress
        ])
        // .then((data) => {
        //     console.info("data: ", data)
        //     this.contractSubmitProject(projectObject.title, this.nextPolybaseRecordID)
        // }).catch((error) => {
        //     console.info("error: ", error)
        // })
    }

    connectToMetaMask = async ()=> {
        if (typeof window != 'undefined' && typeof window.ethereum != 'undefined'){
            const accounts = window.ethereum.request({method: "eth_requestAccounts"}).then(() => {
                console.log(accounts[0]);
                this.walletAddress = accounts[0];
            }).catch((error) => {
                console.log('error in singleton : ', error);
            })


        }
      }
}
