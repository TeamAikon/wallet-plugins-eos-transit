"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: Consider moving to WAL in a generic and convenient way
function vote(wallet) {
    var auth = wallet.auth;
    if (!auth) {
        return Promise.reject('No auth information has been passed with transaction');
    }
    var senderName = auth.accountName, permission = auth.permission;
    // if user has ever voted, refresh their last vote
    // if (this.voting)
    // 	data = {voter: this.state.auth.accountName, proxy:this.state.accountInfo.voter_info.proxy, producers:this.state.accountInfo.voter_info.producers};
    // if user has never voted, allow voting for TITAN proxy
    var data = { voter: senderName, proxy: 'eostitanvote', producers: [] };
    return wallet.eosApi.transact({
        actions: [{
                account: 'eosio',
                name: 'voteproducer',
                authorization: [{
                        actor: senderName,
                        permission: 'active',
                    }],
                data: data
            }],
    }, { blocksBehind: 3, expireSeconds: 60 });
}
exports.vote = vote;
function claim(wallet) {
    var auth = wallet.auth;
    if (!auth) {
        return Promise.reject('No auth information has been passed with transaction');
    }
    var senderName = auth.accountName, permission = auth.permission;
    return wallet.eosApi.transact({
        actions: [{
                account: 'efxstakepool',
                name: 'claim',
                authorization: [{
                        actor: senderName,
                        permission: 'active',
                    }],
                data: {
                    owner: senderName
                },
            },
            {
                account: 'efxstakepool',
                name: 'claim',
                authorization: [{
                        actor: senderName,
                        permission: 'active',
                    }],
                data: {
                    owner: senderName
                },
            }
        ],
    }, { blocksBehind: 3, expireSeconds: 60 });
}
exports.claim = claim;
function stake(wallet) {
    var auth = wallet.auth;
    if (!auth) {
        return Promise.reject('No auth information has been passed with transaction');
    }
    var senderName = auth.accountName, permission = auth.permission;
    return wallet.eosApi.transact({
        actions: [
            {
                account: 'efxstakepool',
                name: 'open',
                authorization: [{
                        actor: senderName,
                        permission: 'active',
                    }],
                data: {
                    owner: senderName,
                    ram_payer: senderName,
                },
            },
            {
                account: 'effecttokens',
                name: 'open',
                authorization: [{
                        actor: senderName,
                        permission: 'active',
                    }],
                data: {
                    owner: senderName,
                    symbol: "4,NFX",
                    ram_payer: senderName,
                },
            },
            {
                account: 'effecttokens',
                name: 'transfer',
                authorization: [{
                        actor: senderName,
                        permission: 'active',
                    }],
                data: {
                    from: senderName,
                    to: 'efxstakepool',
                    quantity: '1.0000 EFX',
                    memo: 'stake',
                },
            }
        ],
    }, { blocksBehind: 3, expireSeconds: 60 });
}
exports.stake = stake;
function transfer(wallet, receiverName, amount, memo, txnCount) {
    if (memo === void 0) { memo = ''; }
    if (txnCount === void 0) { txnCount = 2; }
    var auth = wallet.auth;
    if (!auth) {
        return Promise.reject('No auth information has been passed with transaction');
    }
    var senderName = auth.accountName, permission = auth.permission;
    if (!senderName) {
        return Promise.reject(new Error('Sender account name is not available in a provided wallet auth metadata!'));
    }
    if (!receiverName) {
        return Promise.reject(new Error('Receiver account name is not provided!'));
    }
    if (!amount)
        return Promise.reject(new Error('Amount not specified'));
    var txnBuilder = [];
    console.log("Build " + txnCount + " transactions");
    for (var index = 0; index < txnCount; index++) {
        txnBuilder.push({
            account: 'eosio.token',
            name: 'transfer',
            authorization: [
                {
                    actor: senderName,
                    permission: permission
                }
            ],
            data: {
                from: senderName,
                to: receiverName,
                quantity: Number(amount).toFixed(4) + " EOS",
                memo: "Test Txn " + index
            }
        });
    }
    return wallet.eosApi
        .transact({
        actions: txnBuilder
    }, {
        broadcast: true,
        blocksBehind: 3,
        expireSeconds: 60
    })
        .then(function (result) {
        console.log('[txn][success]', result);
        return result;
    })
        .catch(function (error) {
        console.error('[txn][error]', error);
        throw error;
    });
}
exports.transfer = transfer;
//# sourceMappingURL=eosActions.js.map