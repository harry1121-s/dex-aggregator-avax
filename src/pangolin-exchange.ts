import { Address, BigInt } from "@graphprotocol/graph-ts"
import {
  PangolinExchange,
  PairCreated,
} from "../generated/PangolinExchange/PangolinExchange"
import { AddLiquidityCall, RemoveLiquidityCall, RemoveLiquidityWithPermitCall} from "../generated/JoeRouter/JoeRouter"
import { Pair as ReservePair } from "../generated/JoeRouter/Pair";
import { TraderJoe } from "../generated/TraderJoe/TraderJoe"
import { Pair,Token, Reserve } from "../generated/schema"
import {
  ERC20
} from "../generated/PangolinExchange/ERC20"
import { log } from '@graphprotocol/graph-ts'

const TRADER_JOE = "0x9Ad6C38BE94206cA50bb0d90783181662f0Cfa10";
const PANGOLIN_EXCHANGE = "0xefa94DE7a4656D787667C749f7E1223D71E9FD88";

export function handlePairCreatedPangolin(event: PairCreated): void {
    // Get All Event Parameters
    let _id = event.params.pair;
    let _tokenA = event.params.token0;
    let _tokenB = event.params.token1;
    let _exchange = "Pangolin Exchange";
    let _router = "0xE54Ca86531e17Ef3616d22Ca28b0D458b6C89106";
    let _pairId = event.params.param3;
    log.debug("PE - ID: {}\nTokenA: {}\nTokenB: {}\nPairID: {}", [_id.toHexString(),_tokenA.toHexString(),_tokenB.toHexString(),_pairId.toString()]);

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

export function handleAddLiquidityCall(call: AddLiquidityCall): void {
  // Get all the event data
  let tokenA = call.inputs.tokenA;
  let tokenB = call.inputs.tokenB;

  let factory = TraderJoe.bind(Address.fromString(TRADER_JOE));
  // Get the Pair corresponding to the tokens
  let pairX = factory.try_getPair(tokenA,tokenB);
  let pairY = factory.try_getPair(tokenB,tokenA);

  // If first combination works.
  if(!pairX.reverted){
    // Check if the address returned is not a zero address.
    if(Address.fromString(pairX.value.toString()).notEqual(Address.fromString("0"))){
      // Create the Pair Object.
      let pair = ReservePair.bind(Address.fromString(pairX.value.toString()));
      // Get the reserve values 
      let _reserves = pair.try_getReserves();
      if(!_reserves.reverted) {
        // Get the reserve values
        let _reserve = _reserves.value;
        let reserve = Reserve.load(pairX.value.toHexString())
        if(reserve == null){
          reserve = new Reserve(pairX.value.toHexString());
        }
        // Update the Reserve Values for the pair.
        reserve.reserve0 = _reserve.value0;
        reserve.reserve1 = _reserve.value1;
        reserve.timestamp = _reserve.value2;
        reserve.save();
      }
    }
  }else if(!pairY.reverted) {
    if(Address.fromString(pairY.value.toString()).notEqual(Address.fromString("0"))){
      let pair = ReservePair.bind(Address.fromString(pairY.value.toString()));
      let _reserves = pair.try_getReserves();
      if(!_reserves.reverted) {
        let _reserve = _reserves.value;
        let reserve = Reserve.load(pairY.value.toHexString())
        if(reserve == null){
          reserve = new Reserve(pairY.value.toHexString());
        }
        reserve.reserve0 = _reserve.value0;
        reserve.reserve1 = _reserve.value1;
        reserve.timestamp = _reserve.value2;
        reserve.save();
      }
    }
  }
}

export function handleRemoveLiquidityCall(call: RemoveLiquidityCall): void {
  // Get all the event data
  let tokenA = call.inputs.tokenA;
  let tokenB = call.inputs.tokenB;

  let factory = TraderJoe.bind(Address.fromString(TRADER_JOE));
  let pairX = factory.try_getPair(tokenA,tokenB);
  let pairY = factory.try_getPair(tokenB,tokenA);
  if(!pairX.reverted){
    if(Address.fromString(pairX.value.toString()).notEqual(Address.fromString("0"))){
      let pair = ReservePair.bind(Address.fromString(pairX.value.toString()));
      let _reserves = pair.try_getReserves();
      if(!_reserves.reverted) {
        let _reserve = _reserves.value;
        let reserve = Reserve.load(pairX.value.toHexString())
        if(reserve == null){
          reserve = new Reserve(pairX.value.toHexString());
        }
        reserve.reserve0 = _reserve.value0;
        reserve.reserve1 = _reserve.value1;
        reserve.timestamp = _reserve.value2;
        reserve.save();
      }
    }
  }else if(!pairY.reverted) {
    if(Address.fromString(pairY.value.toString()).notEqual(Address.fromString("0"))){
      let pair = ReservePair.bind(Address.fromString(pairY.value.toString()));
      let _reserves = pair.try_getReserves();
      if(!_reserves.reverted) {
        let _reserve = _reserves.value;
        let reserve = Reserve.load(pairY.value.toHexString())
        if(reserve == null){
          reserve = new Reserve(pairY.value.toHexString());
        }
        reserve.reserve0 = _reserve.value0;
        reserve.reserve1 = _reserve.value1;
        reserve.timestamp = _reserve.value2;
        reserve.save();
      }
    }
  }
}

export function handleRemoveLiquidityWithPermitCall(call: RemoveLiquidityWithPermitCall): void {
  // Get all the event data
  let tokenA = call.inputs.tokenA;
  let tokenB = call.inputs.tokenB;

  let factory = TraderJoe.bind(Address.fromString(TRADER_JOE));
  let pairX = factory.try_getPair(tokenA,tokenB);
  let pairY = factory.try_getPair(tokenB,tokenA);
  if(!pairX.reverted){
    if(Address.fromString(pairX.value.toString()).notEqual(Address.fromString("0"))){
      let pair = ReservePair.bind(Address.fromString(pairX.value.toString()));
      let _reserves = pair.try_getReserves();
      if(!_reserves.reverted) {
        let _reserve = _reserves.value;
        let reserve = Reserve.load(pairX.value.toHexString())
        if(reserve == null){
          reserve = new Reserve(pairX.value.toHexString());
        }
        reserve.reserve0 = _reserve.value0;
        reserve.reserve1 = _reserve.value1;
        reserve.timestamp = _reserve.value2;
        reserve.save();
      }
    }
  }else if(!pairY.reverted) {
    if(Address.fromString(pairY.value.toString()).notEqual(Address.fromString("0"))){
      let pair = ReservePair.bind(Address.fromString(pairY.value.toString()));
      let _reserves = pair.try_getReserves();
      if(!_reserves.reverted) {
        let _reserve = _reserves.value;
        let reserve = Reserve.load(pairY.value.toHexString())
        if(reserve == null){
          reserve = new Reserve(pairY.value.toHexString());
        }
        reserve.reserve0 = _reserve.value0;
        reserve.reserve1 = _reserve.value1;
        reserve.timestamp = _reserve.value2;
        reserve.save();
      }
    }
  }
}