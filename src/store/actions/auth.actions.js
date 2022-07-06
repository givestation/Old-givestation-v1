import { AUTH_LOGOUT, AUTH_SUCCESS, SET_CHAIN_ID, UPDATE_WEB3, UPDATE_MINTED_NFT_COUNT, UPDATE_USER_BALANCE, UPDATE_WALLET_STATUS,  SET_AVAX_PRICE, SET_WALLET_ADDR, CURRENT_USER } from "./action.types"

export const authSet = (payload) => dispatch => {
    dispatch({
        type: AUTH_SUCCESS,
        payload: payload
    })
}

export const authLogout = () => dispatch => {
    dispatch({
        type: AUTH_LOGOUT,
        payload: {}
    })
}

export const getCurrentUser = () => dispatch => {
    dispatch({
        type: CURRENT_USER,
        payload: {}
    })
}

export const setConnectedWalletAddress = (address) => dispatch => {
    console.log("[ACTION] address  = ", address);
    dispatch({
        type: SET_WALLET_ADDR,
        payload: address
    })
}

export const setConnectedChainId = (chainId) => dispatch => {
    console.log("[ACTION] chainId  = ", chainId);
    dispatch({
        type: SET_CHAIN_ID,
        payload: chainId
    })
}

export const updateBalanceOfUser =  (balance) => dispatch =>
{
    //UPDATE_USER_BALANCE
    dispatch({
        type: UPDATE_USER_BALANCE,
        payload: balance
    })
}

export const setWalletStatus = (status) => dispatch => 
{
    dispatch({
        type: UPDATE_WALLET_STATUS,
        payload: status
    })
}

export const setAvaxPrice = (price) => dispatch => {
    dispatch({
        type: SET_AVAX_PRICE,
        payload: { avax: price }
    })
}

export const updateMintedNFTCountAfterTrading =  (count) => dispatch =>
{
    //UPDATE_MINTED_NFT_COUNT
    dispatch({
        type: UPDATE_MINTED_NFT_COUNT,
        payload: count
    })
}

export const updateGlobalWeb3 = (object) => dispatch => {
    console.log("[ACTION] web3  = ", object);
    dispatch({
        type: UPDATE_WEB3,
        payload: object
    })
}