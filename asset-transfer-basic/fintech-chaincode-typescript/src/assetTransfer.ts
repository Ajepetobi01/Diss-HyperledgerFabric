/*
 * SPDX-License-Identifier: Apache-2.0
 */
// Deterministic JSON.stringify()
import {Context, Contract, Info, Returns, Transaction} from 'fabric-contract-api';
import stringify from 'json-stringify-deterministic';
import sortKeysRecursive from 'sort-keys-recursive';
import {Asset} from './asset';

@Info({title: 'AssetTransfer', description: 'Smart contract for trading assets'})
export class AssetTransferContract extends Contract {

    @Transaction()
    public async InitLedger(ctx: Context): Promise<void> {
        const assets: Asset[] = [
            {
                ID: 'accountIdOne1',
                Username: 'random-username123',
                UserAccountIdentification: 'some-identificationaccountOne',
                AccountWalletBalance: 450,
                AccountCurrency: 'GBP',
                AccountLastTransaction: 32,
                AccountTotalTransaction: 4231,
                TotalTransaction: 93,
                AccountFirstName: 'Tayo',
                AccountLastName: 'Aina',
                AccountLocation: 'GB',
            },
            {
                ID: 'accountIdTwo2',
                Username: 'random-username213',
                UserAccountIdentification: 'some-identificationaccountTwo',
                AccountWalletBalance: 923,
                AccountCurrency: 'GBP',
                AccountLastTransaction: 420,
                AccountTotalTransaction: 6271,
                TotalTransaction: 103,
                AccountFirstName: 'Segun',
                AccountLastName: 'Idowu',
                AccountLocation: 'GB',
            },
            {
                ID: 'accountIdThree3',
                Username: 'random-username313',
                UserAccountIdentification: 'some-identificationaccountThree',
                AccountWalletBalance: 213,
                AccountCurrency: 'GBP',
                AccountLastTransaction: 22,
                AccountTotalTransaction: 628,
                TotalTransaction: 42,
                AccountFirstName: 'Confi',
                AccountLastName: 'Matthew',
                AccountLocation: 'GB',
            },
            {
                ID: 'accountIdFour4',
                Username: 'random-username414',
                UserAccountIdentification: 'some-identificationaccountFour',
                AccountWalletBalance: 6639,
                AccountCurrency: 'GBP',
                AccountLastTransaction: 1200,
                AccountTotalTransaction: 12322,
                TotalTransaction: 211,
                AccountFirstName: 'Hyland',
                AccountLastName: 'Joy',
                AccountLocation: 'GB',
            },
            {
                ID: 'accountIdFive5',
                Username: 'random-username512',
                UserAccountIdentification: 'some-identificationaccountFive',
                AccountWalletBalance: 721,
                AccountCurrency: 'GBP',
                AccountLastTransaction: 64,
                AccountTotalTransaction: 1288,
                TotalTransaction: 26,
                AccountFirstName: 'Kian',
                AccountLastName: 'Kieran',
                AccountLocation: 'GB',
            },
        ];

        for (const asset of assets) {
           // asset.docType = 'asset';
            await ctx.stub.putState(asset.ID, Buffer.from(JSON.stringify(asset)));
            console.info(`Asset ${asset.ID} initialized`);
        }
    }

    // CreateAsset issues a new asset to the world state with given details.
    // @Transaction()
    // public async CreateAsset(ctx: Context, id: string, color: string, size: number, owner: string, appraisedValue: number): Promise<void> {
    //     const exists = await this.AssetExists(ctx, id);
    //     if (exists) {
    //         throw new Error(`The asset ${id} already exists`);
    //     }

    //     const asset = {
    //         ID: id,
    //         Color: color,
    //         Size: size,
    //         Owner: owner,
    //         AppraisedValue: appraisedValue,
    //     };
    //     // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
    //     await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(asset))));
    // }

    @Transaction()
    public async CreateAsset(ctx: Context, datas: string): Promise<void> {
        const fintechWalletData = JSON.parse(datas);
        for (const data of fintechWalletData) {
            await ctx.stub.putState(data.ID, Buffer.from(JSON.stringify(data)));
            console.info(`Fintech Wallet Data ${data.ID} initialized`);
        }
    }


    // ReadAsset returns the asset stored in the world state with given id.
    @Transaction(false)
    public async ReadAsset(ctx: Context, id: string): Promise<string> {
        const assetJSON = await ctx.stub.getState(id); // get the asset from chaincode state
        if (!assetJSON || assetJSON.length === 0) {
            throw new Error(`The asset ${id} does not exist`);
        }
        return assetJSON.toString();
    }

    // UpdateAsset updates an existing asset in the world state with provided parameters.
    // @Transaction()
    // public async UpdateAsset(ctx: Context, id: string, color: string, size: number, owner: string, appraisedValue: number): Promise<void> {
    //     const exists = await this.AssetExists(ctx, id);
    //     if (!exists) {
    //         throw new Error(`The asset ${id} does not exist`);
    //     }

    //     // overwriting original asset with new asset
    //     const updatedAsset = {
    //         ID: id,
    //         Color: color,
    //         Size: size,
    //         Owner: owner,
    //         AppraisedValue: appraisedValue,
    //     };
    //     // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
    //     return ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(updatedAsset))));
    // }

    @Transaction()
    public async UpdateAsset(ctx: Context, data: string): Promise<void> {
        const fintechWalletData = JSON.parse(data);
        const exists = await this.AssetExists(ctx, fintechWalletData.ID);
        if (!exists) {
            throw new Error(`The asset ${fintechWalletData.ID} does not exist`);
        }
        // overwriting original asset with new asset
        const newlyUpdatedData = fintechWalletData
        return ctx.stub.putState(fintechWalletData.ID, Buffer.from(JSON.stringify(newlyUpdatedData)));
    }

    // DeleteAsset deletes an given asset from the world state.
    @Transaction()
    public async DeleteAsset(ctx: Context, id: string): Promise<void> {
        const exists = await this.AssetExists(ctx, id);
        if (!exists) {
            throw new Error(`The asset ${id} does not exist`);
        }
        return ctx.stub.deleteState(id);
    }

    // AssetExists returns true when asset with given ID exists in world state.
    @Transaction(false)
    @Returns('boolean')
    public async AssetExists(ctx: Context, id: string): Promise<boolean> {
        const assetJSON = await ctx.stub.getState(id);
        return assetJSON && assetJSON.length > 0;
    }

    // TransferAsset updates the owner field of asset with given id in the world state, and returns the old owner.
    @Transaction()
    public async TransferAsset(ctx: Context, id: string, newOwner: string): Promise<string> {
        const assetString = await this.ReadAsset(ctx, id);
        const asset = JSON.parse(assetString);
        const oldOwner = asset.Owner;
        asset.Owner = newOwner;
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(asset))));
        return oldOwner;
    }

    // GetAllAssets returns all assets found in the world state.
    @Transaction(false)
    @Returns('string')
    public async GetAllAssets(ctx: Context): Promise<string> {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push(record);
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }

}
