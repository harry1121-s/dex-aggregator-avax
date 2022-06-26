import { BigInt } from "@graphprotocol/graph-ts"
import {
  PangolinExchange,
  PairCreated,
} from "../generated/PangolinExchange/PangolinExchange"
import {Sync} from "../generated/JoeRouter/JoeRouter"
import { Pair,Token, Reserve } from "../generated/schema"
import {
  ERC20
} from "../generated/PangolinExchange/ERC20"
import { log } from '@graphprotocol/graph-ts'

export function handlePairCreatedPangolin(event: PairCreated): void {
    // Get All Event Parameters
    let _id = event.params.pair;
    let _tokenA = event.params.token0;
    let _tokenB = event.params.token1;
    let _exchange = "Pangolin Exchange";
    let _router = "0xE54Ca86531e17Ef3616d22Ca28b0D458b6C89106";
    let _pairId = event.params.param3;
    log.debug("PE - ID: {}\nTokenA: {}\nTokenB: {}\nPairID: {}", [_id.toHexString(),_tokenA.toHexString(),_tokenB.toHexString(),_pairId.toString()]);

    // // Create SwapPair Entity for TokenA
    // let swapPairA = SwapPair.load(_tokenA.toHexString());
    // if(!swapPairA) {
    //   swapPairA = new SwapPair(_tokenA.toHexString());
    // }
    // swapPairA.save();

    // // Create SwapPair Entity for TokenB
    // let swapPairB = SwapPair.load(_tokenB.toHexString());
    // if(!swapPairB) {
    //   swapPairB = new SwapPair(_tokenB.toHexString());
    // }
    // swapPairB.save();

    // Create Token Instance A
    let _erc20A = ERC20.bind(_tokenA);
    let _namecallA = _erc20A.try_name();
    let _symbolcallA = _erc20A.try_symbol();
    let _decimalcallA = _erc20A.try_decimals();
    
    // Create Token A instance
    let tokenA =  Token.load(_tokenA.toHex());
    if(tokenA === null) {
      tokenA = new Token(_tokenA.toHex());
      if(_namecallA.reverted){
        log.error("PE - Bind Call Error: Function Name for Token: {}",[_tokenA.toHexString()]);
      } else {
        tokenA.name = _namecallA.value;
      }
      if(_symbolcallA.reverted){
        log.error("PE - Bind Call Error: Function Name for Token: {}",[_tokenA.toHexString()]);
      } else {
        tokenA.symbol = _symbolcallA.value;
      }
      if(_decimalcallA.reverted){
        log.error("PE - Bind Call Error: Function Name for Token: {}",[_tokenA.toHexString()]);
      } else {
        tokenA.decimal = BigInt.fromI64(_decimalcallA.value);
      }
      // tokenA.tokenId = _tokenB.toHexString();
    }
    tokenA.save();

    // Create Token Instance B
    let _erc20B = ERC20.bind(_tokenB);
    let _namecallB = _erc20B.try_name();
    let _symbolcallB = _erc20B.try_symbol();
    let _decimalcallB = _erc20B.try_decimals();
    
    // Create Token A instance
    let tokenB =  Token.load(_tokenB.toHex());
    if(tokenB === null) {
      tokenB = new Token(_tokenB.toHex());
      if(_namecallB.reverted){
        log.error("PE - Bind Call Error: Function Name for Token: {}",[_tokenA.toHexString()]);
      } else {
        tokenB.name = _namecallB.value;
      }
      if(_symbolcallB.reverted){
        log.error("PE - Bind Call Error: Function Name for Token: {}",[_tokenA.toHexString()]);
      } else {
        tokenB.symbol = _symbolcallB.value;
      }
      if(_decimalcallB.reverted){
        log.error("PE - Bind Call Error: Function Name for Token: {}",[_tokenA.toHexString()]);
      } else {
        tokenB.decimal = BigInt.fromI64(_decimalcallB.value);
      }
      // tokenB.tokenId = tokenA.id;
    }
    tokenB.save();

    // Create Token Pair
    let pair = Pair.load(_id.toHex());
    if(pair === null) {
      pair = new Pair(_id.toHex());
      pair.tokenA = _tokenA.toHexString();
      pair.tokenAEntity = tokenA.id;
      pair.tokenB = _tokenB.toHexString()
      pair.tokenBEntity = tokenB.id;
      pair.exchange = _exchange;
      pair.router = _router;
    }
    pair.save();
}

