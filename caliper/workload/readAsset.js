'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');

class MyWorkload extends WorkloadModuleBase {
    constructor() {
        super();
    }

    async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
        await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);

        for (let i = 0; i < this.roundArguments.assets; i++) {
            const fintechData = 
            [{
            ID: 'accountIdTen10',
            Username: 'random-username1023',
            UserAccountIdentification: 'some-identificationaccountTen',
            AccountWalletBalance: 537,
            AccountCurrency: 'GBP',
            AccountLastTransaction: 25,
            AccountTotalTransaction: 3422,
            TotalTransaction: 107,
            AccountFirstName: 'Ebube',
            AccountLastName: 'Aubalee',
            AccountLocation: 'GB',
        }];


        console.log('about to log fintech data for reading asset');
        console.log(JSON.stringify(fintechData));

        const request = {
            contractId: this.roundArguments.contractId,
            contractFunction: 'CreateAsset',
            contractArguments: [JSON.stringify(fintechData)],
            readOnly: false
        };

        await this.sutAdapter.sendRequests(request);
        }
    }
    async submitTransaction() {
        const randomId = Math.floor(Math.random() * this.roundArguments.assets);
        const myArgs = {
            contractId: this.roundArguments.contractId,
            contractFunction: 'ReadAsset',
            invokerIdentity: 'User1',
            contractArguments: [`accountIdTen10`],
            readOnly: true
        };
        await this.sutAdapter.sendRequests(myArgs);
    }

    async cleanupWorkloadModule() {
        for (let i = 0; i < this.roundArguments.assets; i++) {
            const assetID = `accountIdTen10`;
            console.log(`Worker ${this.workerIndex}: Deleting asset ${assetID}`);
            const request = {
                contractId: this.roundArguments.contractId,
                contractFunction: 'DeleteAsset',
                invokerIdentity: 'User1',
                contractArguments: [assetID],
                readOnly: false
            };
            await this.sutAdapter.sendRequests(request);
        }
    }
}

function createWorkloadModule() {
    return new MyWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;