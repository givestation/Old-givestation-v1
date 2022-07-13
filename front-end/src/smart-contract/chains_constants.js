export const BSC_CHAIN_ID = "0x38";
export const BSC_NETWORK_ID = "56";
export const POLYGON_CHAIN_ID = "0x89";
export const POLYGON_NETWORK_ID = "137";
export const BSC_TEST_CHAIN_ID = "0x61";
export const BSC_TEST_NETWORK_ID = "97";
export const RINKEBY_CHAIN_ID = "0x4";
export const RINKEBY_NETWORK_ID = "4";
export const GNOSIS_CHAIN_ID = "0x64";
export const GNOSIS_NETWORK_ID = "100";
export const OPTIMISTIC_CHAIN_ID = "0xa";
export const OPTIMISTIC_NETWORK_ID = "10";
export const ARBITRUM_NETWORK_ID = "42161";
export const ARBITRUM_CHAIN_ID = "0xa4b1";

export const DEFAULT_CHAIN_ID = RINKEBY_CHAIN_ID;

export const chains = {
    [BSC_CHAIN_ID]:{
        rpcUrl:"https://bsc-dataseed1.binance.org/",
        nativeCurrency:"BNB",
        factoryAddress:"0xe02AEa5B56222572e92BfbEce37055b854e935d5",
        givePointAddress:"0x5d66952AaDe756c16CC1Dda5D014C99037607f31",
        blockScanUrl:"https://bscscan.com/"
    },
    [BSC_NETWORK_ID]:{
        rpcUrl:"https://bsc-dataseed1.binance.org/",
        nativeCurrency:"BNB",
        factoryAddress:"0xe02AEa5B56222572e92BfbEce37055b854e935d5",
        givePointAddress:"0x5d66952AaDe756c16CC1Dda5D014C99037607f31",
        blockScanUrl:"https://bscscan.com/"
    },
    [POLYGON_CHAIN_ID]:{
        rpcUrl:"https://rinkeby.infura.io/v3/08ac79d88b5d4aea961ca36af7ea6ee7",
        nativeCurrency:"MATIC",
        factoryAddress:"0x4b5626425A62458aa1A5256c75bF678B5e90C2bA",
        givePointAddress:"",
        blockScanUrl:"https://polygonscan.com/"
    },
    [POLYGON_NETWORK_ID]:{
        rpcUrl:"https://rinkeby.infura.io/v3/08ac79d88b5d4aea961ca36af7ea6ee7",
        nativeCurrency:"MATIC",
        factoryAddress:"0x4b5626425A62458aa1A5256c75bF678B5e90C2bA",
        givePointAddress:"",
        blockScanUrl:"https://polygonscan.com/"
    },
    [OPTIMISTIC_CHAIN_ID]:{
        rpcUrl:"https://mainnet.optimism.io/",
        nativeCurrency:"ETH",
        factoryAddress:"0x4b5626425A62458aa1A5256c75bF678B5e90C2bA",
        givePointAddress:"",
        blockScanUrl:"https://optimistic.etherscan.io/"
    },
    [OPTIMISTIC_NETWORK_ID]:{
        rpcUrl:"https://mainnet.optimism.io/",
        nativeCurrency:"ETH",
        factoryAddress:"0x4b5626425A62458aa1A5256c75bF678B5e90C2bA",
        givePointAddress:"",
        blockScanUrl:"https://optimistic.etherscan.io/"
    },
    [GNOSIS_CHAIN_ID]:{
        rpcUrl:"https://rpc.gnosischain.com/",
        nativeCurrency:"xDai",
        factoryAddress:"0xFf28D45CcEbC110A24340d9de14D29d3A08AbDb8",
        givePointAddress:"",
        blockScanUrl:"https://blockscout.com/xdai/mainnet/"
    },
    [GNOSIS_NETWORK_ID]:{
        rpcUrl:"https://rpc.gnosischain.com/",
        nativeCurrency:"xDai",
        factoryAddress:"0xFf28D45CcEbC110A24340d9de14D29d3A08AbDb8",
        givePointAddress:"",
        blockScanUrl:"https://blockscout.com/xdai/mainnet/"
    },
    [ARBITRUM_CHAIN_ID]:{
        rpcUrl:"https://arb1.arbitrum.io/rpc",
        nativeCurrency:"ETH",
        factoryAddress:"0xFf28D45CcEbC110A24340d9de14D29d3A08AbDb8",
        givePointAddress:"",
        blockScanUrl:"https://arbiscan.io/"
    },
    [ARBITRUM_NETWORK_ID]:{
        rpcUrl:"https://arb1.arbitrum.io/rpc",
        nativeCurrency:"ETH",
        factoryAddress:"0xFf28D45CcEbC110A24340d9de14D29d3A08AbDb8",
        givePointAddress:"",
        blockScanUrl:"https://arbiscan.io/"
    },
    [BSC_TEST_CHAIN_ID]:{
        rpcUrl:"https://data-seed-prebsc-1-s1.binance.org:8545/",
        nativeCurrency:"BNB",
        factoryAddress:"0xFf28D45CcEbC110A24340d9de14D29d3A08AbDb8",
        givePointAddress:"",
        blockScanUrl:"https://testnet.bscscan.com/"
    },
    [BSC_TEST_NETWORK_ID]:{
        rpcUrl:"https://data-seed-prebsc-1-s1.binance.org:8545/",
        nativeCurrency:"BNB",
        factoryAddress:"0xFf28D45CcEbC110A24340d9de14D29d3A08AbDb8",
        givePointAddress:"",
        blockScanUrl:"https://testnet.bscscan.com/"
    },
    [RINKEBY_CHAIN_ID]:{
        rpcUrl:"https://rinkeby.infura.io/v3/08ac79d88b5d4aea961ca36af7ea6ee7",
        nativeCurrency:"ETH",
        factoryAddress:"0xD68b0d4c976Bfe8ED96c275C25fA8c16420d9Aa2",
        givePointAddress:"",
        blockScanUrl:"https://rinkeby.etherscan.io/"
    },
    [RINKEBY_NETWORK_ID]:{
        rpcUrl:"https://rinkeby.infura.io/v3/08ac79d88b5d4aea961ca36af7ea6ee7",
        nativeCurrency:"ETH",
        factoryAddress:"0xD68b0d4c976Bfe8ED96c275C25fA8c16420d9Aa2",
        givePointAddress:"",
        blockScanUrl:"https://rinkeby.etherscan.io/"
    }
}
