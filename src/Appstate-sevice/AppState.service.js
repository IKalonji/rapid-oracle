
import { ethers } from 'ethers';
import { MetaMaskSDK } from '@metamask/sdk';
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
        // Instantiate MetaMaskSDK
        this.MMSDK = new MetaMaskSDK();
        this.ethereum = this.MMSDK.getProvider();
        this.provider = new ethers.BrowserProvider(this.ethereum);
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
        this.collectionReference = db.collection('InfrastructureProject');
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
        ]).then((data) => {
            console.info("data: ", data)
            this.contractSubmitProject(projectObject.title, this.nextPolybaseRecordID)
        }).catch((error) => {
            console.info("error: ", error)
        })
    }

      async connectToMetaMask() {
        try {
          if(!this.ethereum){
            alert("Please install Metamask and configure Hedera Testnet")
            throw Error("Metamask not installed");
        }
  
          const accounts = await this.ethereum.request({ method: 'eth_requestAccounts' });
          alert(`Connected to: ${accounts[0]}`);
          this.walletAddress = accounts[0];
          this.walletConnected = true;
  
          const event = new Event("loggedIn");
          window.dispatchEvent(event);
          return true;
          
        } catch (error) {
          alert("Could not connect to wallet.");
          console.log(error);
          return false;
        }
  
  
  
      }
}
