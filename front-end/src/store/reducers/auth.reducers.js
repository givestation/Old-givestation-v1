import { AUTH_LOGOUT, AUTH_SUCCESS, GET_USER_DETAIL, UPDATE_WEB3, SET_WALLET_ADDR, UPDATE_MINTED_NFT_COUNT, UPDATE_WALLET_STATUS, SET_AVAX_PRICE, UPDATE_USER_BALANCE, SET_OTHER_USER_DETAIL, SET_CHAIN_ID, CURRENT_USER } from "../actions/action.types";

const auth = {
    user: {},
    currentWallet: "",
    currentChainId: "",
    otherUser: {},
    balance: 0,
    walletStatus: false,
    mintedNFTCount: 0,
    globalWeb3: {}
}

export function Auth(state = auth, action) 
{
    switch (action.type) {
        case UPDATE_WEB3:
            console.log("[UPDATE_WEB3] action.payload = ", action.payload);
            return {
                ...state, globalWeb3: action.payload
            }
        case UPDATE_MINTED_NFT_COUNT:
            return {
                ...state, mintedNFTCount: action.payload
            }
        case SET_AVAX_PRICE:
            return {...state, ...action.payload};
        case AUTH_SUCCESS:

            // console.log("[AUTH_SUCCESS reducer] payload = ", action.payload);

            return { ...state, user: action.payload };
        case AUTH_LOGOUT:
            // localStorage.removeItem("jwtToken");
            return { ...state, user: action.payload };
        case GET_USER_DETAIL:
            return {
                ...state, detail: action.payload
            }
        case SET_WALLET_ADDR:
            // console.log("[REDUCER] address  = ", action.payload);
            return {
                ...state, currentWallet: action.payload
            }
        case SET_CHAIN_ID:
            // console.log("[REDUCER] chainId  = ", action.payload);
            return {
                ...state, currentChainId: action.payload
            }
        case SET_OTHER_USER_DETAIL:
            // console.log("[REDUCER] SET_OTHER_USER_DETAIL  = ", action.payload);
            {
                return { ...state, otherUser: action.payload }
            }
        case UPDATE_USER_BALANCE:            
            return { ...state, balance: action.payload };
        case UPDATE_WALLET_STATUS:
            return {...state, walletStatus: action.payload };
        default:
            return { ...state };
    }
}

export function GetCurrentUser(state, action) {
    if (action.type === CURRENT_USER) {
        return state.user;
    }
}

export function getGlobalWeb3(state){
    console.log("[getGlobalWeb3] state.auth.globalWeb3 = ", state.auth.globalWeb3);
    return state.auth.globalWeb3;
}