export function handlePairCreatedJoe(event: PairCreated): void {
  // Get All Event Parameters
  let _id = event.params.pair;
  let _tokenA = event.params.token0;
  let _tokenB = event.params.token1;
  let _exchange = "Joe Exchange";
  let _router = "0x60aE616a2155Ee3d9A68541Ba4544862310933d4";
  let _pairId = event.params.param3;
  log.debug("TJ - ID: {}\nTokenA: {}\nTokenB: {}\nPairID: {}", [_id.toHexString(),_tokenA.toHexString(),_tokenB.toHexString(),_pairId.toString()]);

  // // Create SwapPair Entity for TokenA
  // let swapPairA = SwapPair.load(_tokenA.toHexString());
  // if(!swapPairA) {
  //   swapPairA = new SwapPair(_tokenA.toHexString());
  // }
  // swapPairA.save();

  // // Create SwapPair Entity for TokenB
  // let swapPairB = SwapPair.load(_tokenB.toHexString());
  // if(!swapPairB) {
  //   swapPairB = new SwapPair(_tokenB.toHexString());
  // }
  // swapPairB.save();

  // Create Token Instance A
  let _erc20A = ERC20.bind(_tokenA);
  let _namecallA = _erc20A.try_name();
  let _symbolcallA = _erc20A.try_symbol();
  let _decimalcallA = _erc20A.try_decimals();
  
  // Create Token A instance
  let tokenA =  Token.load(_tokenA.toHex());
  if(tokenA === null) {
    tokenA = new Token(_tokenA.toHex());
    if(_namecallA.reverted){
      log.error("TJ - Bind Call Error: Function Name for Token: {}",[_tokenA.toHexString()]);
    } else {
      tokenA.name = _namecallA.value;
    }
    if(_symbolcallA.reverted){
      log.error("TJ - Bind Call Error: Function Name for Token: {}",[_tokenA.toHexString()]);
    } else {
      tokenA.symbol = _symbolcallA.value;
    }
    if(_decimalcallA.reverted){
      log.error("TJ - Bind Call Error: Function Name for Token: {}",[_tokenA.toHexString()]);
    } else {
      tokenA.decimal = BigInt.fromI64(_decimalcallA.value);
    }
    // tokenA.tokenId = _tokenB.toHexString();
  }
  tokenA.save();

  // Create Token Instance B
  let _erc20B = ERC20.bind(_tokenB);
  let _namecallB = _erc20B.try_name();
  let _symbolcallB = _erc20B.try_symbol();
  let _decimalcallB = _erc20B.try_decimals();
  
  // Create Token A instance
  let tokenB =  Token.load(_tokenB.toHex());
  if(tokenB === null) {
    tokenB = new Token(_tokenB.toHex());
    if(_namecallB.reverted){
      log.error("TJ - Bind Call Error: Function Name for Token: {}",[_tokenA.toHexString()]);
    } else {
      tokenB.name = _namecallB.value;
    }
    if(_symbolcallB.reverted){
      log.error("TJ - Bind Call Error: Function Name for Token: {}",[_tokenA.toHexString()]);
    } else {
      tokenB.symbol = _symbolcallB.value;
    }
    if(_decimalcallB.reverted){
      log.error("TJ - Bind Call Error: Function Name for Token: {}",[_tokenA.toHexString()]);
    } else {
      tokenB.decimal = BigInt.fromI64(_decimalcallB.value);
    }
    // tokenB.tokenId = tokenA.id;
  }
  tokenB.save();

  // Create Token Pair
  let pair = Pair.load(_id.toHex());
  if(pair === null) {
    pair = new Pair(_id.toHex());
    pair.tokenA = _tokenA.toHexString();
    pair.tokenAEntity = tokenA.id;
    pair.tokenB = _tokenB.toHexString()
    pair.tokenBEntity = tokenB.id;
    pair.exchange = _exchange;
    pair.router = _router;
    pair.reserve = _id.toHexString();
  }
  pair.save();
}

export function handleSyncReserve(event: Sync): void {
  // Get all the event data
  let _pair = event.address.toHexString();
  let _reserve0 = event.params.reserve0;
  let _reserve1 = event.params.reserve1;

  let pairReserve = Reserve.load(_pair);
  if (pairReserve == null){
    pairReserve = new Reserve(_pair);
  }
  pairReserve.reserve0 = _reserve0;
  pairReserve.reserve1 = _reserve1;
  pairReserve.save();
}