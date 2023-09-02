const {Client} = require('@bnb-chain/greenfield-js-sdk');

async function createBucket(bucketName) {
  const client = Client.create('https://gnfd.qa.bnbchain.world', '9000');
  try {
    const createBucketTx = await client.bucket.createBucket({
      chargedReadQuota: '0',
      bucketName: bucketName,
      spInfo: {
        primarySpAddress: '0x66d06FFe266B46C6F0730cC9Ec2fc5B811cdA085',
      },
      privateKey: '0x6547492644d0136f76ef65e3bd04a77d079ed38028f747700c6c6063564d7032',
      creator: '0x1C893441AB6c1A75E01887087ea508bE8e07AAae',
      visibility: 'VISIBILITY_TYPE_PUBLIC_READ',
      signType: 'authTypeV1'
    }, {
      type: 'ECDSA',
      privateKey: '0x6547492644d0136f76ef65e3bd04a77d079ed38028f747700c6c6063564d7032',
      // type: 'EDDSA',
      // domain: window.location.origin,
      // seed: offChainData.seedString,
      // address,
    });

    const simulateInfo = await createBucketTx.simulate({
      denom: 'BNB',
    });

    console.log('simulateInfo', simulateInfo);

    const res = await createBucketTx.broadcast({
      denom: 'BNB',
      gasLimit: Number(simulateInfo?.gasLimit),
      gasPrice: simulateInfo?.gasPrice || '5000000000',
      payer: '0x1C893441AB6c1A75E01887087ea508bE8e07AAae',
      granter: '',
      privateKey: '0x6547492644d0136f76ef65e3bd04a77d079ed38028f747700c6c6063564d7032',
    });

    if (res.code === 0) {
      return {result: res, error: {}}
    } else {
      console.log('res', res)
      return {
        result: {},
        error: {
          code: res.code,
          message: 'Transaction failed',
          statusCode: 404
        }
      }
    }
  } catch (error) {
    return {result: {}, error: error}
  }
}

module.exports = createBucket;