/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        nftAPI: "https://1tlvtzvtsi.execute-api.ap-southeast-1.amazonaws.com/dev",
        minterAddress: "0x61c74C5Ad808bCac4AEA16dDd0B8614E79E42b4f",
        nftAddress: "0xb6539699d1143397d4F608237B0b8EF13528F119",
        coinAddress: "0xa00d939Cf02956e262177bdc118A867931e62D25",
        dispenserAddress: "0x4eD792f6445caD11BFFDA7f9cB1938aB3E443F4C"
    }
}

module.exports = nextConfig
